'use server';

import type { Driver, VehicleType } from '@/types';
import { shuffleArray } from '@/lib/utils';
import { municipalityDistances } from '@/lib/locations';

const mockDrivers: Driver[] = [
  { id: '1', alias: 'Juan E.', phone: '52525252', province: 'la_habana', municipality: 'plaza_de_la_revolucion', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car11/800/600', 'https://picsum.photos/seed/car12/800/600', 'https://picsum.photos/seed/car13/800/600'] },
  { id: '2', alias: 'Maria C.', phone: '53535353', province: 'la_habana', municipality: 'playa', vehicle_type: 'combustion', images: ['https://picsum.photos/seed/car21/800/600', 'https://picsum.photos/seed/car22/800/600'] },
  { id: '3', alias: 'Carlos R.', phone: '54545454', province: 'matanzas', municipality: 'matanzas', vehicle_type: 'hybrid', images: ['https://picsum.photos/seed/car31/800/600'] },
  { id: '4', alias: 'Ana P.', phone: '55555555', province: 'matanzas', municipality: 'cardenas', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car41/800/600', 'https://picsum.photos/seed/car42/800/600'] },
  { id: '5', alias: 'Luis G.', phone: '56565656', province: 'la_habana', municipality: 'la_habana_vieja', vehicle_type: 'combustion', images: ['https://picsum.photos/seed/car51/800/600'] },
  { id: '6', alias: 'Sofia L.', phone: '58585858', province: 'la_habana', municipality: 'plaza_de_la_revolucion', vehicle_type: 'hybrid', images: ['https://picsum.photos/seed/car61/800/600', 'https://picsum.photos/seed/car62/800/600'] },
  { id: '7', alias: 'David M.', phone: '59595959', province: 'santiago_de_cuba', municipality: 'santiago_de_cuba', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car71/800/600'] },
  { id: '8', alias: 'Laura F.', phone: '51515151', province: 'la_habana', municipality: 'cerro', vehicle_type: 'combustion', images: ['https://picsum.photos/seed/car81/800/600'] },
  { id: '9', alias: 'Javier S.', phone: '52535455', province: 'la_habana', municipality: 'playa', vehicle_type: 'electric', images: ['https://picsum.photos/seed/car91/800/600'] },
  { id: '10', alias: 'Elena V.', phone: '55565758', province: 'matanzas', municipality: 'varadero', vehicle_type: 'hybrid', images: ['https://picsum.photos/seed/car101/800/600', 'https://picsum.photos/seed/car102/800/600'] },
];

export async function getDrivers(
  province: string,
  referenceMunicipality: string,
  filterMunicipalities: string[],
  vehicleTypes: VehicleType[]
): Promise<Driver[]> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const filteredDrivers = mockDrivers.filter(driver =>
    driver.province === province &&
    filterMunicipalities.includes(driver.municipality) &&
    vehicleTypes.includes(driver.vehicle_type)
  );

  const distances = municipalityDistances[province];
  if (distances) {
    filteredDrivers.sort((a, b) => {
      const distanceA = distances[referenceMunicipality]?.[a.municipality] ?? Infinity;
      const distanceB = distances[referenceMunicipality]?.[b.municipality] ?? Infinity;
      return distanceA - distanceB;
    });
  }

  return shuffleArray(filteredDrivers);
}
