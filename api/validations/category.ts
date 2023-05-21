import {body, oneOf, query} from "express-validator";
import { ValidationLogic } from "../types/validation";
import { queryPage } from "./pagination";

const NAME_MIN_MAX = {min: 5, max: 40};

export function validateCategory():ValidationLogic{
    return oneOf([
        body("category_name")
            .isString()
            .isLength(NAME_MIN_MAX)
            .withMessage("Must have minimun 5 and maximus 40 characters"),
        body("subcategory")
            .isString()
            .isLength({min: 24, max:24})
            .withMessage("Must be string"),
    ], ["body"]);
}

export function validateQuery():ValidationLogic{
    return oneOf([
        query("category_name")
            .default("")
            .isString(),
        queryPage()
    ])
}