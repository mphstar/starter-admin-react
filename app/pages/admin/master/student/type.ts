import type { PaginationMeta } from "~/types/global";
import type { Kelas } from "../kelas/type";

export interface Student {
  id: number;
  nim: string;
  generation: number;
  kelas: Kelas;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface StudentResponse {
  message: string;
  results: {
    data: Student[];
  } & PaginationMeta;
}
export interface User {
  id: number; 
  name: string;
  email: string;
  email_verified_at: string | null;
  password: string;
  remember_token: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  gender: 'MALE' | 'FEMALE';
  religion: string;
  birth_place: string;
  birth_date: string;
  phone_number: string;
  nationality: string;
  img_path: string | null;
  img_name: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
