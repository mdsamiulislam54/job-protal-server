"use strict";
// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// const MONGODB_URI = process.env.DB_URL as string;
// if (!MONGODB_URI) {
//   throw new Error("❌ MONGODB_URI is not defined in environment variables!");
// }
// // ✅ Global caching to prevent multiple connections on Vercel
// let cached = (global as any).mongoose;
// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }
// export async function connectDB() {
//   if (cached.conn) {
//     // already connected
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         dbName: "your_database_name", 
//       })
//       .then((mongoose) => {
//         console.log("✅ MongoDB Connected Successfully");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("❌ MongoDB connection error:", err);
//         throw err;
//       });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.DB_URL;
if (!MONGODB_URI) {
    throw new Error("MongoDB URI missing!");
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI, {
            dbName: "your_database_name",
        });
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // force exit
    }
};
exports.connectDB = connectDB;
