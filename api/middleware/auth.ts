import { Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { parseToken } from "../helpers/auth";
import { HttpInternalError, HttpNotAuthorized } from "../handlers/handler";
import { IReqLocals, IUserLocals } from "../types";
import { Roles } from "../utils";

function retrieveTokenFromHeader(authentication?:string){
    try{
        if(!authentication || typeof authentication !== "string") return null;
        return decodeURIComponent(authentication).split(" ").pop();
    }catch(e){
        return null;
    }
}

export function requireAuth(typeRole:Roles){
    return async (req:IReqLocals, res:Response, next:()=>void)=>{
        try{
            let token = retrieveTokenFromHeader(req.headers.authentication as string);
            if(!token) return HttpNotAuthorized(res);
            
            let user =  await parseToken(token) as IUserLocals;
            if(user.role !== Roles.Admin && user.role !== typeRole) 
                return HttpNotAuthorized(res);
            
            req.locals = { user };
            next();
        }catch(e){
            if(e instanceof TokenExpiredError || e instanceof JsonWebTokenError)
                return HttpNotAuthorized(res, "You need to log in again");
    
            HttpInternalError(res);
        }
    }
}

export function assignRoleToLocals(role:Roles){
    return (req:IReqLocals, res:Response, next:any)=>{
        if(!req.locals) req.locals = {};
        req.locals.role = role;
        next();
    }
}