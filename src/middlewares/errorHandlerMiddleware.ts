import { NextFunction, Request, Response } from "express";

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction){
    console.log(error)
    if(error){
        return res.status(error.status).send(error.message)
    }

    res.status(500).send("an internal error occurred")
}