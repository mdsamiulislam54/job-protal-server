export interface ApplicationType {
    name: string;
    email: string;
    contactNumber: string;
    github?: string;
    linkedin?: string;
    resume: string;
    question?: string;
    applicationId: string;
    employeeEmail: string;
    companyName: string;
    title: string;
    status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";
    appliedDate: string;
}
