export const calcSkip = (page:number, limit:number)=> (page - 1) * limit;

export enum HttpStatus{
    Success = 200,
    Created = 201,
    BadRequest = 400,
    NotAuthorized = 401,
    ResourceNotFound = 404,
    InternalError = 500
}

export enum Roles{
    Client = 200,
    Admin = 300
}