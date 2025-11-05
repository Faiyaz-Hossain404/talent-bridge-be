import db from '../models';
const { Job, User, Role } = db;

class JobService {
  async listJobs(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    return Job.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        { model: User, as: 'postedBy', attributes: ['id', 'name', 'email'], include: [{ model: Role, as: 'role' }] }
      ]
    });
  }

  async getJob(id: number) {
    return Job.findByPk(id, {
      include: [{ model: User, as: 'postedBy', attributes: ['id', 'name', 'email'] }]
    });
  }

  async createJob(user_id: number, data: any) {
    return Job.create({
      ...data,
      posted_by: user_id
    });
  }

  async updateJob(id: number, user: any, data: any) {
    const job = await Job.findByPk(id);
    if (!job) throw new Error('Job not found');

    if (job.getDataValue('posted_by') !== user.id && user.role.name !== 'admin') {
      throw new Error('Forbidden');
    }

    await Job.update(data, { where: { id } });
    return this.getJob(id);
  }

  async deleteJob(id: number, user: any) {
    const job = await Job.findByPk(id);
    if (!job) throw new Error('Job not found');

    if (job.getDataValue('posted_by') !== user.id && user.role.name !== 'admin') {
      throw new Error('Forbidden');
    }

    await Job.destroy({ where: { id } });
    return true;
  }
}

export default new JobService();
