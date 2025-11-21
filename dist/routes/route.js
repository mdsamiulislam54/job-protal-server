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
router.get('/application/:email', userApplication_1.UserApplicationByEmail);
//* employee
router.get('/job/:id', jobsById_1.JobDetailsById);
router.get('/employee/jobs/list/:email', Application_list_1.Employee_jobs_List);
router.get('/employee/posted/job/:email', all_posted_jobs_1.Posted_All_Jobs);
//* admin
router.get('/dashboard/card', Dashboard_Card_1.DashboardCardData);
router.get('/dashboard/job/chart', job_Chart_1.JobChart);
router.get('/dashboard/job/type/experience', job_type_job_expriance_chart_1.JobTypeAndExperience);
router.get('/dashboard/job/per/month', job_per_month_1.JobsPerMonth);
router.get('/dashboard/latest/application', Latest_application_table_1.LatestApplication);
router.get('/dashboard/get-user', all_user_1.GetAllUser);
router.get('/dashboard/pending/application', pending_application_list_1.PendingApplicationList);
// *delete 
router.delete('/application/:id', userApplicationDeleteById_1.UserApplicationDeleteById);
router.delete('/employee/job/:id', employee_job_list_delete_By_Id_1.EmployeeJobsListDeleteById);
router.delete('/dashboard/delete-user/:id', delete_user_1.AdminUserDelete);
//* Employee 
router.patch('/application/:id', rejectApplicationById_1.Employee_Application_Status_Update_ById);
//* Admin
router.patch('/dashboard/change/role/:id', change_role_1.RoleChange);
exports.default = router;
