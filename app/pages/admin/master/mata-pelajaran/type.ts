import type { PaginationMeta } from "~/types/global";
import type { TahunAkademik } from "../tahun-akademik/type";
import type { Kelas } from "../kelas/type";

export interface MataPelajaran {
  id: number;
  name: string;
  code: string;
  kelas: Kelas;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface MataPelajaranResponse {
  message: string;
  results: {
    data: MataPelajaran[];
  } & PaginationMeta;
}
