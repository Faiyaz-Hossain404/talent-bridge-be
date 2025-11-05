import db from '../models/index.js';
import { RegisterDTO, LoginDTO } from '../types/user.types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const { User, Role } = db;

class AuthService {
  async register(payload: RegisterDTO) {
    const exists = await User.scope('withPassword').findOne({
      where: { email: payload.email }
    });
    if (exists) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(payload.password, Number(env.BCRYPT_SALT_ROUNDS));

    const role_id = payload.role_id || 2; // default user role

    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role_id
    });

    return User.findByPk(user.getDataValue('id'), {
      include: [{ model: Role, as: 'role' }]
    });
  }

  async login(payload: LoginDTO) {
    const user = await User.scope('withPassword').findOne({
      where: { email: payload.email },
      include: [{ model: Role, as: 'role' }]
    });

    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(payload.password, user.getDataValue('password'));
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign(payload, env.JWT_SECRET as string, { expiresIn: env.JWT_EXPIRES_IN as string });

    const safeUser = await User.findByPk(user.getDataValue('id'), {
      include: [{ model: Role, as: 'role' }]
    });

    return { token, user: safeUser };
  }

  verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as {
      id: number;
      email: string;
      name: string;
      role_id: number;
    };
  }
}

export default new AuthService();
