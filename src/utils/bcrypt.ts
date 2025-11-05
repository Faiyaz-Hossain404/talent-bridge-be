import bcrypt from 'bcrypt';
import env from '../config/env';

export const hash = async (plain: string) => {
  const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
};

export const compare = (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};
