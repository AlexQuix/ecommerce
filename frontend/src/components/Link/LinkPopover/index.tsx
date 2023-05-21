import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDevice } from "../../../hooks";
import { IState } from "../../../store";
import { linkPopover } from "../../../store/slices/popover/linkPopover";

import PopoverFloatWithPointer from "../../Popover/PopoverFloatWithPointer";

type Props = {
    Link: JSX.Element;
    posx: number;
    posy: number;
    PopoverContent: JSX.Element;
}

export default function LinkPopover({Link, posx, posy, PopoverContent}:Props){
    const dispatch = useDispatch();
    const device = useDevice();
    const linkRef = useRef({} as HTMLDivElement);
    const {closeAll} = useSelector((state:IState)=>state.linkPopover);

    let [pointerX, setPointerX] = useState(0);
    let [isLinkHover, setIsLinkHover] = useState(false);
    let [isPopoverHover, setIsPopoverHover] = useState(false);

    function closePopover(){
        if(closeAll){
            setIsLinkHover(false);
            setIsPopoverHover(false);
            dispatch(linkPopover.actions.setCloseAll(false));
        }
    }

    useEffect(()=>{
        closePopover();
    }, [closeAll]);

    useEffect(()=>{
        if(linkRef.current){
            let rect = linkRef.current.getBoundingClientRect();
            setPointerX( rect.width / 2 - posx);
        }
    }, [linkRef]);

    return (
        <div className="position-relative d-flex flex-column align-items-center" >
            <div className="position-relative" ref={linkRef}>
                {Link}
                
                {/* THIS ELEMENT PREVENT THAT USER CLICK THE LINK */}
                { (device === "laptop" || device === "desktop" || device === "extra-desktop")  
                    && <div className="position-absolute top-0 w-100 h-100"
                            onClick={()=>setIsLinkHover(!isLinkHover)}
                            onMouseEnter={()=>{
                                dispatch(linkPopover.actions.setCloseAll(true));
                                setTimeout(()=>{
                                    setIsLinkHover(true);
                                }, 400);
                            }}
                            onMouseLeave={()=>{
                                setTimeout  (()=>{
                                    setIsLinkHover(false);
                                }, 400);
                            }}>
                        </div>}
            </div>

            { (isLinkHover || isPopoverHover) && (
                <div className="w-100 h-100 position-relative"
                    onMouseEnter={()=>{ setIsPopoverHover(true) }}
                    onMouseLeave={()=>{ setIsPopoverHover(false) }}>
                    <PopoverFloatWithPointer x={posx}
                                            y={posy}
                                            pointer={{
                                                x: pointerX+"px",
                                                y: "-10px",
                                                width: 20,
                                                background: "var(--bs-white)",
                                                directionX: "left",
                                                directionY: "top",
                                            }}>
                        {PopoverContent}
                    </PopoverFloatWithPointer>
                </div>
            ) }
        </div>
    )
}