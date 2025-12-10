'use server';
import {ActionResponse, Driver, type VehicleType} from '@/types';
import {createClient} from '@/lib/supabase/server';
import {formatSupabaseFunctionErrors, formatSupabasePostgrestErrors, shuffleArray} from '@/lib/utils';
import {cookies} from 'next/headers';
import {municipalityDistances} from '@/lib/data/locations';

export const getDrivers = async (
      province: string,
      referenceMunicipality: string,
      filterMunicipalities: string[],
      vehicleTypes: VehicleType[],
      cStore?: ReturnType<typeof cookies>
): Promise<ActionResponse<Driver[]>> => {
  try {
    const supabase = await createClient(cStore);
  
    const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('online', true)
        .eq('province', province)
        .in('municipality', filterMunicipalities)
        .in('vehicle_type', vehicleTypes)
        .gte('active_at', new Date().toDateString());
    
    if (error) {
      console.log('error supabase', error);
      const errors = await formatSupabaseFunctionErrors(error);
      return { success: false, errors }
    }

    let filteredDrivers = data || [];
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
    
    
    return { success: true, data: filteredDrivers };
  } catch (error) {
    console.log('Unexpected error in getDrivers:', error);
    throw new Error('Ha ocurrido un error no especificado');
  }
};

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

