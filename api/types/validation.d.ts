import { Request } from "express";
import { Result } from "express-validator";

type ValidationLogic = {
    run: (req:Request)=>Promise<Result<any>>
}