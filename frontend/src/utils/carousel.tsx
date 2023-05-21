import { ICarouselInfo } from "../containers/Carousel";

export function posxToRight(carouselInfo:ICarouselInfo, posx:number, slideWidth:number):number{
    let {cardsShown, cardFullWidth, cardGap, numCardsMove} = carouselInfo;
    let cardsShownWidth = cardsShown * cardFullWidth;
    let nextSlidexX = posx + cardsShownWidth + (cardFullWidth * numCardsMove);
    
    if(nextSlidexX <= slideWidth){
        let x = cardFullWidth * numCardsMove;
        return x;
    }

    let x = slideWidth - (posx + cardsShownWidth + cardGap);
    return x > 0 ? x : 0;
}

export function posxToLeft(carouselInfo:ICarouselInfo, posx:number):number{
    let {cardFullWidth, numCardsMove} = carouselInfo;
    let x = cardFullWidth * numCardsMove;
    if(posx <= 0 || x > posx) return 0;

    return x > 0 ? x : 0;
}

export function isEnableRight({cardsShown, cardFullWidth, cardGap}:ICarouselInfo, posx:number, slideWidth:number){
    return slideWidth - (posx + cardsShown * cardFullWidth + cardGap) > 0;
}

export function isEnableLeft(posx:number){
    return posx > 0;
}

export function calcCardWidth(carouselWidth:number, cardsShown:number, cardGap:number){
    return Math.floor((carouselWidth / cardsShown) - cardGap);
}