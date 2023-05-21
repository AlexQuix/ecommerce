import {Schema, model} from "mongoose";

export interface IColor{
    color: String
}

export const ColorSchema = new Schema({
    color: String
});

const Color = model("Colors", ColorSchema);
export default Color;