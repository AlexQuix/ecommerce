import { body, oneOf, query} from "express-validator";
import { ValidationLogic } from "../types/validation";
import { queryPage } from "./pagination";

const VALIDATION_CHAIN = [
    body("product_name")
        .isString()
        .withMessage("Must be an string")
        .isLength({min:1, max: 50})
        .withMessage("Must have a minimum of 1 characters and a maximum of 50"),
    body("description")
        .isString()
        .withMessage("Must be an string")
        .isLength({min:0, max: 300})
        .withMessage("Must have a minimum of 1 characters and a maximum of 50"),
    body("price")
        .isDecimal()
        .withMessage("Must be an decimal"),
    body("quantity")
        .isInt()
        .withMessage("Must be an integer"),
    body("category")
        .isString()
        .withMessage("Must be an string"),
    body("offer")
        .isInt()
        .withMessage("Must be an integer"),
];

export function validateFilterQuery():ValidationLogic[]{
    return [
        query("product_name")
            .default("")
            .isString(),
        query("min_price")
            .default(0)
            .isInt()
            .customSanitizer((value)=> +value),
        query("max_price")
            .default(0)
            .isInt()
            .customSanitizer((value)=> +value),
        query("quantity")
            .default(0)
            .isInt()
            .customSanitizer((value)=> +value),
        query("offer")
            .default(0)
            .isInt()
            .customSanitizer((value)=> +value),
        query("category")
            .default("")
            .isString(),
        queryPage()
    ];
}

export function validateCreateProduct():ValidationLogic[]{
    return [...VALIDATION_CHAIN];
}
export function validateUpdateProduct():ValidationLogic{
    return oneOf(VALIDATION_CHAIN);
}


// VALIDATES FOR COLORS
export function validateProductAddColors():ValidationLogic{
    return body("colors")
            .isArray()
            .withMessage("Must be an array")
            .custom((values:string[])=>{
                if(!(values instanceof Array)) return false;
                return values.every((v:string)=> typeof v === "string" && v.length === 24)
            });
}
export function validateProductRemoveColor():ValidationLogic{
    return body("colors")
            .isString()
            .isLength({min:24,max:24});
}


// VALIDATES FOR SIMILAR PRODUCT
export function validateAddSimilarProduct():ValidationLogic{
    return body("similar_products")
            .isArray()
            .withMessage("Must be an array")
            .custom((values:string[]):boolean=>{
                if(!(values instanceof Array)) return false;
                return values.every((v:string)=> typeof v === "string" && v.length === 24);
            });
}
export function validateRemoveSimilarProduct():ValidationLogic{
    return body("similar_products")
            .isString()
            .isLength({min:24,max:24});
}


export function validateSpecification():ValidationLogic[]{
    return [
        body("title")
            .isString()
            .isLength({min:5,max:100}),
        body("description")
            .isString()
            .isLength({min:5,max:250})
    ]
}


export function validateRemoveImgFromGalleries():ValidationLogic{
    return body("img")
            .isString();
}