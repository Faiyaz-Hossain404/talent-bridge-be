import db from '../models/index.js';
const { User, Profile, Role } = db;

class UserService {
  async findById(id: number) {
    return User.findByPk(id, {
      include: [
        { model: Profile, as: 'profile' },
        { model: Role, as: 'role' }
      ]
    });
  }

  async list(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({ limit, offset, include: [{ model: Role, as: 'role' }] });
    return { count, rows };
  }

  async remove(id: number) {
    return User.destroy({ where: { id } });
  }

  async update(id: number, payload: Partial<any>) {
    await User.update(payload, { where: { id } });
    return User.findByPk(id, {
      include: [
        { model: Profile, as: 'profile' },
        { model: Role, as: 'role' }
      ]
    });
  }
}

export default new UserService();
