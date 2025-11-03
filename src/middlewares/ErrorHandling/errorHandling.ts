import { Request, Response, NextFunction } from "express";

interface IError extends Error {
    status?:number
}


export const errorHandler = (
    err:IError,
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    console.error("Error:", err.message);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success:false,
        message:err.message || "internal server error"
    })

    
}