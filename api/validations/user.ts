import {body, oneOf, query} from "express-validator";
import { ValidationLogic } from "../types/validation";

export function valFilterQuery():ValidationLogic{
    return oneOf([
        query("username")
            .default("")
            .isString()
            .isLength({min:6,max:100}),
        body("email")
            .default("")
            .isEmail(),
    ]);
}

export function valUpdateUsername():ValidationLogic[]{
    return [
        body("username")
            .isString()
            .isLength({min:6,max:100})
    ];
}