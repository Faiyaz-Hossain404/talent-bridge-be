export interface TUser {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TUserCreateInput {
  name: string;
  email: string;
  password: string;
  roleId?: number;
}

export interface TUserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
}
