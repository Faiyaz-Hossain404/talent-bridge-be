import { IncludeOptions, Op, WhereOptions } from "sequelize";
import { Application, Job, Profile, User } from "../models";

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

  const profile = await Profile.findOne({ where: { userId: data.userId } });
  console.log("User profile:", profile?.toJSON());

  const resumeUrlToUse = data.resumeUrl ?? profile?.get("resumeUrl") ?? null;
  console.log("Resume URL to save in application:", resumeUrlToUse);

  const application = await Application.create({
    jobId: data.jobId,
    userId: data.userId,
    coverLetter: data.coverLetter ?? null,
    resumeUrl: resumeUrlToUse,
    metadata: data.metadata ?? null,
    status: "applied",
  });

  console.log("Application created:", application.toJSON());
  return application as unknown as Promise<TApplication>;
};

export const getApplicationsByUser = async (
  userId: number
): Promise<TApplication[]> => {
  const apps = await Application.findAll({
    where: { userId },
    include: [
      {
        model: Job,
        attributes: [
          "id",
          "title",
          "company",
          "location",
          "employmentType",
          "salaryRange",
          "shortDescription",
          "responsibilities",
          "requirements",
          "benefits",
          "deadline",
          "hiringStatus",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return apps.map((app) => {
    // @ts-ignore
    const job = app.get("Job") as Job | null;

    return {
      id: app.get("id") as number,
      jobId: app.get("jobId") as number,
      userId: app.get("userId") as number,
      status: app.get("status") as string,
      appliedAt: app.get("appliedAt") as Date,
      resumeUrl: (app.get("resumeUrl") as string) ?? null,
      coverLetter: (app.get("coverLetter") as string) ?? null,
      metadata: (app.get("metadata") as string) ?? null,
      job: job
        ? {
            id: job.id as number,
            title: job.title as string,
            company: job.company as string,
            location: job.location ?? "",
            employmentType: job.employmentType ?? "",
            salaryRange: job.salaryRange ?? "",
            shortDescription: job.shortDescription ?? "",
            responsibilities: job.responsibilities ?? "",
            requirements: job.requirements ?? "",
            benefits: job.benefits ?? "",
            deadline: job.deadline ?? "",
            hiringStatus: job.hiringStatus ?? "",
          }
        : undefined,
    };
  });
};

export const getApplicationsByJob = (jobId: number): Promise<TApplication[]> =>
  Application.findAll({
    where: { jobId },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Profile,
        attributes: ["resumeUrl"],
      },
    ],
  }) as unknown as Promise<TApplication[]>;

export const updateApplicationStatus = async (
  id: number,
  data: TApplicationStatusUpdateInput
): Promise<TApplication | null> => {
  await Application.update(data, { where: { id } });
  return Application.findByPk(id) as unknown as Promise<TApplication | null>;
};

type AppSort = "newest" | "oldest";

export const getAllApplications = async (
  page: number = 1,
  limit: number = 10,
  opts?: { search?: string; sort?: AppSort }
): Promise<{
  applications: TApplication[];
  total: number;
  totalPages: number;
  currentPage: number;
}> => {
  const offset = (page - 1) * limit;
  const search = opts?.search?.trim();
  const sort = opts?.sort ?? "newest";

  // decide order: newest -> createdAt DESC, oldest -> createdAt ASC
  const order =
    sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

  // Base includes for joining user/profile and job
  const include: IncludeOptions[] = [
    {
      model: User,
      attributes: ["id", "name", "email", "roleId"],
      required: false,
      include: [
        {
          model: Profile,
          attributes: ["fullName", "resumeUrl"],
          required: false,
        },
      ],
    },
    {
      model: Job,
      attributes: ["id", "title", "company", "location"],
      required: false,
    },
  ];

  let where: WhereOptions = {};

  if (search) {
    const pattern = `%${search}%`;

    // Use Sequelize.col paths for joined columns
    where = {
      [Op.or]: [
        // User.name
        { "$User.name$": { [Op.iLike]: pattern } },
        // Profile.full_name (database column name)
        { "$User.Profile.full_name$": { [Op.iLike]: pattern } },
        // Job.title
        { "$Job.title$": { [Op.iLike]: pattern } },
        // Job.company
        { "$Job.company$": { [Op.iLike]: pattern } },
      ],
    };
  }

  const { count, rows } = await Application.findAndCountAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
    order: order as any,
  });

  return {
    applications: rows as unknown as TApplication[],
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};
