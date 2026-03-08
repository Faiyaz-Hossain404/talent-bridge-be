export interface TJob {
  id: number;
  userId: number;
  title: string;
  company: string;
  location?: string;
  employmentType?: string;
  salaryRange?: string;
  shortDescription?: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  deadline?: string;
  hiringStatus?: string;
  isActive?: boolean;
}

export interface TJobCreateInput extends Omit<TJob, "id"> {}
export interface TJobUpdateInput extends Partial<TJobCreateInput> {}
