import { query } from "express-validator";

export function queryPage(){
    return query("page")
            .default(1)
            .isInt()
}