// types/job.ts
export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface JobFormType {
  title: string;
  category: string;
  companyName: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  workingHours: string;
  salaryRange: SalaryRange;
  skills: string[]; 
  postedDate: string;
  deadline: string;
  aboutTheJob: string;
  jobDescription: string;
  responsibilities: string[]; 
  requirements: string[]; 
  benefits: string[]; 
  companyLogo: string;
  contactEmail: string;
  contactMessage: string;
}
