import { Request, Response } from "express";
import {
  createApplication,
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
