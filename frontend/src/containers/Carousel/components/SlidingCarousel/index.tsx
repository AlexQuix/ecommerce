import { useEffect, useRef, useState } from "react"; 

type Props = {
    cards: JSX.Element[];
    info: SlidingInfo;
    slideX: number;
}

export type SlidingInfo = {
    wrapperWidth: number;
    slideWidth: number;
    gap: number;
    transition: number;
}

export default function SlidingCarousel({cards, info, slideX}:Props) {
    let slideRef = useRef({} as HTMLUListElement);
    let [transition, setTransition] = useState("");

    useEffect(()=>{
        if(slideRef.current.style && info.transition && transition === ""){
            setTimeout(()=>{
                setTransition(`${info.transition}ms`);
            }, 300)
        }
    }, [slideRef, info, transition])
    
    useEffect(()=>{
        if(slideRef.current){
            (slideRef.current as any).style.transform = `translate(${-Math.abs(slideX)}px)`;
        }
    }, [slideX]);

    return (
        <div className="container-fluid p-0 m-0" 
            style={{width: `${info.wrapperWidth}px`, overflowX: "clip"}}>
            <ul ref={slideRef} 
                className="carousel__slide p-0 m-0 ps-2 d-flex" 
                style={{
                    width: `${info.slideWidth}px`,
                    gap: `${info.gap}px`,
                    transition
                }}>
                    {cards}
            </ul>
        </div>
    )
}