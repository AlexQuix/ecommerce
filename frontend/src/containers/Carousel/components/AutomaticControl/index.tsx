import "./style.scss";
import { useEffect, useState, useContext } from "react";
import { ICarouselControl } from "../..";
import { isEnableRight } from "../../../../utils/carousel";
import CarouselContext from "../../../../contexts/carousel";

export interface IAutomaticControl {
    delay: number;
    data: any[];
    direction: "left" | "right"
}

export default function AutomaticControl({info, slideToLeft, slideToRight, setSlideX}:ICarouselControl){
    let { delay, data, direction } = useContext<IAutomaticControl>(CarouselContext as any);
    let [ timeoutId, setTimeoutId ] = useState(0);
    let currentId = info.slideX / info.propsInfo.cardFullWidth;

    function moveToRight(){
        if(!isEnableRight(info.propsInfo, info.slideX, info.slideInfo.slideWidth) && setSlideX) 
            return setSlideX(0);
    
        slideToRight();
    }

    useEffect(()=>{
        let id = setTimeout(()=>{
            if(direction === "right")
                return moveToRight();
            
            slideToLeft();
        }, delay) as unknown as number;

        setTimeoutId(id);
        return ()=>{
            clearTimeout(timeoutId);
        }
    }, [info])

    return <>
        <div className="carousel-control__auto d-flex gap-1 mt-2" style={{"--timing":delay+"ms"} as React.CSSProperties}>
            {data.map((d, i)=><div key={i} className={`progress ${currentId === i? "progress--active" : ""}`}></div>)}
        </div>
    </>
}