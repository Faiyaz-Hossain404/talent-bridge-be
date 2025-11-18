import { Op, WhereOptions } from "sequelize";
import { Job } from "../models";

import { TJobCreateInput, TJobUpdateInput, TJob } from "../types/job.types";

type JobSearchBy = "all" | "title" | "company" | "location";
type JobSort = "newest" | "oldest";
type SortField = "createdAt" | "title" | "company" | "location";

export const createJob = (data: TJobCreateInput): Promise<TJob> =>
  Job.create(data) as unknown as Promise<TJob>;

export const getAllJobs = async (
  page: number = 1,
  limit: number = 10,
  opts?: {
    search?: string;
    sort?: JobSort;
  }
): Promise<{
  jobs: TJob[];
  total: number;
  totalPages: number;
  currentPage: number;
}> => {
  const offset = (page - 1) * limit;
  const search = opts?.search?.trim();
  const sort = opts?.sort ?? "newest";

  const order =
    sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

  let where: WhereOptions = {};

  if (search) {
    const pattern = `%${search}%`;

    where = {
      [Op.or]: [
        { title: { [Op.iLike]: pattern } },
        { company: { [Op.iLike]: pattern } },
        { location: { [Op.iLike]: pattern } },
      ],
    };
  }

  const { count, rows } = await Job.findAndCountAll({
    where,
    limit,
    offset,
    order: order as any,
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
