import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { User } from "../models";

import { ENV } from "../config/env";
import { TUser, TUserCreateInput } from "../types/user.types";

export const register = async (data: TUserCreateInput): Promise<TUser> => {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const userInstance = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    roleId: data.roleId ?? 2,
  });

  return userInstance.get() as TUser;
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: TUser; token: string }> => {
  const userInstance = await User.findOne({ where: { email } });
  if (!userInstance) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(
    password,
    userInstance.getDataValue("password")
  );
  if (!isMatch) throw new Error("Invalid credentials");

  const payload = { id: userInstance.getDataValue("id") };

  const signOptions: SignOptions = {
    expiresIn: ENV.jwt.expiresIn as unknown as `${number}${
      | "s"
      | "m"
      | "h"
      | "d"}`,
  };

  const token = jwt.sign(payload, ENV.jwt.secret as Secret, signOptions);

  return { user: userInstance.get() as TUser, token };
};
