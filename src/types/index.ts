import {BucketImage} from '@/components/ui/file-upload';
import {SortingState} from '@tanstack/react-table';

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
  images: BucketImage[];
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
  code?: string;
  path?: (string|number|PropertyKey)[]
}
export type ActionResponse<T> =
    | { success: true; data?: T }
    | { success: false; errors?: ActionError[] };

export type Option = {
  value: string|number;
  label: string;
  disabled?: boolean;
};
export type ColumnMeta = {
  columnDef?: {
    meta?: {
      filterName?: string
    }
  },
  headerClassName?: string;
  cellClassName?: string;
}

export type SortRequest = {
  sorting?: SortingState;
};

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
  thumbnail?: File;
  fullSize: File;
  thumbnailUrl?: string;
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

export enum ActiveStatus {
  active = 'active',
  inactive = 'inactive',
}

export * from './business';
