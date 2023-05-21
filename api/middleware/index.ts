import {Request, Response, RequestHandler} from "express";
import { HttpBadRequest, HttpInternalError } from "../handlers/handler";
import {ProductService} from "../services";

export async function verifyProduct(req:Request, res:Response, next:any){
    try{
        let {id} = req.params;
        let p = await ProductService.findById(id);
        if(!p) return HttpBadRequest(res, "product was not found")

        next();
    }catch(e){
        HttpInternalError(res);
    }
}

// if there are an error, multer by default pass the error to express
// this function always call the next middleware even if there is an error
export function multerIgnoreError(multer: RequestHandler){
    return (req:Request, res:Response, next:any)=>{
        multer(req, res, (err) => {
            next();
        });
    }
}