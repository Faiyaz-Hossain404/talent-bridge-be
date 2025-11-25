import { Application } from "../models/application.model";
import { User } from "../models";
import { Job } from "../models/job.model";
import type { TApplication } from "../types/application.types";

// Dashboard stats service
export const getDashboardStats = async () => {
  const totalJobs = await Job.count();
  const totalUsers = await User.count();
  const totalApplications = await Application.count();

  // Count applications dynamically by status
  const statuses = await Application.findAll({
    attributes: ["status"],
  });

  const applicationsByStatus: Record<string, number> = {};
  statuses.forEach((app) => {
    const status = app.get("status") as string;
    applicationsByStatus[status] = (applicationsByStatus[status] || 0) + 1;
  });

  return { totalJobs, totalUsers, totalApplications, applicationsByStatus };
};

// Recent applicants service
export const getRecentApplicantsData = async (limit = 10) => {
  const applications = await Application.findAll({
    order: [["createdAt", "DESC"]],
    limit,
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Job, attributes: ["id", "title"] },
    ],
  });

  return applications.map((app) => {
    const data = app.get({ plain: true }) as any;
    return {
      id: data.id,
      jobId: data.jobId,
      userId: data.userId,
      status: data.status,
      appliedAt: data.createdAt,
      resumeUrl: data.resumeUrl ?? undefined,
      coverLetter: data.coverLetter ?? undefined,
      metadata: data.metadata ?? undefined,
      applicantName: data.User?.name,
      jobTitle: data.Job?.title,
    } as TApplication & { applicantName?: string; jobTitle?: string };
  });
};
