import type { PaginationMeta } from "~/types/global";
import type { TahunAkademik } from "../tahun-akademik/type";

export interface Semester {
  id: number;
  semester: "1" | "2";
  year: string;
  tahun_akademik: TahunAkademik;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SemesterResponse {
  message: string;
  results: {
    data: Semester[];
  } & PaginationMeta;
}

export interface SemesterResponseNoPagination {
  message: string;
  results: Semester[];
}
