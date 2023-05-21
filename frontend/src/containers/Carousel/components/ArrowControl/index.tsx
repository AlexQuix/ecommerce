import "./style.scss";
import { useState, useEffect } from "react";
import { isEnableLeft, isEnableRight } from "../../../../utils/carousel";

import { ICarouselControl, LeftArrow, RightArrow } from "../..";


export default function ArrowControl({info, slideToLeft, slideToRight}:ICarouselControl){
    let [enableLeft, setEnableLeft] = useState(false);
    let [enableRight, setEnableRight] = useState(false);

    useEffect(()=>{
        setEnableLeft(isEnableLeft(info.slideX));
        setEnableRight(isEnableRight(info.propsInfo, info.slideX, info.slideInfo.slideWidth));
    }, [info])

    function handleLeft(){
        if(enableLeft)
            slideToLeft();
    }
    function handleRight(){
        if(enableRight)
            slideToRight();
    }

    return (
        <div className="position-relative d-flex gap-3 gap-md-5">
            <div className="arrow__left position-relative" 
                style={{"--x": "-30%" } as React.CSSProperties}>
                <LeftArrow enable={enableLeft} handleClick={handleLeft}/>
            </div>
            <div className="arrow__right position-relative" 
                style={{ "--x": "30%" } as React.CSSProperties}>
                <RightArrow enable={enableRight} handleClick={handleRight}/>
            </div>
        </div>)
}