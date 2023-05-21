import {Request, Response} from "express";
import {IQueryCategory} from "../types/query";
import {ICategory, IResult} from "../models";
import {ResultDirectory} from "../utils/result";
import CategoryService from "../services/category";

class CategoryController{
    async filter(req:Request, res:Response){
        try{
            let {category_name, page} = (req.query as unknown) as IQueryCategory;
            let filter = {category_name: {$regex: category_name, $options: "si"}};
            const data:ICategory[] = await CategoryService.filter(filter, page);
            const result:IResult<ICategory[]> = ResultDirectory.success(data);
            res.json(result);
        }catch(e){
            let result:IResult<undefined> = ResultDirectory.internalError();
            res.json(result);
        }
    }
    async findById(req:Request, res:Response){
        try{
            let {id} = req.params;
            const data:ICategory | null = await CategoryService.findById(id);
            const result:IResult<ICategory | null> = ResultDirectory.success(data);
            res.json(result);
        }catch(e){
            res.json(ResultDirectory.internalError());
        }
    }
    async create(req:Request, res:Response){
        try{
            let data = req.body;

            let success = await CategoryService.insertOne(data);
            if(success)
                return res.json(ResultDirectory.successOperation());
            res.json(ResultDirectory.failureOperation());
        }catch(e){
            res.json(ResultDirectory.internalError());
        }
    }
    async update(req:Request, res:Response){
        try{
            let {id} = req.params;
            let data = req.body as ICategory;
            
            let success = await CategoryService.updateOne(id, data);
            if(success)
                return res.json(ResultDirectory.successOperation());
            res.json(ResultDirectory.failureOperation());
        }catch(e){
            res.json(ResultDirectory.internalError());
        }
    }
}

export default new CategoryController();