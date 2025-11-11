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
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello route");
});
router.post('/create-user', createUser_1.CreateUser);
router.post('/login', loginUser_1.LoginUser);
//* Employee
router.post('/job', post_Jobs_1.PostJobs);
router.get('/job', latest_jobs_1.GetLatestJobs);
router.get('/all-jobs', all_jobs_1.AllJobs);
router.get('/job/:id', jobsById_1.JobDetailsById);
exports.default = router;
