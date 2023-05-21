import {Schema, model, Types} from "mongoose";
import {ICategory, IColor} from "./index";

export interface ISpecification{        
    title: string,
    description: string
}

export interface IProduct{
    _id:string;
    product_name: string,
    description: string,
    price: number,
    quantity: number,
    main_img: string,
    img_galleries: string[],
    readonly created_date: string,
    category: ICategory[],
    colors: IColor[],
    specifications: ISpecification[],
    offer: number,
    similar_products: IProduct[]
}

const ProductSchema = new Schema({
    product_name: String,
    description: String,
    price: Number,
    quantity: Number,
    main_img: String,
    img_galleries: [String],
    category: {
        type: Types.ObjectId,
        ref: "Categories"
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    colors: [{
        type: Types.ObjectId,
        ref: "Colors"
    }],
    specifications: [{
        title: String,
        description: String
    }],
    offer: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    similar_products: [{type: Types.ObjectId, ref: "Products"}],
    deleted:{
        type: Boolean,
        default: false
    }
});

const Product = model("Products", ProductSchema);
export default Product;