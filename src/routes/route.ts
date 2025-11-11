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
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Hello route")
} );


router.post('/create-user', CreateUser);
router.post('/login', LoginUser);
router.post('/application', PostApplication)
//* Employee

router.post('/job', PostJobs)

// * User
router.get('/job', GetLatestJobs)
router.get('/all-jobs', AllJobs)
router.get('/application/:email', UserApplicationByEmail)


//* employee

router.get('/job/:id', JobDetailsById)


// *delete by user

router.delete('/application/:id', UserApplicationDeleteById)



export default router;
