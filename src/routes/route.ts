import express from "express";
import { CreateUser } from "../controllers/Authentication/createUser";
import { LoginUser } from "../controllers/Authentication/loginUser";
import { PostJobs } from "../controllers/Post-Jobs/post-Jobs";
import { GetLatestJobs } from "../controllers/Job-Controllers/latest-jobs";
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Hello route")
} );


router.post('/create-user', CreateUser);
router.post('/login', LoginUser)
//* Employee

router.post('/job', PostJobs)

router.get('/job', GetLatestJobs)









export default router;
