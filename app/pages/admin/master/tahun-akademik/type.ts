import type { PaginationMeta } from "~/types/global";

export interface TahunAkademik {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TahunAkademikResponse {
  message: string;
  results: {
    data: TahunAkademik[];
  } & PaginationMeta;
}
