export interface TRole {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TRoleCreateInput {
  name: string;
}
export interface TRoleUpdateInput {
  name?: string;
}
