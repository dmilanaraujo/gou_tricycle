import {DriverImage} from '@/components/ui/file-upload';

export type VehicleType = 'electric' | 'combustion' | 'hybrid';

export type Driver = {
  id: string;
  phone: string;
  alias: string;
  images: DriverImage[];
  province: string;
  municipality: string;
  vehicle_type: VehicleType;
  online: boolean;
  active_at: Date;
};

export type Location = {
  province: string;
  municipality: string;
};

export type ActionError = {
  message: string;
  path?: (string|number)[]
}
export type ActionResponse<T> =
    | { success: true; data?: T }
    | { success: false; errors?: ActionError[] };

export interface OptimizedImages {
  thumbnail: File;
  fullSize: File;
  thumbnailUrl: string;
  fullSizeUrl: string;
}

export interface UploadedImage {
  thumbnailUrl: string;
  fullSizeUrl: string;
  path: string;
  index?: number;
}

export class UploadFileError extends Error {
  file: File;
  constructor(message: string, file: File) {
    super(message);
    this.file = file;
  }
}
