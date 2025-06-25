import type { PaginationMeta } from "~/types/global";
import type { User } from "../student/type";

export interface Employee {
  id: number;
  nip: string;
  user: User;
  position: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmployeeResponse {
  message: string;
  results: {
    data: Employee[];
  } & PaginationMeta;
}
