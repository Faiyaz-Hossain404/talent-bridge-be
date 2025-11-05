export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role_id?: number;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role_id: number;
  role?: { id: number; name: string };
}
