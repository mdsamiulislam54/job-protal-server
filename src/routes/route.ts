import express from "express";
import { CreateUser } from "../controllers/Authentication/createUser";
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Hello route")
} );


router.post('/create-user', CreateUser);













export default router;
