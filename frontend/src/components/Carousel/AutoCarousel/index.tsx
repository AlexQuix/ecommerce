import AutomaticControl, { IAutomaticControl } from "../../../containers/Carousel/components/AutomaticControl"
import CarouselContext from "../../../contexts/carousel";
import CarouselResize from "../CarouselResize"

type Props = {
    data: JSX.Element[];
    CSSCardWidth: string;
    CSSCardShown: string;
    CSSCardGap: string;
    delay: number;
    direction: "left" | "right";
}

export default function AutoCarousel({data, direction, delay, CSSCardGap, CSSCardShown, CSSCardWidth}:Props){

    return (
        <CarouselContext.Provider value={{
            delay,
            direction,
            data
        } as IAutomaticControl}>
            <CarouselResize CSSCardWidth={CSSCardWidth}
                            CSSCardShown={CSSCardShown}
                            CSSCardGap={CSSCardGap}
                            CarouselControl={AutomaticControl}
                            data={data}/>
        </CarouselContext.Provider>
    )
}