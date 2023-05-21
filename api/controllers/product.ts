import path from "path";
import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { ObjectId } from "mongodb";
import { CategoryService, ProductService } from "../services";
import { IQueryProduct } from "../types/query";
import { ICategory, IProduct, ISpecification } from "../models";
import { HttpInternalError, HttpSuccess, HttpBadRequest, HttpOperation } from "../handlers/handler";
import { removeFileAsync, existFileAsync } from "../utils/file";

export const IMG_FOLDER = path.join(process.cwd(), "public", "assets", "img");

type BodyColor = { colors:string[]};
type BodyRemoveColor = { colors:string };
type BodyRemoveSimilarProduct = { similar_products:string };
type BodyAddSimilarProduct = { similar_products:string[]};

export class FilterProduct{
    private _filter:FilterQuery<IProduct>;
    constructor(){
        this._filter = {};
    }
    ByPrice(min:number, max:number){
        if(min || max){
            this._filter.price = {};
            if(typeof min === "number" && min > 0)
                this._filter.price["$gte"] = min;
    
            if(typeof max === "number" && max > 0)
                this._filter.price["$lte"] = max;
        }        

        return this;
    }
    byOffer(value:number){
        if(value && typeof value === "number")
            this._filter.offer = {$gte: value};
        return this;
    }
    byName(value:string){
        if(value && typeof value === "string" && value !== "*")
            this._filter.product_name = {$regex: value, $options:"si"};
        return this;
    }
    byCategory(value?:string){
        if(value && typeof value === "string" && value !== "*")
            this._filter.category = value;

        return this;
    }
    result(){
        return this._filter;
    }
}

function repeatedObjectId(array:ObjectId[], array2:ObjectId[]):boolean{
    return array.some((v)=> 
            array2.some(p=>`${p}` === `${v}`));
}

class ProductController{
    async filter(req:Request, res:Response){
        try{
            let {
                product_name,
                min_price,
                max_price,
                offer,
                page,
                quantity,
                category
            } = req.query as unknown as IQueryProduct;


            // validate if the category exists
            let categoryFound:ICategory | null = null;
            if(category !== "*")
                categoryFound = await CategoryService.findByName(category);

            if(!categoryFound && category !== "*")
                return HttpBadRequest(res);
                
            let filter = new FilterProduct()
                            .ByPrice(min_price, max_price)
                            .byOffer(offer)
                            .byName(product_name)
                            .byCategory(`${categoryFound ? categoryFound._id : ""}`)
                            .result();
            
            let data = await ProductService.filter(filter, 20, page);
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async details(req:Request, res:Response){
        try{
            let {id} = req.params;
            const data = await ProductService.datails(id);
            HttpSuccess(data, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async create(req:Request, res:Response){
        try{
            let data = req.body as IProduct;

            let success = await ProductService.insertOne(data);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async update(req:Request, res:Response){
        try{
            let {id} = req.params;
            let data = req.body as IProduct;

            let success = await ProductService.updateOne(id, data);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async softDelete(req:Request, res:Response){
        try {
            let {id} = req.params;
            let success = await ProductService.softDelete(id);
            HttpOperation(success, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }

    // Add color to colos
    async addColors(req:Request, res:Response){
        try {
            let {id} = req.params;
            let {colors} = req.body as BodyColor;
            let colorIds = colors.map((v)=> new ObjectId(v));

            // validate if the id is in the similar_products to avoid auto-referenced
            let areEqual = colors.some((v)=> id === v);
            if(areEqual) return HttpBadRequest(res);

            let p = await ProductService.findById(id);
            if(!p) return HttpBadRequest(res, "product was not found");

            // validate if there are repeated data
            if(repeatedObjectId(p.colors as ObjectId[], colorIds))
                return HttpBadRequest(res, "there are colors that have already been added");

            let success = await ProductService.addColors(id, colorIds);
            HttpOperation(success, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
    async removeColors(req:Request, res:Response){
        try {
            let {id} = req.params;
            let {colors} = req.body as BodyRemoveColor;

            let success = await ProductService.removeColor(id, colors);
            HttpOperation(success, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }

    // Add products to similar products
    async addSimilarProducts(req:Request, res:Response){
        try {
            let {id} = req.params;
            let {similar_products} = req.body as BodyAddSimilarProduct;
            let similarProductId = similar_products.map((v)=>new ObjectId(v));

            // validate if the id is in the similar_products to avoid auto-referenced
            let areEqual = similar_products.some((v)=> id === `${v}`);
            if(areEqual)
                return HttpBadRequest(res);

            let p = await ProductService.findById(id);
            if(!p) return HttpBadRequest(res, "product was not found");

            // validate if there are repeated data
            if(repeatedObjectId(p.similar_products as ObjectId[], similarProductId))
                return HttpBadRequest(res);

            let success = await ProductService.addSimilarProducts(id, similarProductId);
            HttpOperation(success, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }
    async removeSimilarProducts(req:Request, res:Response){
        try {
            let {id} = req.params;
            let {similar_products} = req.body as BodyRemoveSimilarProduct;

            let success = await ProductService.removeSimilarProducts(id, new ObjectId(similar_products));
            HttpOperation(success, res);
        } catch (e) {
            HttpInternalError(res);
        }
    }

    // SPECIFICATIONS
    async addSpecification(req:Request, res:Response){
        try{
            let {id} = req.params;
            let specification = req.body as ISpecification;
            let success = await ProductService.addSpecification(id, specification);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res)
        }
    }
    async removeSpecification(req:Request, res:Response){
        try{
            let {id} = req.params;
            let specification = req.body as ISpecification;
            let success = await ProductService.removeSpecification(id, specification);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res)
        }
    }

    // MAIN IMG
    async addMainImg(req:any, res:Response){
        try{
            let {id} = req.params;
            if(!req.file) 
                return HttpBadRequest(res, "could not save file");
            
            let p = await ProductService.findById(id);
           
            let success = await ProductService.addMainImg(id, req.file.filename);
            
            // delete the img if the product have an img reference
            
            if(p?.main_img && success){
                let fullpath = path.join(IMG_FOLDER, p.main_img as string);
                await removeFileAsync(fullpath);
            }

            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }


    // ADD IMG TO GALLERIES
    async addImgToGalleries(req:any, res:Response){
        try{
            let {id} = req.params;
            if(!req.file) 
                return HttpBadRequest(res, "could not save file");

            // it is not necesary verify if the product exists, 
            // because the verifyProduct middleware will do it

            let success = await ProductService.addImgToGalleries(id, req.file.filename);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
    async removeImgFromGalleries(req:Request, res:Response){
        try{
            let {id} = req.params;
            let {img} = req.body;

            // it is not necesary verify if the product exists, 
            // because the verifyProduct middleware will do it

            // verify if exist the file
            let fullpath = path.join(IMG_FOLDER, img);
            if(!(await existFileAsync(fullpath)))
                return HttpBadRequest(res, "file was not found");

            let success = await ProductService.removeImgToGalleries(id, img);

            // remove the file if the previous operation was success
            if(success) await removeFileAsync(fullpath);
            HttpOperation(success, res);
        }catch(e){
            HttpInternalError(res);
        }
    }
}

export default new ProductController();