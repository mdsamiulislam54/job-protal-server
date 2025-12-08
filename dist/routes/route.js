"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = require("../controllers/Authentication/createUser");
const loginUser_1 = require("../controllers/Authentication/loginUser");
const post_Jobs_1 = require("../controllers/Post-Jobs/post-Jobs");
const latest_jobs_1 = require("../controllers/Job-Controllers/latest-jobs");
const all_jobs_1 = require("../controllers/Job-Controllers/all-jobs");
const jobsById_1 = require("../controllers/Job-Controllers/jobsById");
const postApplication_1 = require("../controllers/Application/postApplication");
const userApplication_1 = require("../models/ApplicationModel/userApplication");
const userApplicationDeleteById_1 = require("../controllers/Application/userApplicationDeleteById");
const Application_list_1 = require("../controllers/EmployeeApplication/Application_list");
const rejectApplicationById_1 = require("../controllers/EmployeeApplication/rejectApplicationById");
const all_posted_jobs_1 = require("../controllers/EmployeeApplication/all_posted_jobs");
const employee_job_list_delete_By_Id_1 = require("../controllers/EmployeeApplication/employee_job_list_delete_By_Id");
const Dashboard_Card_1 = require("../controllers/Dashboard-Controller/Dashboard_Card");
const job_Chart_1 = require("../controllers/Dashboard-Controller/job_Chart");
const job_type_job_expriance_chart_1 = require("../controllers/Dashboard-Controller/job_type_job_expriance_chart");
const job_per_month_1 = require("../controllers/Dashboard-Controller/job_per_month");
const Latest_application_table_1 = require("../controllers/Dashboard-Controller/Latest_application_table");
const all_user_1 = require("../controllers/Dashboard-Controller/Manage_User/all_user");
const delete_user_1 = require("../controllers/Dashboard-Controller/Manage_User/delete-user");
const pending_application_list_1 = require("../controllers/Dashboard-Controller/pending_application_list");
const change_role_1 = require("../controllers/Dashboard-Controller/Manage_User/change_role");
const manage_all_job_1 = require("../controllers/Dashboard-Controller/manage_all_job");
const accepts_job_1 = require("../controllers/Dashboard-Controller/accepts_job");
const company_list_1 = require("../controllers/CompanyList/company_list");
const verifyToken_1 = require("../middlewares/verifyToken/verifyToken");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello route");
});
router.post('/create-user', createUser_1.CreateUser);
router.post('/login', loginUser_1.LoginUser);
router.post('/application', postApplication_1.PostApplication);
//* Employee
router.post('/job', post_Jobs_1.PostJobs);
// * User
router.get('/job', latest_jobs_1.GetLatestJobs);
router.get('/all-jobs', all_jobs_1.AllJobs);
router.get('/application/:email', verifyToken_1.VerifyToken, userApplication_1.UserApplicationByEmail);
router.get('/company/list', company_list_1.CompanyList);
//* employee
router.get('/job/:id', jobsById_1.JobDetailsById);
router.get('/employee/jobs/list/:email', verifyToken_1.VerifyToken, Application_list_1.Employee_jobs_List);
router.get('/employee/posted/job/:email', verifyToken_1.VerifyToken, all_posted_jobs_1.Posted_All_Jobs);
//* admin
router.get('/dashboard/card', verifyToken_1.VerifyToken, Dashboard_Card_1.DashboardCardData);
router.get('/dashboard/job/chart', verifyToken_1.VerifyToken, job_Chart_1.JobChart);
router.get('/dashboard/job/type/experience', verifyToken_1.VerifyToken, job_type_job_expriance_chart_1.JobTypeAndExperience);
router.get('/dashboard/job/per/month', verifyToken_1.VerifyToken, job_per_month_1.JobsPerMonth);
router.get('/dashboard/latest/application', verifyToken_1.VerifyToken, Latest_application_table_1.LatestApplication);
router.get('/dashboard/get-user', verifyToken_1.VerifyToken, all_user_1.GetAllUser);
router.get('/dashboard/pending/application', verifyToken_1.VerifyToken, pending_application_list_1.PendingApplicationList);
router.get('/dashboard/manage/jobs', verifyToken_1.VerifyToken, manage_all_job_1.ManageAllJobs);
// *delete 
router.delete('/application/:id', verifyToken_1.VerifyToken, userApplicationDeleteById_1.UserApplicationDeleteById);
router.delete('/employee/job/:id', verifyToken_1.VerifyToken, employee_job_list_delete_By_Id_1.EmployeeJobsListDeleteById);
router.delete('/dashboard/delete-user/:id', verifyToken_1.VerifyToken, delete_user_1.AdminUserDelete);
//* Employee 
router.patch('/application/:id', verifyToken_1.VerifyToken, rejectApplicationById_1.Employee_Application_Status_Update_ById);
//* Admin
router.patch('/dashboard/change/role/:id', verifyToken_1.VerifyToken, change_role_1.RoleChange);
router.patch('/dashboard/application/status/:id', verifyToken_1.VerifyToken, accepts_job_1.AdminAcceptsJobs);
exports.default = router;
