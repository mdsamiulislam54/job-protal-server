
import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "../../types/userTypes";

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    photoUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",

        required: true

    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        enum: ["user", "employee", "admin"],
        required: true
    }

});

const UserModel = model<IUser>("user", UserSchema);
export default UserModel