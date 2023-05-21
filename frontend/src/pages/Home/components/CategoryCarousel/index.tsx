import { useRetrieveResult } from "../../../../containers/Loader/hooks/useRetrieveResult";
import { ICategory } from "../../../../services/category";
import CategoryServices from "../../../../services/category";

import { LateralArrowControl } from "../../../../containers/Carousel";
import LinkCategory from "../../../../components/Link/LinkCategory";
import CarouselResize from "../../../../components/Carousel/CarouselResize";

export default function CategoryCarousel(){
    let categories = useRetrieveResult<ICategory[]>();

    return (
        <div className="position-relative px-0 px-md-3 mt-2 mb-3 mb-lg-5" >
            <div className="position-relative px-1 px-sm-5 py-2">
                <CarouselResize CSSCardGap="--carousel-category-gap"
                                CSSCardShown="--carousel-category-show"
                                CSSCardWidth="--carousel-category-width"
                                autoCardWidth={true}
                                CarouselControl={LateralArrowControl}
                                data={
                                    categories.map((c, i)=>
                                            <LinkCategory key={i} 
                                                            category={c}
                                                            className="d-flex align-items-center" 
                                                            style={{"--gradient": `var(--lg-${(i%6)+1})`} as React.CSSProperties}/>)
                                }/>
            </div> 
        </div>
    )
}

export async function categoryLoader(){
    let resCategory = await CategoryServices.getAll();
    return resCategory.result;
}