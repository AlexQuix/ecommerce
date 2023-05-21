import {Schema, model, Types} from "mongoose";

export interface ICategory{
    _id:string;
    category_name: string,
    subcategory?: ICategory | string
}

const CategorySchema = new Schema({
    category_name: String,
    subcategory: {
        type: Types.ObjectId,
        ref: "Categories"
    }
});

const Category = model("Categories", CategorySchema);
export default Category;