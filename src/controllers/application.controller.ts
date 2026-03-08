import { Request, Response } from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationsByUser,
  updateApplicationStatus,
} from "../services/application.service";

export const applyJob = async (req: Request, res: Response) => {
  try {
    const { jobId, coverLetter, resumeUrl, metadata } = req.body;
    const userId = req.user!.id;

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    const application = await createApplication({
      jobId,
      userId,
      coverLetter,
      resumeUrl,
      metadata,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Application failed" });
  }
};

export const getMyApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const applications = await getApplicationsByUser(userId);
    return res.status(200).json(applications);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to fetch applications" });
  }
};

export const adminUpdateApplicationStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const applicationId = Number(req.params.id);
    if (isNaN(applicationId)) {
      return res.status(400).json({ message: "Invalid application ID" });
    }

    const updated = await updateApplicationStatus(applicationId, req.body);

    return res.status(200).json({
      message: "Application status updated successfully",
      updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to update application status",
    });
  }
};

export const adminListApplicationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit as string) || 10)
    );
    const search = (req.query.search as string) || "";
    const sort = (req.query.sort as "newest" | "oldest") || "newest";

    const result = await getAllApplications(page, limit, { search, sort });
    return res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch applications";
    return res.status(500).json({ message: errorMessage });
  }
};
