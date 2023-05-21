import { useRef } from "react";
import { usePointerStyle } from "../../../hooks/popover";
import { PointerConfig } from "../PopoverWithPointer";

import PopoverFloat from "../PopoverFloat";
import Pointer from "../../../containers/Popover/components/Pointer";

type Props = {
    x:number;
    y:number;
    pointer:PointerConfig
    children: any;
}

export default function PopoverFloatWithPointer({y, x, children, pointer}:Props){
    let popoverRef = useRef({} as HTMLDivElement);
    let pointerStyle = usePointerStyle(popoverRef, pointer);

    return (
        <PopoverFloat x={x} y={y} 
                        Pointer={<Pointer size={pointer.width+"px"} style={pointerStyle} background={pointer.background}/>}
                        ref={popoverRef}>
            {children}
        </PopoverFloat>
    )
}



PopoverFloatWithPointer.defaultProps = {
    pointerX: "center",
    pointerDirectionX: "left",
    pointerDirectionY: "top"
}