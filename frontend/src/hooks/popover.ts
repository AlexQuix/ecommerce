import { useEffect, useState, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { Device } from ".";
import { PointerConfig } from "../components/Popover/PopoverWithPointer";
import { IRect, PopoverActions } from "../store/slices/popover";

type Payload = {
    rect:IRect;
    data:any;
}

export function usePopover(device:Device, isHover:boolean, payload:Payload, actions:PopoverActions){
    const dispath = useDispatch();

    useEffect(()=>{
        // Check if the device is a desktop or laptop
        // If it's not, return and do nothing
        if(device !== "desktop" && device !== "laptop" && device !== "extra-desktop") return;

        let id = 0;
        // Check if the mouse is hover
        if(isHover){
            // Dispatch an action to set data
            dispath(actions.setData(payload.data));

            // Set a timeout to show the popover after 700ms
            id = setTimeout(()=>{
                dispath(actions.setPos(payload.rect))
                dispath(actions.setShow(true) as any);
            }, 700) as unknown as number;
        }else{
            // If the mouse is not hovering, hide the popover
            dispath(actions.setShow(false) as any);
        }

        // Clean up the timeout to avoid memory leaks
        return ()=>{
            clearTimeout(id);
        }
    }, [isHover, payload, device, dispath, actions]);
}

export function usePointerStyle(popoverRef:MutableRefObject<HTMLDivElement>, pointer:PointerConfig){
    let [pointerStyle, setPointerStyle] = useState({} as React.CSSProperties);

    useEffect(()=>{
        setTimeout(()=>{
            // If the popover reference exists and is valid, the hook calculates the position of the pointer
            if(popoverRef && popoverRef.current){
                let {width, height} = popoverRef.current.getBoundingClientRect();
                let x = (width/2)-(pointer.width/2);
                let y = (height/2)-(pointer.width/2);
    
                // creates a new style object and sets the position of the pointer based on the direction and coordinates provided
                let style:React.CSSProperties = {};
                style[pointer.directionX] = (pointer.x === "center")? x+"px" : pointer.x;
                style[pointer.directionY] = (pointer.y === "center")? y+"px" : pointer.y;
    
                // updates the pointer style state variable with the new style object
                setPointerStyle(style);
            }
        }, 50);
    }, [pointer, popoverRef]);
    
    // returns the pointer style state variable
    return pointerStyle;
}