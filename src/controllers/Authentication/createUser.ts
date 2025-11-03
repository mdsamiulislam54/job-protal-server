import { Request, Response, NextFunction } from "express"
import UserModel from "../../models/UserModel/userModel";
import bcrypt from 'bcrypt'
export const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, email, password, role, photoUrl } = req.body;
        const existUser = await UserModel.findOne({ email: email });
        if (existUser) {
            return res.status(409).send({ message: "User Already Exists" })
        }

        const hasPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: hasPassword,
            role,
            photoUrl
        }

        const user = await UserModel.create(userData);
        res.status(200).send({ success: true, message: "User create Successful", user })
    } catch (error) {
        next(error)
    }
}