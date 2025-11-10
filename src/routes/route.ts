import express from "express";
import { CreateUser } from "../controllers/Authentication/createUser";
import { LoginUser } from "../controllers/Authentication/loginUser";
import { PostJobs } from "../controllers/Post-Jobs/post-Jobs";
import { GetLatestJobs } from "../controllers/Job-Controllers/latest-jobs";
import { AllJobs } from "../controllers/Job-Controllers/all-jobs";
import { JobDetailsById } from "../controllers/Job-Controllers/jobsById";
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Hello route")
} );


router.post('/create-user', CreateUser);
router.post('/login', LoginUser)
//* Employee

router.post('/job', PostJobs)

router.get('/job', GetLatestJobs)
router.get('/all-jobs', AllJobs)

router.get('/job/:id', JobDetailsById)






export default router;
