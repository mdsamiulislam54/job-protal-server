import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  photoUrl: string;
  email: string;
  password: string;
  role: [string];
}