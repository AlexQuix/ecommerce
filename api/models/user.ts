import {IProduct} from "./index";
import {Schema, model } from "mongoose";

export interface IUser{
    username: string,
    password: string,
    directions: string[],
    shoping_cart: IProduct,
    favorites: IProduct,
    readonly created_date: string
}

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        require: true
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const User = model("Users", UserSchema);
export default User;