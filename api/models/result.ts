export interface IMappedValidationError{
    [key:string]: string[];
}

export interface IResult<T>{
    ok: boolean;
    status_code: number;
    page: number;
    total_page: number;
    result: T;
    message: string;
    validation_errors: IMappedValidationError;
}


export default class Result<T> implements IResult<T>{
    public ok: boolean;
    public status_code: number;
    public result: T;
    public page: number;
    public total_page: number;
    public message: string;
    public validation_errors: IMappedValidationError;
}