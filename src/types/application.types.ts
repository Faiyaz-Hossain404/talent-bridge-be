export interface TApplication {
  id: number;
  jobId: number;
  userId: number;
  status: string;
  appliedAt: Date;
  coverLetter?: string;
  resumeUrl?: string;
  metadata?: string;
}

export interface TApplicationCreateInput {
  jobId: number;
  userId: number;
  resumeUrl?: string;
}
export interface TApplicationStatusUpdateInput {
  status: string;
}
