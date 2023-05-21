import { body } from "express-validator";
import { ValidationLogic } from "../types/validation";

export function valBodyDirection():ValidationLogic[]{
    return [
        body("directions")
            .isString()
            .isLength({min:6,max:300})
    ];
}

export function valShoppicart():ValidationLogic[]{
    return [
        body("productId")
            .isMongoId(),
        body("quantity")
            .isNumeric()
    ];
}

export function valFavorite():ValidationLogic{
    return body("productId")
                .isMongoId();
}