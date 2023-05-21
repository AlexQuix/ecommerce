import "../ArrowControl/style.scss";
import { useState, useEffect } from "react";
import { isEnableLeft, isEnableRight } from "../../../../utils/carousel";
import { ICarouselControl } from "../../../../containers/Carousel";

import LeftArrow from "../LeftArrow";
import RightArrow from "../RightArrow";


export default function LateralArrowControl({info, slideToLeft, slideToRight}:ICarouselControl){
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
        <>
            <div className="arrow__left position-absolute start-0" style={{width: "30px", top: "25%"}}>
                <LeftArrow enable={enableLeft} handleClick={handleLeft}/>
            </div>
            <div className="arrow__right position-absolute end-0" style={{width: "30px", top: "25%"}}>
                <RightArrow enable={enableRight} handleClick={handleRight}/>
            </div>
        </>
    )
}