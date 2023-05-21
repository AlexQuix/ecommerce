import { FilterQuery } from "mongoose";
import { ObjectId } from "mongodb";
import { Product } from "../models";
import { IProduct, ISpecification } from "../models";
import { calcSkip } from "../utils";

export default class ProductService{
    static findById(id:string){
        return Product.findOne({_id:id, deleted: false});
    }
    
    static async filter(filter: FilterQuery<IProduct>, limit:number = 20, page:number = 1){
        filter.deleted = false;
        let skip = calcSkip(page, limit);
        return await Product.find(filter, 
                                    {__v:0, deleted:0, created_date: 0, description: 0, quantity: 0, category:0, specifications: 0, similar_products: 0}, 
                                    {limit, skip})
    }


    static async datails(id:string){
        try{
            let p = await this.findById(id)
                        .select({__v:0, deleted:0, created_date: 0, quantity: 0})
                        .populate("colors", {__v:0})
                        .populate("category", {__v:0})
                        .populate({ 
                            path: "similar_products", 
                            match: {deleted : false}, 
                            select: {__v:0, deleted:0, created_date: 0, description: 0, quantity: 0, category:0, specifications: 0, similar_products: 0} 
                        });
            return p;
        }catch(e){
            return null
        }
    }
    static async insertOne(product:IProduct):Promise<boolean>{
        try{
            let create = new Product(product);
            await create.save();
            return true;
        }catch(e){
            return false;
        }
    }
    static async updateOne(id:string, product: IProduct):Promise<boolean>{
        try{
            if(id===null || product === null) return false;
            await Product.findByIdAndUpdate(id, product);
            return true;
        }catch(e){
            return false;
        }
    }
    static async softDelete(id:string){
        try {
            let productFound = await this.findById(id);
            if(!productFound || productFound.deleted === true) return false;

            productFound.deleted = true;
            await productFound.save();
            return true;
        } catch (e) {
            return false;
        }
    }


    static async addColors(id:string, colorIds:ObjectId[]):Promise<boolean>{
        try{
            await Product.updateOne({_id:id}, {$push: {colors: colorIds}});
            return true;
        }catch(e){
            return false;
        }
    }
    static async removeColor(id:string, color: string):Promise<boolean>{
        try{
            await Product.updateOne({_id: id}, {$pull: {colors: color}});
            return true;
        }catch(e){
            return false;
        }
    }
    

    static async addSimilarProducts(id:string, similarProducts: ObjectId[]):Promise<boolean>{
        try{
            await Product.updateOne({_id:id}, {$push: {similar_products: similarProducts}});
            return true;
        }catch(e){
            return false;
        }
    }
    static async removeSimilarProducts(id:string, similarProductId: ObjectId):Promise<boolean>{
        try{
            await Product.updateOne({_id:id}, {$pull: {similar_products: similarProductId}});
            return true;
        }catch(e){
            return false;
        }
    }


    static async addSpecification(id:string, specification: ISpecification):Promise<boolean>{
        try{
            await Product.updateOne({_id:id}, {$push: {specifications: specification}});
            return true;
        }catch(e){
            return false;
        }
    }
    static async removeSpecification(id:string, specification: ISpecification):Promise<boolean>{
        try{
            await Product.updateOne({_id:id}, {$pull: {specifications: specification}});
            return true;
        }catch(e){
            return false;
        }
    }

    static async addMainImg(id:string, filename:string):Promise<boolean>{
        try{
            await Product.updateOne({_id: id}, {main_img: filename});
            return true;
        }catch(e){
            return false;
        }
    }

    static async addImgToGalleries(id:string, filename:string):Promise<boolean>{
        try{
            await Product.updateOne({_id: id}, {$push: {img_galleries: filename}});
            return true;
        }catch(e){
            return false;
        }
    }
    static async removeImgToGalleries(id:string, filename:string):Promise<boolean>{
        try{
            await Product.updateOne({_id: id}, {$pull: {img_galleries: filename}});
            return true;
        }catch(e){
            return false;
        }
    }
}