import { LegacyRef, forwardRef } from "react";

import Popover from "../../../containers/Popover";

type Props = {
    x:number;
    y:number;
    children: any;
    Pointer: JSX.Element;
}

const PopoverFloat = forwardRef(({Pointer, x, y, children}:Props, ref:LegacyRef<HTMLDivElement>)=>{
    return (
        <div className="position-absolute"
            style={{top: y+"px", left:x+"px"} as React.CSSProperties}
            ref={ref}>
            <Popover Pointer={Pointer} children={children}/>
        </div>
    )
});

export default PopoverFloat;