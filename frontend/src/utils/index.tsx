import { DEVICE_WIDTH } from "../hooks";
import { IProductFromShoppingCart } from "../services/client";

export function retrieveCSSVariable(cssVariable:string, origin?:HTMLElement):number{
    if(!origin?.className) origin = document.documentElement;
    let variableFound = getComputedStyle(origin).getPropertyValue(cssVariable);
    return matchNumber(variableFound, true);
}

export function setCssVariable(name:string, value:string){
    document.body.style.setProperty(name, value);
}

export function matchNumber(value:string, extractDecimal:boolean = false):number{
    let regex = extractDecimal ? /\d+(\.)?\d*/ : /\d+/
    let result = value.match(regex);
    return (result)? +result[0] : 0;
}

export function minDevice(device:DEVICE_WIDTH, minDevice:DEVICE_WIDTH){
    if(device > minDevice)
        return true;

    return false;
}

export function matchPathname(pathname:string, matches:string[] | string){
    if(typeof matches === "string")
        return pathname === matches;

    return matches.some( v => v === pathname);
}

export function calcTotalPrice(products:IProductFromShoppingCart[]):number{
    return products.reduce((acc, current)=>{
        return acc + (current.product.price * current.quantity)
    }, 0);
}