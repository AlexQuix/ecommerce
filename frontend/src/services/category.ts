import { IResult } from "../types/models";

export interface ICategory{
    _id:string;
    category_name: string,
    subcategory?: ICategory | string
}

class CategoryServices{
    async getAll():Promise<IResult<ICategory[]>>{
        try{
            const res = await fetch("/api/v1/categories");
            return await res.json();
        }catch(e){
            return {} as IResult<ICategory[]>;
        }
    }
}

export default new CategoryServices();