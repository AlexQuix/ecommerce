import {body} from "express-validator";
import { ValidationLogic } from "../types/validation";

export function valSignin():ValidationLogic[]{
    return [
        body("username")
            .isString()
            .isLength({min:6,max:100}),
        body("email")
            .isEmail(),
        body("password")
            .isString()
            .isLength({min:8,max:24}),
        body("confirm_password")
            .isString()
            .isLength({min:8,max:24})
    ];
}

export function valLogin():ValidationLogic[]{
    return [
        body("userOrEmail")
            .isString()
            .isLength({min:6,max:100}),
        body("password")
            .isString()
            .isLength({min:8,max:24})
    ];
}