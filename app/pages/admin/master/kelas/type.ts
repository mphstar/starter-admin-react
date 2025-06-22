import type { PaginationMeta } from "~/types/global";

export interface Kelas {
  id: number;
  code: string;
  name: string;
  level: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface KelasResponse {
  message: string;
  results: {
    data: Kelas[];
  } & PaginationMeta;
}
