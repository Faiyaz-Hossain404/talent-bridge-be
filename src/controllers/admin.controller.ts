import { Request, Response } from "express";
import { Application } from "../models/application.model";
import { User } from "../models";
import { Job } from "../models/job.model";
import type { TApplication } from "../types/application.types";

// Dashboard stats
export const getDashboardStatsController = async (
  req: Request,
  res: Response
) => {
  try {
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

    res.json({
      totalJobs,
      totalUsers,
      totalApplications,
      applicationsByStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

// Recent applicants
export const adminGetRecentApplicantsController = async (
  req: Request,
  res: Response
) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const applications = await Application.findAll({
      order: [["createdAt", "DESC"]],
      limit,
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Job, attributes: ["id", "title"] },
      ],
    });

    const recentApplicants: TApplication[] = applications.map((app) => {
      const data = app.get({ plain: true }) as any;
      return {
        id: data.id,
        userId: data.userId,
        jobId: data.jobId,
        applicantName: data.User?.name || "Unknown",
        jobTitle: data.Job?.title || "Unknown",
        status: data.status,
        appliedAt: data.createdAt,
        resumeUrl: data.resumeUrl ?? undefined,
        coverLetter: data.coverLetter ?? undefined,
        metadata: data.metadata ?? undefined,
      };
    });

    res.json(recentApplicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent applicants" });
  }
};
