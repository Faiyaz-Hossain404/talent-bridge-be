import { Job } from "../models/job.model";
import { TJobCreateInput, TJobUpdateInput, TJob } from "../types/job.types";

export const createJob = (data: TJobCreateInput): Promise<TJob> =>
  Job.create(data) as unknown as Promise<TJob>;

export const getAllJobs = (): Promise<TJob[]> =>
  Job.findAll() as unknown as Promise<TJob[]>;

export const getJobById = (id: number): Promise<TJob | null> =>
  Job.findByPk(id) as unknown as Promise<TJob | null>;

export const updateJob = async (
  id: number,
  data: TJobUpdateInput
): Promise<TJob | null> => {
  await Job.update(data, { where: { id } });
  return Job.findByPk(id) as unknown as Promise<TJob | null>;
};

export const deleteJob = (id: number): Promise<number> =>
  Job.destroy({ where: { id } });
