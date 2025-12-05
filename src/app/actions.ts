'use server';

import type { Driver, VehicleType } from '@/types';
import { shuffleArray } from '@/lib/utils';
// import { createSupabaseServerClient } from '@/lib/supabase/server';

const mockDrivers: Driver[] = [
  { id: '1', alias: 'Juan E.', phone: '600111222', province: 'madrid', municipality: 'madrid_city', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car11/800/600', 'https://picsum.photos/seed/car12/800/600', 'https://picsum.photos/seed/car13/800/600'] },
  { id: '2', alias: 'Maria C.', phone: '611222333', province: 'madrid', municipality: 'getafe', vehicle_type: 'combustion', images: ['https://picsum.photos/seed/car21/800/600', 'https://picsum.photos/seed/car22/800/600'] },
  { id: '3', alias: 'Carlos R.', phone: '622333444', province: 'barcelona', municipality: 'barcelona_city', vehicle_type: 'hybrid', images: ['https://picsum.photos/seed/car31/800/600'] },
  { id: '4', alias: 'Ana P.', phone: '633444555', province: 'barcelona', municipality: 'hospitalet', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car41/800/600', 'https://picsum.photos/seed/car42/800/600'] },
  { id: '5', alias: 'Luis G.', phone: '644555666', province: 'valencia', municipality: 'valencia_city', vehicle_type: 'combustion', images: ['https://picsum.photos/seed/car51/800/600'] },
  { id: '6', alias: 'Sofia L.', phone: '655666777', province: 'madrid', municipality: 'madrid_city', vehicle_type: 'hybrid', images: ['https://picsum.photos/seed/car61/800/600', 'https://picsum.photos/seed/car62/800/600'] },
  { id: '7', alias: 'David M.', phone: '666777888', province: 'sevilla', municipality: 'sevilla_city', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car71/800/600'] },
  { id: '8', alias: 'Laura F.', phone: '677888999', province: 'malaga', municipality: 'malaga_city', vehicle_type: 'combustion', images: ['https://picsum.photos/seed/car81/800/600'] },
  { id: '9', alias: 'Javier S.', phone: '688999000', province: 'madrid', municipality: 'leganes', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car91/800/600'] },
  { id: '10', alias: 'Elena V.', phone: '699000111', province: 'barcelona', municipality: 'badalona', vehicle_type: 'hybrid', images: ['https://picsum.photos/seed/car101/800/600', 'https://picsum.photos/seed/car102/800/600'] },
];

/**
 * Fetches drivers based on location and vehicle type filters.
 * In a real application, this function would query the Supabase database.
 * The Supabase client code is commented out for demonstration purposes.
 *
 * @param province The selected province.
 * @param municipality The selected municipality.
 * @param vehicleTypes An array of selected vehicle types.
 * @returns A promise that resolves to an array of drivers.
 */
export async function getDrivers(
  province: string,
  municipality: string,
  vehicleTypes: VehicleType[]
): Promise<Driver[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // --- Real Supabase Query (Example) ---
  /*
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('province', province)
    .eq('municipality', municipality)
    .in('vehicle_type', vehicleTypes)
    .eq('online', true);

  if (error) {
    console.error('Error fetching drivers:', error);
    return [];
  }

  // For production, randomize in the DB for efficiency. Create a SQL function:
  // CREATE OR REPLACE FUNCTION get_random_drivers(p_province TEXT, p_municipality TEXT, p_vehicle_types TEXT[])
  // RETURNS SETOF profiles AS $$
  //   SELECT * FROM profiles
  //   WHERE province = p_province AND municipality = p_municipality AND vehicle_type = ANY(p_vehicle_types) AND online = true
  //   ORDER BY random();
  // $$ LANGUAGE sql;
  //
  // Then call it:
  // const { data, error } = await supabase.rpc('get_random_drivers', { 
  //   p_province: province, 
  //   p_municipality: municipality,
  //   p_vehicle_types: vehicleTypes
  // });
  
  // Here we just shuffle the results from the simple query.
  return shuffleArray(data as Driver[]);
  */

  // --- Mock Implementation ---
  const filteredDrivers = mockDrivers.filter(driver =>
    driver.province === province &&
    driver.municipality === municipality &&
    vehicleTypes.includes(driver.vehicle_type)
  );
  
  return shuffleArray(filteredDrivers);
}
