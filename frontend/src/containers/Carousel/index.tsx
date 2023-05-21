import { useDevice } from "../../hooks";
import { useState, useEffect, useRef } from "react";
import { posxToLeft, posxToRight } from "../../utils/carousel";

// components
import SlidingCarousel, { SlidingInfo } from "./components/SlidingCarousel";
import LateralArrowControl from "./components/LateralArrowControl";
import LeftArrow from "./components/LeftArrow";
import RightArrow from "./components/RightArrow";
import ArrowControl from "./components/ArrowControl";


type Props = {
    info: ICarouselInfo;
    CarouselControl?: (props:ICarouselControl)=>JSX.Element;
    swipeControl: ISwipeControl;
    cards: any[];
}

export interface ICarouselControl {
    info: ICarouselCompleteInfo;
    slideToRight: ()=>void;
    slideToLeft: ()=>void;
    setSlideX?: (value:number)=>void;
}

export interface IStateControl {
    enableLeft: boolean;
    enableRight: boolean;
}

export interface ICarouselInfo {
    cardWidth: number; // card width
    cardGap: number; // the space between cards
    cardFullWidth: number; // the full width including gap
    cardsShown: number; // number cards to show
    numCardsMove: number; // number cards to slide
    slideTransition: number; // transition that will use when the content will slide
}

export interface ISwipeControl{
    track: number; // the necessary path to activate the swipe
    hiddenControl: boolean; // hidden the control when touch events active
    supportTouchEvents: boolean; // suppport touch events for mobile
}

export interface ICarouselCompleteInfo{
    propsInfo: ICarouselInfo;
    slideInfo: SlidingInfo;
    slideX: number;
}

export default function Carousel({CarouselControl, info, cards, swipeControl}:Props){
    let device = useDevice();
    let swipe = useRef({initialX:0, initialY:0, blockSwipe: false});
    let enableSwipe = device === "small-mobile" || device === "mobile";
    const enableControl = (swipeControl.hiddenControl ? !enableSwipe  : true) && CarouselControl;
    const [completedInfo, setCompletedInfo] = useState<ICarouselCompleteInfo>({propsInfo: info, slideInfo: {}} as ICarouselCompleteInfo);
    
    useEffect(()=>{
        setCompletedInfo({
            propsInfo: info,
            slideInfo: {
                wrapperWidth: info.cardsShown * info.cardFullWidth,
                slideWidth: cards.length * info.cardFullWidth,
                gap: info.cardGap,
                transition: info.slideTransition
            },
            slideX: 0
        });
    }, [info, cards.length]);

    function slideToLeft(){
        let posx = posxToLeft(info, completedInfo.slideX);
        if(posx > 0) 
            return setCompletedInfo({...completedInfo, slideX: completedInfo.slideX - posx});

        setCompletedInfo({...completedInfo, slideX: 0});
    }

    function slideToRight(){
        let slideWidth = cards.length * info.cardFullWidth;
        let posx = posxToRight(info, completedInfo.slideX, slideWidth);
        if(posx > 0) 
            setCompletedInfo({...completedInfo, slideX: completedInfo.slideX + posx});
    }

    function setSlideX(value:number){
        setCompletedInfo({...completedInfo, slideX: value});
    }

    function touchStart(e:React.TouchEvent<HTMLDivElement>){
        let initialX = e.touches[0].clientX;
        let initialY = e.touches[0].clientY;
        swipe.current = {initialX, initialY, blockSwipe: false};
    }
    function touchMove(e:React.TouchEvent<HTMLDivElement>){
        let {initialX, blockSwipe} = swipe.current;
        if(blockSwipe) return;
         
        var currentX = e.touches[0].clientX;
        var diffX = initialX - currentX;
        
        // sliding horizontally
        if(Math.abs(diffX) < swipeControl.track) return;
        
        if ( diffX > 0 ){
            resetSwipe(true);
            return slideToRight();
        }

        resetSwipe(true);
        slideToLeft();  
    }
    function touchEnd(){
        resetSwipe(false);
    }

    function resetSwipe(blockSwipe:boolean){
        swipe.current = {initialX:0, initialY:0, blockSwipe};
    }

    return (
        <>
            <div className="position-relative" 
                onTouchStart={(e)=>{
                    if(swipeControl.supportTouchEvents && enableSwipe){
                        touchStart(e);
                    }
                }}
                onTouchMove={(e)=>{
                    if(swipeControl.supportTouchEvents && enableSwipe){
                        touchMove(e);
                    }           
                }}
                onTouchEnd={()=>{
                    if(swipeControl.supportTouchEvents && enableSwipe){
                        touchEnd();
                    }
                }}>
                <SlidingCarousel  info={completedInfo.slideInfo} 
                                slideX={completedInfo.slideX} 
                                cards={cards}/>
            </div>
            {enableControl && <CarouselControl info={completedInfo} slideToLeft={slideToLeft} slideToRight={slideToRight} setSlideX={setSlideX}/>}
        </>
    )
}

Carousel.defaultProps = {
    swipeControl: {
        track: 80,
        hiddenControl: true,
        supportTouchEvents: true
    }
}

export {
    SlidingCarousel,
    LateralArrowControl,
    RightArrow,
    LeftArrow,
    ArrowControl
};