import exv from "express-validator";
import {IMappedValidationError} from "../models";

export function mapToValidationError(errors:exv.ValidationError[]):IMappedValidationError{
    let mapped:IMappedValidationError = {};
    function covertToValidationError(value:exv.ValidationError){
        createArrayThenPush(mapped, value.param, value.msg)
    }

    if(errors[0].param === "_error")
        (errors[0].nestedErrors as exv.ValidationError[])?.map(covertToValidationError);
    else
        errors.map(covertToValidationError);

    return mapped;
}

// set an array in the property then push the value inside the array
function createArrayThenPush(mapped:IMappedValidationError, prop:string, error:string){
    if(!(mapped[prop] instanceof Array))
        mapped[prop] = [];

    mapped[prop].push(error);
}