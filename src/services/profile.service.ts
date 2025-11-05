import db from '../models';
const { Profile, User, Role } = db;

class ProfileService {
  async getMyProfile(user_id: number) {
    return Profile.findOne({
      where: { user_id },
      include: [{ model: User, as: 'user', include: [{ model: Role, as: 'role' }] }]
    });
  }

  async updateMyProfile(user_id: number, data: Partial<any>) {
    await Profile.upsert({ ...data, user_id });
    return this.getMyProfile(user_id);
  }

  async getAllProfiles(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await Profile.findAndCountAll({
      limit,
      offset,
      include: [{ model: User, as: 'user', include: [{ model: Role, as: 'role' }] }],
      order: [['created_at', 'DESC']]
    });

    return { total: count, profiles: rows };
  }

  async getProfileById(profile_id: number) {
    return Profile.findByPk(profile_id, {
      include: [{ model: User, as: 'user', include: [{ model: Role, as: 'role' }] }]
    });
  }
}

export default new ProfileService();
