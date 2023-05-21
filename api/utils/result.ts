import {IResult, IMappedValidationError} from "../models";
import {Result} from "../models";
import {HttpStatus} from "../utils";

export class ResultBuilder<T>{
    protected _result: IResult<T>;

    constructor(){
        this._result = new Result();
    }

    setOk(value:boolean){
        this._result.ok = value;
    }
    setStatusCode(value:number){
        this._result.status_code = value;
    }
    setResult(value: T){        
        this._result.result = value;
    }
    setPage(value:number){
        this._result.page = value;
    }
    setTotalPage(value:number){
        this._result.total_page = value;
    }
    setMessage(value:string){
        this._result.message = value;
    }
    setValidationErrors(errors:IMappedValidationError){
        this._result.validation_errors = errors;
    }


    build():IResult<T>{
        return this._result;
    }
}

export class ResultDirectory{
    static success<T>(result:T):IResult<T>{
        let builder:ResultBuilder<T> = new ResultBuilder<T>();
        builder.setOk(true);
        builder.setStatusCode(HttpStatus.Success);
        builder.setResult(result);

        return builder.build();
    }
    static successPagination<T>(page: number, total_page: number, result: T):IResult<T>{
        let builder:ResultBuilder<T> = new ResultBuilder<T>();
        builder.setOk(true);
        builder.setPage(page)
        builder.setTotalPage(total_page)
        builder.setStatusCode(HttpStatus.Success)
        builder.setResult(result);

        return builder.build();
    }
    static successOperation(){
        let builder:ResultBuilder<null> = new ResultBuilder<null>();
        builder.setOk(true);
        builder.setStatusCode(HttpStatus.Success)
        builder.setMessage("The operation has been completed successfully");

        return builder.build();
    }
    static failureOperation(message?:string){
        let builder:ResultBuilder<null> = new ResultBuilder<null>();
        builder.setOk(false);
        builder.setStatusCode(HttpStatus.BadRequest)
        builder.setMessage((message)?message:"The operation has failed");

        return builder.build();
    }
    static resourceNotFound(){
        let builder:ResultBuilder<null> = new ResultBuilder<null>();
        builder.setOk(false);
        builder.setStatusCode(HttpStatus.ResourceNotFound)
        builder.setMessage("Resource not found");

        return builder.build();
    }
    static internalError():IResult<undefined>{
        let builder:ResultBuilder<undefined> = new ResultBuilder<undefined>();
        builder.setOk(false);
        builder.setStatusCode(HttpStatus.InternalError)
        builder.setMessage("An unexpected error has ocurred, please try it later");

        return builder.build();
    }
    static invalidValidation(errors:IMappedValidationError):IResult<undefined>{
        let builder:ResultBuilder<undefined> = new ResultBuilder<undefined>();
        builder.setOk(false);
        builder.setStatusCode(HttpStatus.BadRequest)
        builder.setMessage("Validation error");
        builder.setValidationErrors(errors);

        return builder.build();
    }
    static notAuthorizated(message?:string){
        let builder:ResultBuilder<undefined> = new ResultBuilder<undefined>();
        builder.setOk(false);
        builder.setStatusCode(HttpStatus.NotAuthorized)
        builder.setMessage(message?message:"Your are not authorizated");

        return builder.build();
    }
}