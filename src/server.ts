import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import express from 'express';
import { connectDB } from './config/db';
import router from './routes/route';
import { errorHandler } from './middlewares/ErrorHandling/errorHandling';

const app = express();
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
connectDB().then(()=>{
    console.log("Database connection established");
}).catch((err) => {
  console.error("Database connection failed:", err);
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})



app.use('/api', router)
app.use(errorHandler)

app.use((req,res)=>{
    res.status(404).json({success:false, message:"Route Not Found"})
})
