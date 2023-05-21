import { useState, useEffect, useRef } from "react";
import { matchNumber, retrieveCSSVariable, setCssVariable } from "../../../utils";
import { calcCardWidth } from "../../../utils/carousel";

import ContainerCarousel, {ICarouselControl} from "../../../containers/Carousel";

type Props = {
    data: JSX.Element[];
    autoCardWidth: boolean; // calculate automatic the card width, based on carousel container width
    CSSCardWidth: string;
    CSSCardGap: string;
    CSSCardShown: string;
    CssVarOrigin: HTMLDivElement | undefined;
    CarouselControl: (props:ICarouselControl)=>JSX.Element;
}

export default function CarouselResize({data, CSSCardWidth, CSSCardGap, CSSCardShown, autoCardWidth, CarouselControl, CssVarOrigin}:Props){
    const carouselRef = useRef({} as HTMLDivElement);
    const [ cardWidth, setCardWidth ] = useState(0);
    const [ cardGap, setCardGap ] = useState(0);
    const [ cardShown, setCardShown ] = useState(0);
    
    useEffect(()=>{
        function main(){
            let cg = retrieveCSSVariable(CSSCardGap, CssVarOrigin);
            let cs = retrieveCSSVariable(CSSCardShown, CssVarOrigin);

            setCardGap(cg);
            setCardShown(cs);

            if(!autoCardWidth){
                return setCardWidth(retrieveCSSVariable(CSSCardWidth, CssVarOrigin));
            }
            
            if(carouselRef.current){
                let width = matchNumber(getComputedStyle(carouselRef.current).width);
                let cw = calcCardWidth(width, cs, cg);
                setCssVariable(CSSCardWidth, cw+"px")
                setCardWidth(cw);
            }
        }

        main();
        window.addEventListener("resize", main);

        return ()=>{
            window.removeEventListener("resize", main);
        }
    }, [ CSSCardWidth, CSSCardGap, CSSCardShown, autoCardWidth, CssVarOrigin ]);

    return (
        <div className="w-100 d-block" 
            ref={carouselRef}>
            <ContainerCarousel info={{
                                cardWidth,
                                cardGap,
                                cardFullWidth: cardWidth + cardGap,
                                cardsShown: cardShown,
                                numCardsMove: Math.floor(cardShown),
                                slideTransition: Math.floor(cardShown) * 200
                            }} 
                            cards={data}
                            CarouselControl={CarouselControl}/>
        </div>
    )
}


CarouselResize.defaultProps = {
    autoCardWidth: false,
    CssVarOrigin: null
}