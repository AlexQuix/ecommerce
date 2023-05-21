
import { ICarouselInfo } from "../../containers/Carousel";
import { posxToLeft, posxToRight } from "../carousel";

const cardWidth = 300;
const cardGap = 20;
const cardFullWidth = cardWidth + cardGap;

describe("posxToRight - calculate the x position to slide to right the carousel", ()=>{    
    const carouselInfo:ICarouselInfo = {
        cardWidth,
        cardGap,
        cardFullWidth,
        slideTransition: 500,
        cardsShown: 2,
        numCardsMove: 2
    };

    test("should return 0 if slide width is reached, otherwise should return the posx", ()=>{
        expect(posxToRight(carouselInfo, 0, cardFullWidth * 2)).toBe(0);
        expect(posxToRight(carouselInfo, 0, cardFullWidth * 3)).toBe(300);
        expect(posxToRight(carouselInfo, 0, cardFullWidth * 4)).toBe(640);
        expect(posxToRight(carouselInfo, cardFullWidth * 2, cardFullWidth * 6)).toBe(640);
    })
})

describe("posxToLeft - calculate the x position to slide to left the carousel", ()=>{    
    const carouselInfo:ICarouselInfo = {
        cardWidth,
        cardGap,
        cardFullWidth,
        slideTransition: 500,
        cardsShown: 2,
        numCardsMove: 2
    };

    test("should return 0 if the total to slide is greater than the current posx or if posx is 0", ()=>{
        expect(posxToLeft(carouselInfo, 0)).toBe(0);
        expect(posxToLeft(carouselInfo, cardFullWidth * 1)).toBe(0);
        expect(posxToLeft(carouselInfo, cardFullWidth * 2)).toBe(640);
        expect(posxToLeft(carouselInfo, cardFullWidth * 4)).toBe(640);
    })
})