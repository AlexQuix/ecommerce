import {useEffect, useRef} from "react";

export type Device = "small-mobile" | "mobile" | "tablet" | "laptop" | "desktop" | "extra-desktop";

export enum DEVICE_WIDTH{
    SMALL_MOBILE = 380,
    MOBILE = 576,
    TABLET = 768,
    LAPTOP = 992,
    DESKTOP = 1200,
    EXTRA_DESKTOP = 1400
}

export const SMALL_MOBILE_WIDTH = 380;
export const MOBILE_WIDTH = 576;
export const TABLET_WIDTH = 768;
export const LAPTOP_WIDTH = 992;
export const DESKTOP_WIDTH = 1200;
export const EXTRA_DESKTOP_WIDTH = 1400;


export function useDevice(){    
    function getDevice():Device{
        if(window.innerWidth < SMALL_MOBILE_WIDTH)
            return "small-mobile";
        if(window.innerWidth < MOBILE_WIDTH)
            return "mobile";
        if(window.innerWidth < TABLET_WIDTH)
            return "tablet";
        if(window.innerWidth < LAPTOP_WIDTH)
            return "laptop";
        if(window.innerWidth < DESKTOP_WIDTH)
            return "desktop";
        
        return "extra-desktop";
    }

    return getDevice();
}

export function currentDevice(){    
    if(window.innerWidth < DEVICE_WIDTH.SMALL_MOBILE)
        return DEVICE_WIDTH.SMALL_MOBILE;
    if(window.innerWidth < DEVICE_WIDTH.MOBILE)
        return DEVICE_WIDTH.MOBILE;
    if(window.innerWidth < DEVICE_WIDTH.TABLET)
        return DEVICE_WIDTH.TABLET;
    if(window.innerWidth < DEVICE_WIDTH.LAPTOP)
        return DEVICE_WIDTH.LAPTOP;
    if(window.innerWidth < DEVICE_WIDTH.DESKTOP)
        return DEVICE_WIDTH.DESKTOP;

    return DEVICE_WIDTH.EXTRA_DESKTOP;
}


export function useResize(cb:()=>void){
    const cbRef = useRef(cb);

    useEffect(()=>{
        let cb = cbRef.current;
        cb();
        
        window.addEventListener("resize", cb);

        return ()=>{
            window.removeEventListener("resize", cb);
        }
    }, [cbRef])
}