import { Request } from "express";
import { Roles } from "../utils";

export interface IReqLocals extends Request{
    locals?: {
        user?: IUserLocals;
        role?: Roles;
    }
}

export interface IUserLocals{
    _id:string; 
    role:number;
}