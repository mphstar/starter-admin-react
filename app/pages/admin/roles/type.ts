import type { PaginationMeta } from "~/types/global";

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  permissions: Permissions[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Permissions {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RoleResponse {
  message: string;
  results: {
    data: Role[];
  } & PaginationMeta;
}

export interface PermissionsResponseNoPagination {
  message: string;
  results: Permissions[];
}

export interface RoleResponseNoPagination {
  message: string;
  results: Role[];
}
