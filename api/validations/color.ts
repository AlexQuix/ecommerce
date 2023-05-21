import {ValidationLogic} from "../types/validation";
import {body, query, Result} from "express-validator";
import {queryPage} from "./pagination";

const COLOR_MIN_MAX = {min:6, max:20};
const COLOR_MSG = "Must have a minimum of 6 characters and a maximum of 20";

export function validateColor():ValidationLogic{
    return body("color")
                .isLength(COLOR_MIN_MAX)
                .withMessage(COLOR_MSG)
                .custom((value:string)=>{
                    let matches = value.match(/((\#[a-f0-9]{6,8})|(\d{1,3}\,\d{1,3}\,\d{1,3}(\,\d{1,3})?))/);
                    if(matches === null) return false;
                    return matches[0].length === value.length;
                })
                .withMessage("The structure is not correct");
}

export function validateQuery():ValidationLogic[]{
    return [
        query("color").default("").isString(),
        queryPage()
    ]
}