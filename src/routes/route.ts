import express from "express";
import { CreateUser } from "../controllers/Authentication/createUser";
import { LoginUser } from "../controllers/Authentication/loginUser";
import { PostJobs } from "../controllers/Post-Jobs/post-Jobs";
import { GetLatestJobs } from "../controllers/Job-Controllers/latest-jobs";
import { AllJobs } from "../controllers/Job-Controllers/all-jobs";
import { JobDetailsById } from "../controllers/Job-Controllers/jobsById";
import { PostApplication } from "../controllers/Application/postApplication";
import { UserApplicationByEmail } from "../models/ApplicationModel/userApplication";
import { UserApplicationDeleteById } from "../controllers/Application/userApplicationDeleteById";
import { Employee_jobs_List } from "../controllers/EmployeeApplication/Application_list";
import { Employee_Application_Status_Update_ById } from "../controllers/EmployeeApplication/rejectApplicationById";
import { Posted_All_Jobs } from "../controllers/EmployeeApplication/all_posted_jobs";
import { EmployeeJobsListDeleteById } from "../controllers/EmployeeApplication/employee_job_list_delete_By_Id";
import { DashboardCardData } from "../controllers/Dashboard-Controller/Dashboard_Card";
import { JobChart } from "../controllers/Dashboard-Controller/job_Chart";
import { JobTypeAndExperience } from "../controllers/Dashboard-Controller/job_type_job_expriance_chart";
import { JobsPerMonth } from "../controllers/Dashboard-Controller/job_per_month";
import { LatestApplication } from "../controllers/Dashboard-Controller/Latest_application_table";
import { GetAllUser } from "../controllers/Dashboard-Controller/Manage_User/all_user";
import { AdminUserDelete } from "../controllers/Dashboard-Controller/Manage_User/delete-user";
import { PendingApplicationList } from "../controllers/Dashboard-Controller/pending_application_list";
import { RoleChange } from "../controllers/Dashboard-Controller/Manage_User/change_role";
import { ManageAllJobs } from "../controllers/Dashboard-Controller/manage_all_job";
import { AdminAcceptsJobs } from "../controllers/Dashboard-Controller/accepts_job";
import { CompanyList } from "../controllers/CompanyList/company_list";
import { VerifyToken } from "../middlewares/verifyToken/verifyToken";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello route")
});


router.post('/create-user', CreateUser);
router.post('/login', LoginUser);
router.post('/application', PostApplication)
//* Employee

router.post('/job', PostJobs)

// * User
router.get('/job', GetLatestJobs)
router.get('/all-jobs', AllJobs)
router.get('/application/:email', VerifyToken, UserApplicationByEmail);
router.get('/company/list', CompanyList)


//* employee

router.get('/job/:id', JobDetailsById)
router.get('/employee/jobs/list/:email', VerifyToken, Employee_jobs_List);
router.get('/employee/posted/job/:email', VerifyToken, Posted_All_Jobs)


//* admin

router.get('/dashboard/card', VerifyToken, DashboardCardData)
router.get('/dashboard/job/chart', VerifyToken, JobChart);
router.get('/dashboard/job/type/experience', VerifyToken, JobTypeAndExperience)
router.get('/dashboard/job/per/month', VerifyToken, JobsPerMonth);
router.get('/dashboard/latest/application', VerifyToken, LatestApplication);
router.get('/dashboard/get-user', VerifyToken, GetAllUser);
router.get('/dashboard/pending/application', VerifyToken, PendingApplicationList);
router.get('/dashboard/manage/jobs', VerifyToken, ManageAllJobs);


// *delete 

router.delete('/application/:id',VerifyToken,  UserApplicationDeleteById);
router.delete('/employee/job/:id',VerifyToken,  EmployeeJobsListDeleteById);
router.delete('/dashboard/delete-user/:id', VerifyToken, AdminUserDelete);

//* Employee 
router.patch('/application/:id', VerifyToken, Employee_Application_Status_Update_ById)

//* Admin
router.patch('/dashboard/change/role/:id', VerifyToken, RoleChange);
router.patch('/dashboard/application/status/:id', VerifyToken, AdminAcceptsJobs);

export default router;
