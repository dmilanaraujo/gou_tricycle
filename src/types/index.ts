export type VehicleType = 'electric' | 'combustion' | 'hybrid';

export type Driver = {
  id: string;
  phone: string;
  alias: string;
  images: string[];
  province: string;
  municipality: string;
  vehicle_type: VehicleType;
};

export type Location = {
  province: string;
  municipality: string;
};
