import { FilterQuery } from "mongoose";
import Color from "../models/color";
import { IColor } from "../models";
import { calcSkip } from "../utils";

const LIMIT_ROWS = 20;
const PROJECTION = {__v: 0}

export default class ColorService{
    static async filter(filter:FilterQuery<IColor>, page:number = 1):Promise<IColor[]>{
        let skip = calcSkip(page, LIMIT_ROWS);
        return await Color.find(filter, PROJECTION, {limit: LIMIT_ROWS, skip});
    }
    static async findById(id:string):Promise<IColor|null>{
        if(id===null) return {} as IColor;
        return await Color.findById(id, PROJECTION);
    }
    static async findByName(color:string){
        if(color===null) return {} as IColor;
        return await Color.findOne({color});
    }
    static async insertOne(color:IColor):Promise<boolean>{
        try{
            let create = new Color(color);
            await create.save();
            return true;
        }catch(e){
            return false;
        }
    }
    static async updateOne(id:string, color:IColor):Promise<boolean>{
        try{
            if(id===null || color === null) return false;
            await Color.findByIdAndUpdate(id, color);
            return true;
        }catch(e){
            return false;
        }
    }
}