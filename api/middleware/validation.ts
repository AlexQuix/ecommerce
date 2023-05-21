import { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import { ValidationLogic } from "../types/validation";
import { HttpStatus } from "../utils";
import { ResultDirectory } from "../utils/result";
import { mapToValidationError } from "../utils/validator";

export async function execValidationLogic(req:Request, validation: ValidationLogic[] | ValidationLogic){
    if(validation instanceof Array)
        return await Promise.all(validation.map((v)=>v.run(req)));;
    
    return await validation.run(req);
}

export function hasSameProperties(value1:object, value2:object){
    return Object.keys(value1).length === Object.keys(value2).length;  
}

export function validate(validationLogic:ValidationLogic[] | ValidationLogic, location:"body"|"query" = "query"){
    return async (req:Request, res:Response, next:NextFunction)=>{
        await execValidationLogic(req, validationLogic);

        // if there are not error, it will execute the next middleware
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // send the validation errors to the client
            let validationErrors = mapToValidationError(errors.array());
            return res.status(HttpStatus.BadRequest)
                        .json(ResultDirectory.invalidValidation(validationErrors));
        }
        
        // validate that the data added "hidden properties"
        if(!hasSameProperties(req[location], matchedData(req)))
            return res.status(HttpStatus.BadRequest)
                        .json(ResultDirectory.invalidValidation([] as any));

        return next();
    }
}