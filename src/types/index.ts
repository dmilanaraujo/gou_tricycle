import {DriverImage} from '@/components/ui/file-upload';

export const VEHICLE_TYPES = ['electric', 'combustion', 'hybrid'] as const

export type VehicleType = typeof VEHICLE_TYPES[number]

export enum VehicleTypeEnum {
  electric = 'electric',
  combustion = 'combustion',
  hybrid = 'hybrid',
}

export type Driver = {
  id: string;
  phone: string;
  alias: string;
  images: DriverImage[];
  province: string;
  municipality: string;
  vehicle_type: VehicleType;
  online: boolean;
  active_at: string;
};

export type Location = {
  province: string;
  municipality: string;
};

export type ActionError = {
  message: string;
  path?: (string|number|PropertyKey)[]
}
export type ActionResponse<T> =
    | { success: true; data?: T }
    | { success: false; errors?: ActionError[] };

export type PaginationRequest = {
  page?: number;
  limit: number;
};

export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  hasMore?: boolean;
};

export type ResultList<TData> = {
  data: TData[];
  pagination?: Pagination;
};

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
