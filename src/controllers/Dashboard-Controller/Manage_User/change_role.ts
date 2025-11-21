import { Request, Response, NextFunction } from "express"
import UserModel from "../../../models/UserModel/userModel";
export const RoleChange = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        // Logic to change user role in the database goes here
        const user = await UserModel.findByIdAndUpdate(id, { role: role });
        res.status(200).send({
            message: `User role changed to ${role} successfully`
        })

    } catch (error) {
        next(error)
    }
}