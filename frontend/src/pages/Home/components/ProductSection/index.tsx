import { useEffect, useState, useRef } from "react";
import { IProduct } from "../../../../services/product";
import { retrieveCSSVariable, matchNumber, setCssVariable } from "../../../../utils";
import { useRetrieveResult } from "../../../../containers/Loader/hooks/useRetrieveResult";
import { IClient } from "../../../../services/client";
import ProductService from "../../../../services/product";

import Carousel, {ArrowControl, ICarouselInfo} from "../../../../containers/Carousel";
import Card from "../../../../containers/Card/SquareCard";


type Props = {
    title: string;
    user: IClient | null;
}

export default function ProductSection({title, user}:Props){  
    let products = useRetrieveResult<IProduct[]>();
    let contCarouselRef = useRef({} as HTMLDivElement);  
    let [info, setInfo] = useState({
        cardWidth: 0,
        cardGap: 0,
        cardsShown: 0,
        cardFullWidth: 0,
        slideTransition: 0,
        numCardsMove: 0
    } as ICarouselInfo);

    useEffect(()=>{
        function main(){
            if(contCarouselRef.current){
                let carouselWidthStr = getComputedStyle(contCarouselRef.current).width;
                let carouselWidth = matchNumber(carouselWidthStr);
                let cardGap = Math.floor(retrieveCSSVariable("--card-gap"));
                let cardsShown = retrieveCSSVariable("--card-shown");
                let cardWidth = Math.floor((carouselWidth / cardsShown) - cardGap);
                setCssVariable("--card-width", cardWidth+"px");
                
                setInfo({
                    cardWidth,
                    cardGap,
                    cardsShown,
                    cardFullWidth: cardWidth + cardGap,
                    slideTransition: cardsShown * 200,
                    numCardsMove: Math.floor(cardsShown)
                });
            }
        }

        main();
        window.addEventListener("resize", main);
        return ()=>{
            window.removeEventListener("resize", main);
        }
    }, []);

    return(
        <div>
            <header className="mb-2 mb-md-4 d-flex justify-content-between border-2 border-bottom border-prim-100">
                <h1 className="fs-5 mb-1 text-prim-500">{title}</h1>
            </header>
            <div className="ps-4 ps-md-0 d-flex flex-column align-items-center gap-3"
                ref={contCarouselRef}>
                <Carousel
                    info={info}
                    cards={products.map( (p) => <Card key={p._id} 
                                                    product={p}
                                                    isFavorite={
                                                        (user)? user.favorites.some(c=> (c as any) === p._id) : false}
                                                    /> )}
                    CarouselControl={ArrowControl}/>
            </div>
        </div>
    )
}


export function productLoader(category:string){
    return async ()=>{
        let res = await ProductService.filterByCategory(category);    
        return res.result;
    }
}