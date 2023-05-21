import { useRef } from "react";
import { usePointerStyle } from "../../../hooks/popover";

import Popover from "../../../containers/Popover";
import Pointer from "../../../containers/Popover/components/Pointer";

type Props = {
    x:number;
    y:number;
    pointer: PointerConfig;
    children: any;
}

export type PointerConfig = {
    width:number, 
    directionX: "left" | "right", 
    directionY: "top" | "bottom",
    x: "center" | string;
    y: "center" | string;
    background: string;
}

export default function PopoverWithPointer({children, pointer}:Props){
    let popoverRef = useRef({} as HTMLDivElement);
    let pointerStyle = usePointerStyle(popoverRef, pointer);

    return (
        <div className="position-relative" ref={popoverRef}>
            <Popover Pointer={<Pointer size={pointer.width+"px"} style={pointerStyle} background={pointer.background}/>}>
                {children}
            </Popover>
        </div>
    )
}