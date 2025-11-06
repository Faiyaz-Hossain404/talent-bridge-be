export interface TApplication {
  id: number;
  jobId: number;
  userId: number;
  status: string;
  appliedAt: Date;
  resumeUrl?: string;
  coverLetter?: string;
  metadata?: string;
}

export interface TApplicationCreateInput {
  jobId: number;
  userId: number;
  resumeUrl?: string;
  coverLetter?: string;
}
export interface TApplicationStatusUpdateInput {
  status: string;
}
