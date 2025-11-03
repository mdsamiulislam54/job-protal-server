"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.DB_URL;
if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables!");
}
// ✅ Global caching to prevent multiple connections on Vercel
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
    if (cached.conn) {
        // already connected
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose_1.default
            .connect(MONGODB_URI, {
            dbName: "your_database_name", // optional but recommended
        })
            .then((mongoose) => {
            console.log("✅ MongoDB Connected Successfully");
            return mongoose;
        })
            .catch((err) => {
            console.error("❌ MongoDB connection error:", err);
            throw err;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
