import { Application } from "../models/application.model";
import {
  TApplicationCreateInput,
  TApplicationStatusUpdateInput,
  TApplication,
} from "../types/application.types";

export const createApplication = (
  data: TApplicationCreateInput
): Promise<TApplication> =>
  Application.create({
    ...data,
    status: "applied",
  }) as unknown as Promise<TApplication>;

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
