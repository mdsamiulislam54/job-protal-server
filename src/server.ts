import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import { connectDB } from './config/db';

const app = express();
const port = process.env.PORT || 5000
app.use(express.json())

connectDB().then(()=>{
    console.log("Database connection established");
}).catch((err) => {
  console.error("Database connection failed:", err);
});




app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})