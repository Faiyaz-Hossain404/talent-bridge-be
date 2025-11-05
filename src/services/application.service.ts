import db from '../models/index.js';

const { Application, Job, User, ApplicationStatusHistory, Role } = db as any;

class ApplicationService {
  async apply(user_id: number, job_id: number) {
    const already = await Application.findOne({ where: { user_id, job_id } });
    if (already) throw new Error('You have already applied to this job');

    return Application.create({ user_id, job_id, status: 'Applied' });
  }

  async listMyApplications(user_id: number) {
    return Application.findAll({
      where: { user_id },
      include: [{ model: Job, as: 'job' }],
      order: [['created_at', 'DESC']]
    });
  }

  async listApplicationsForJob(job_id: number, recruiter_id: number) {
    // ensure job belongs to recruiter OR they are admin
    const job = await Job.findByPk(job_id, {
      include: [{ model: User, as: 'postedBy', include: [{ model: Role, as: 'role' }] }]
    });
    if (!job) throw new Error('Job not found');

    const poster = job.getDataValue('postedBy');

    if (poster.id !== recruiter_id && poster.role.name !== 'admin') throw new Error('Forbidden');

    return Application.findAll({
      where: { job_id },
      include: [{ model: User, as: 'applicant' }],
      order: [['created_at', 'DESC']]
    });
  }

  async updateStatus(application_id: number, newStatus: string, changedBy: number) {
    const app = await Application.findByPk(application_id);
    if (!app) throw new Error('Application not found');

    await Application.update({ status: newStatus }, { where: { id: application_id } });

    await ApplicationStatusHistory.create({
      application_id,
      status: newStatus,
      changed_by: changedBy
    });

    return this.getApplication(application_id);
  }

  async getApplication(id: number) {
    return Application.findByPk(id, {
      include: [
        { model: User, as: 'applicant' },
        { model: Job, as: 'job' },
        { model: ApplicationStatusHistory, as: 'statusHistory' }
      ]
    });
  }
}

export default new ApplicationService();
