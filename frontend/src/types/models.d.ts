export type Color = {_id:string, color:string} | string;

export interface IResult<T>{
    ok: boolean;
    status_code: number;
    page: number;
    total_page: number;
    result: T;
    message: string;
    validation_errors: IMappedValidationError;
}

export interface IMappedValidationError{
    [key:string]: string[];
}