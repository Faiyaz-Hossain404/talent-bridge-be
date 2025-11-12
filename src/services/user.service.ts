import { User } from "../models";
import { TUser, TUserCreateInput, TUserUpdateInput } from "../types/user.types";
import { hashPassword } from "../utils/bcrypt";

export const createUser = async (data: TUserCreateInput): Promise<TUser> => {
  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    ...data,
    password: hashedPassword,
    roleId: data.roleId ?? 2,
  });

  return user.get() as TUser;
};

export const getAllUsers = async (
  page: number = 1,
  limit: number = 20
): Promise<{
  users: TUser[];
  total: number;
  totalPages: number;
  currentPage: number;
}> => {
  const offset = (page - 1) * limit;

  const { count, rows } = await User.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Profile,
        required: false,
      },
    ],
    attributes: { exclude: ["password"] },
  });

  return {
    users: rows.map((u) => u.get() as TUser),
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

export const getUserById = async (id: number): Promise<TUser | null> => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Profile,
        required: false,
      },
    ],
    attributes: { exclude: ["password"] },
  });
  return user ? (user.get() as TUser) : null;
};

export const updateUser = async (
  id: number,
  data: TUserUpdateInput
): Promise<TUser | null> => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  await User.update(data, { where: { id } });
  const updated = await User.findByPk(id, {
    include: [
      {
        model: Profile,
        required: false,
      },
    ],
    attributes: { exclude: ["password"] },
  });
  return updated ? (updated.get() as TUser) : null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const deletedCount = await User.destroy({ where: { id } });
  return deletedCount > 0;
};

export const updateSelfUser = async (
  userId: number,
  data: TUserUpdateInput
): Promise<TUser | null> => {
  const updateData: any = { ...data };

  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  await User.update(updateData, { where: { id: userId } });

  const updated = await User.findByPk(userId);
  return updated ? (updated.get() as TUser) : null;
};
