import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction){
    if(error.isJoi){
        return res.status(422).send("you send incorrect data")
    }
    if(error){
        return res.status(error.status).send(error.message)
    }

    res.status(500).send("an internal error occurred")
}