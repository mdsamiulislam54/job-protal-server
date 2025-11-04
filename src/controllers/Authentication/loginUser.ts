import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import UserModel from "../../models/UserModel/userModel";
export const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User Not Found" })
        }
        const authorize = await bcrypt.compare(password, user?.password);
        if (!authorize) {
            return res.status(401).send({ message: "Invalid Password!" })
        }
        const newUser = {
            name:user.name,
            role:user.role,
            photoUrl: user.photoUrl,
            email:user.email,
            id:user._id
        }

        console.log(newUser)
        return res.status(200).send({ message: "Login Successfully!", newUser })
    } catch (error) {
        next(error)
    }
}