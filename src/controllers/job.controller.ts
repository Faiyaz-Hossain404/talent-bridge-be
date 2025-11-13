import { Request, Response } from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../services/job.service";

export const createJobController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const job = await createJob({
      ...req.body,
      userId: req.user.id,
    });

    return res.status(201).json({ message: "Job created successfully", job });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Job creation failed" });
  }
};

export const getAllJobsController = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit as string) || 10)
    );

    const search = (req.params.search as string) || "";

    type SearchBy = "all" | "title" | "company" | "location";
    const by = req.query.by as string as SearchBy;

    const result = await getAllJobs(page, limit, { search, by });
    return res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch jobs";
    return res.status(500).json({ message: errorMessage });
  }
};

export const getJobByIdController = async (req: Request, res: Response) => {
  try {
    const job = await getJobById(Number(req.params.id));
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.json(job);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to fetch job" });
  }
};

export const updateJobController = async (req: Request, res: Response) => {
  try {
    const updated = await updateJob(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Job not found" });
    return res.json({ message: "Job updated successfully", updated });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Job update failed" });
  }
};

export const deleteJobController = async (req: Request, res: Response) => {
  try {
    const deletedCount = await deleteJob(Number(req.params.id));
    if (!deletedCount)
      return res.status(404).json({ message: "Job not found" });
    return res.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete job" });
  }
};
