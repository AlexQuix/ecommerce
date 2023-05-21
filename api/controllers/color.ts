import { Request, Response } from "express";
import { IColor } from "../models";
import { IQueryColor } from "../types/query";
import ColorService from "../services/color";
import { HttpInternalError, HttpOperation, HttpSuccess } from "../handlers/handler";

class ColorController{
    async filter(req:Request, res:Response){
        try{
            let {color, page} = req.query as unknown as IQueryColor;    
            let filter = {color: {$regex: color, $options: "si"}};
            let data = await ColorService.filter(filter, page)
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async findById(req:Request, res:Response){
        try{
            let {id} = req.params
            let data = await ColorService.findById(id);
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async create(req:Request, res:Response){
        try{
            let data = req.body as IColor;
            let success = await ColorService.insertOne(data);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async update(req:Request, res:Response){
        try{
            let {id} = req.params;
            let data = req.body as IColor;
            let success = await ColorService.updateOne(id, data);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
}

export default new ColorController();