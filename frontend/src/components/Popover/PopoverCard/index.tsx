import { useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../store";
import { ChildrenProps } from "../../../containers/Loader/components/LoaderLogic";
import ProductService, { IProduct } from "../../../services/product";

import AutoCarousel from "../../Carousel/AutoCarousel";
import PopoverFloatWithPointer from "../PopoverFloatWithPointer";
import LabelColor from "../../LabelColor";
import Loader from "../../../containers/Loader";
import Spinner from "../../LoadingIndicator/Spinner";
import SomethingWasWrong from "../../ErrorMessage/SomethingWasWrong";

export default function PopoverCard(){
    const wrapperHeight = 270;
    let { show, rect, data } = useSelector((state:IState)=>state.popoverCard);
    let [ pointerDirection, setPointerDirection ] = useState<"top"|"bottom">("top");

    async function dataLoader(){
        let res = await ProductService.details(data);
        if(res.ok) return res.result;

        return null;
    }

    function parsePosX(x:number){
        return x-10;
    }

    function parsePosY(y:number){
        let popoverHeight = wrapperHeight;
        let posy = y + rect.height;
        let fullHeight = window.innerHeight;
        let scrollYInt = Math.floor(window.scrollY);

        // move the container to bottom
        if(posy + popoverHeight >= fullHeight){
            if(pointerDirection !== "bottom")
                setPointerDirection("bottom");

            return (y+scrollYInt)-popoverHeight-35;
        }

        // move the container to top
        if(pointerDirection !== "top") setPointerDirection("top");

        return y + rect.height + scrollYInt + 25;
    }

    if(show){
        return (
            <PopoverFloatWithPointer x={parsePosX(rect.x)} 
                                    y={parsePosY(rect.y)} 
                                    pointer={{
                                        width:20,
                                        directionY: pointerDirection,
                                        y:"-10px",
                                        x:"center",
                                        directionX:"left",
                                        background:"var(--bs-cs-200)"
                                    }}>
                <div className="w-100 p-3 overflow-hidden bg-white shadow-drop-dark rounded-3" 
                    style={{height: wrapperHeight+"px"}}>
                    <Loader loader={dataLoader}
                            LoadingIndicator={(
                                <div className="h-100 position-relative d-flex align-items-center"
                                    style={{width: "var(--carousel-popover-gallery-width)"}}>
                                    <Spinner />
                                </div>
                            )} 
                    >
                        {({result}:ChildrenProps<IProduct>)=>
                            result && result.img_galleries.length > 1
                                ? <>
                                    <div className="container-fluid d-flex gap-2">
                                        {result.colors.map((c, i)=>(
                                            <LabelColor key={i} background={(c as any).color as string}/>
                                        ))}
                                    </div>
                                    <div className="h-100 position-relative mt-3 opacity-visibility">
                                        <AutoCarousel data={result.img_galleries.map((g, i)=>(
                                                            <div className="position-relative p-2" 
                                                                key={i} 
                                                                style={{
                                                                    width: "var(--carousel-popover-gallery-width)",
                                                                    height: "180px",
                                                                    objectFit: "contain"
                                                                }}>
                                                                <img className="w-100" src={"/assets/img/"+g} />
                                                            </div>
                                                        ))}
                                                        CSSCardGap="--carousel-popover-gallery-gap"
                                                        CSSCardShown="--carousel-popover-gallery-show"
                                                        CSSCardWidth="--carousel-popover-gallery-width"
                                                        delay={3000}
                                                        direction="right"/>
                                    </div></>
                                : (
                                    <div className="h-100 d-flex align-items-center" 
                                        style={{
                                            width: "var(--carousel-popover-gallery-width)"
                                        }}>
                                        <SomethingWasWrong />
                                    </div>
                                )
                        }
                    </Loader>
                </div>
            </PopoverFloatWithPointer>
        )
    }

    return <></>
}