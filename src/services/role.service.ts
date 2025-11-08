import { Role } from "../models";

export const createRole = async (data: { name: string }) => {
  return Role.create(data);
};

export const getAllRoles = async () => {
  return Role.findAll();
};

export const getRoleById = async (id: number) => {
  return Role.findByPk(id);
};

export const updateRole = async (id: number, data: { name?: string }) => {
  await Role.update(data, { where: { id } });
  return Role.findByPk(id);
};

export const deleteRole = async (id: number) => {
  return Role.destroy({ where: { id } });
};
