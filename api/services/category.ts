import { FilterQuery } from "mongoose";
import Category from "../models/category";
import { ICategory } from "../models";
import { calcSkip } from "../utils";

const LIMIT_ROWS = 20;
const PROJECTION = {__v: 0};

export default class CategoryService{
    static async filter(filter:FilterQuery<ICategory>, page:number = 1):Promise<ICategory[]>{
        let skip = calcSkip(page, LIMIT_ROWS);
        return await Category.find(filter, PROJECTION, {limit: LIMIT_ROWS, skip});
    }
    static async findById(id:string):Promise<ICategory|null>{
        try{
            if(id===null) return null;
            return await Category.findById(id, PROJECTION).populate("subcategory");
        }catch(e){
            return null;
        }
    }
    static async findByName(categoryName:string):Promise<ICategory|null>{
        if(categoryName===null) return {} as ICategory;

        return await Category.findOne({category_name: categoryName}).populate("subcategory");
    }
    static async insertOne(category:ICategory):Promise<boolean>{
        try{
            let create = new Category(category);
            await create.save();
            return true;
        }catch(e){
            return false;
        }
    }
    static async updateOne(id:string, category:ICategory):Promise<boolean>{
        try{
            if(id===null || category === null) return false;
            await Category.findByIdAndUpdate(id, category);
            return true;
        }catch(e){
            return false;
        }
    }
    static async exists(id:string):Promise<boolean>{
        let result = await this.findById(id);
        return Boolean(result);
    }
}