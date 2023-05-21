// eslint-disable-next-line
import { Color, IResult } from "../types/models";
import { ICategory } from "./category";

export type Specification = {
    title: String,
    description: String
}

export interface IProductQuery{
    product: "*" | string;
    page: number;
    minPrice?: number;
    maxPrice?: number;
    offer?: number;
    category?: string;
}

export interface IProduct{
    _id:string;
    product_name: string,
    description: string,
    price: number,
    quantity: number,
    main_img: string,
    img_galleries: string[],
    category: ICategory[],
    colors: Color[],
    specifications: Specification[],
    offer: number,
    similar_products: IProduct[]
}

function getQueryStringForFilter({
    product,
    page,
    minPrice,
    maxPrice,
    offer,
    category
}:IProductQuery):string{
    let q = ""
    if(product)
        q += "product_name="+product;
    if(page)    
        q += "&page="+page;
    if(minPrice)
        q += "&min_price="+minPrice;
    if(maxPrice)
        q += "&max_price="+maxPrice;
    if(offer)
        q += "&offer="+offer;    
    if(category)
        q += `&category=${category === "Todos" ? "*" : category}`;   

    return q;
}

class ProductService{
    async details(id:string):Promise<IResult<IProduct>>{
        try{
            const res = await fetch("/api/v1/products/"+id);
            return await res.json();
        }catch(e){
            return {} as any;
        }
    }
    async filter(rawQuery:IProductQuery):Promise<IResult<IProduct[]>>{
        try{
            const queryString = getQueryStringForFilter(rawQuery);
            const res = await fetch("/api/v1/products?"+queryString);
            return await res.json();
        }catch(e){
            return {} as any;
        }
    }

    async filterByCategory(id:string):Promise<IResult<IProduct[]>>{
        try{
            const res = await fetch("/api/v1/products?category="+id);
            return await res.json();
        }catch(e){
            return {} as any;
        }
    }
}

const productService = new ProductService();
export default productService;