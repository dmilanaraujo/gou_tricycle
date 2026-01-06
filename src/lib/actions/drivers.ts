'use server';
import {ActionResponse, Driver, PaginationRequest, ResultList } from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, formatZodErrors, shuffleArray} from '@/lib/utils';
import {municipalityDistances} from '@/lib/data/locations';
import {DriverFiltersSchema, DriverFiltersValues} from '@/lib/schemas/driver';

  export const getDrivers = async (params: DriverFiltersValues & PaginationRequest): Promise<ActionResponse<ResultList<Driver>>> => {
    try {
      const validatedFields = DriverFiltersSchema.safeParse(params);
      
      if (!validatedFields.success) {
        const errors = formatZodErrors(validatedFields.error);
        return { success: false, errors };
      }
      
      const supabase = await createClient();
      
      const {
        province,
        referenceMunicipality,
        filterMunicipalities,
        vehicleTypes
      } = validatedFields.data;
      
      const {
        page,
        limit
      } = params;
      
      const from = (page || 0) * limit;
      const to = from + limit - 1;
      
      const { data, error, count } = await supabase
          .from('drivers')
          .select('*, images:driver_images(*)', { count: 'exact' })
          .eq('online', true)
          .eq('province', province)
          .in('municipality', filterMunicipalities)
          .in('vehicle_type', vehicleTypes)
          .gte('active_at', new Date().toDateString())
          .range(from, to);
      
      if (error) {
        console.log('error supabase', error);
        const errors = await formatSupabaseFunctionErrors(error);
        return { success: false, errors }
      }
      
      let filteredDrivers: Driver[] = data || [];
      const distances = municipalityDistances[province]?.[referenceMunicipality];
      if (distances) {
        filteredDrivers.sort((a, b) => {
          const distanceA = distances[a.municipality] ?? Infinity;
          const distanceB = distances[b.municipality] ?? Infinity;
          return distanceA - distanceB;
        });
      } else {
        // Si no hay datos de distancia, al menos poner el del mismo municipio primero
        filteredDrivers.sort((a, b) => {
          if (a.municipality === referenceMunicipality && b.municipality !== referenceMunicipality) return -1;
          if (a.municipality !== referenceMunicipality && b.municipality === referenceMunicipality) return 1;
          return 0;
        });
      }
      
      // Barajar aleatoriamente los conductores que están a la misma distancia
      if (distances) {
        const groupedByDistance: { [key: number]: Driver[] } = {};
        filteredDrivers.forEach(driver => {
          const distance = distances[driver.municipality] ?? Infinity;
          if (!groupedByDistance[distance]) {
            groupedByDistance[distance] = [];
          }
          groupedByDistance[distance].push(driver);
        });
        
        filteredDrivers = Object.values(groupedByDistance).flatMap(group => shuffleArray(group));
      } else {
        // Si no hay distancias, barajar todo el resultado
        filteredDrivers = shuffleArray(filteredDrivers);
      }
      
      const result = {
        data: filteredDrivers || [],
        pagination: {
          currentPage: page || 1,
          itemsPerPage: limit,
          totalItems: count || 0,
          hasMore: filteredDrivers.length === limit,
        },
      };
      
      return { success: true, data: result };
    } catch (error) {
      console.log('Unexpected error in getDrivers:', error);
      throw new Error('Ha ocurrido un error no especificado');
    }
}

export const updateStatus = async (online: boolean) => {

  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }

    const { data, error } = await supabase
        .from("drivers")
        .update({
          online
        })
        .eq("id", user.id)
        .select("*");
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.log('Unexpected error in updateStatus:', error);
    throw new Error('Error no especificado');
  }
}

export const setDefaultImage = async (path: string): Promise<ActionResponse<boolean>> => {
  
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, errors: [{ message: 'Usuario no autenticado o no se pudo obtener el usuario.' }] };
    }

    const { error: resetError } = await supabase
        .from("driver_images")
        .update({ primary: false })
        .eq("driver_id", user.id);
    
    if (resetError) {
      return {
        success: false,
        errors: formatSupabasePostgrestErrors(resetError),
      };
    }
    
    const { error } = await supabase
        .from("driver_images")
        .update({
          primary: true
        })
        .eq("driver_id", user.id)
        .eq("path", path);
    
    if (error) {
      return { success: false, errors: formatSupabasePostgrestErrors(error) }
    }
    return { success: true, data: true };
  } catch (error) {
    console.log('Unexpected error in setDefaultImage:', error);
    throw new Error('Error no especificado');
  }
}
