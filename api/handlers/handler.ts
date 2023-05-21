import { Response } from "express";
import { ResultDirectory } from "../utils/result";
import { HttpStatus } from "../utils";

export function HttpInternalError(res:Response){
    res.status(HttpStatus.InternalError).json(ResultDirectory.internalError());
}

export function HttpSuccess<T>(sendData:T, res:Response){
    res.status(HttpStatus.Success).json(ResultDirectory.success(sendData));
}

export function HttpSuccessOperation(res:Response){
    res.status(HttpStatus.Success).json(ResultDirectory.successOperation());
}

export function HttpBadRequest(res:Response, message?:string){
    res.status(HttpStatus.BadRequest).json(ResultDirectory.failureOperation(message));
}

export function HttpOperation(success:boolean, res:Response){
    if(success) return HttpSuccessOperation(res);
    HttpBadRequest(res);
}

export function HttpNotAuthorized(res:Response, message?:string){
    res.status(HttpStatus.NotAuthorized).json(ResultDirectory.notAuthorizated(message))
}