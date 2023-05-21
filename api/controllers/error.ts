import {Response, Request} from "express";
import { ResultDirectory } from "../utils/result";

export default class ErrorController{
    static resourceNotFound(req:Request, res:Response){
        res.json(ResultDirectory.resourceNotFound());
    }
    
    static internalError(err:any, req:Request, res:Response, next:()=>void){
        console.log(err);
        res.send(ResultDirectory.internalError());
    }
}