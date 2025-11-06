import { Application } from "../models/application.model";
import {
  TApplicationCreateInput,
  TApplicationStatusUpdateInput,
  TApplication,
} from "../types/application.types";

export const createApplication = async (
  data: TApplicationCreateInput
): Promise<TApplication> => {
  const existing = await Application.findOne({
    where: { userId: data.userId, jobId: data.jobId },
  });
  if (existing) {
    throw new Error("You have already applied to this job");
  }

  return Application.create({
    jobId: data.jobId,
    userId: data.userId,
    coverLetter: data.coverLetter ?? null,
    resumeUrl: data.resumeUrl ?? null,
    metadata: data.metadata ?? null,
    status: "applied",
  }) as unknown as Promise<TApplication>;
};

export const getApplicationsByUser = (
  userId: number
): Promise<TApplication[]> =>
  Application.findAll({ where: { userId } }) as unknown as Promise<
    TApplication[]
  >;

export const getApplicationsByJob = (jobId: number): Promise<TApplication[]> =>
  Application.findAll({ where: { jobId } }) as unknown as Promise<
    TApplication[]
  >;

export const updateApplicationStatus = async (
  id: number,
  data: TApplicationStatusUpdateInput
): Promise<TApplication | null> => {
  await Application.update(data, { where: { id } });
  return Application.findByPk(id) as unknown as Promise<TApplication | null>;
};
