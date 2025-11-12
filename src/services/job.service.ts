import { Job } from "../models";

import { TJobCreateInput, TJobUpdateInput, TJob } from "../types/job.types";

export const createJob = (data: TJobCreateInput): Promise<TJob> =>
  Job.create(data) as unknown as Promise<TJob>;

export const getAllJobs = async (
  page: number = 1,
  limit: number = 10
): Promise<{
  jobs: TJob[];
  total: number;
  totalPages: number;
  currentPage: number;
}> => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Job.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    jobs: rows as unknown as TJob[],
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

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
