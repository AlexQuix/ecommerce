import { useRef } from "react";
import { ICategory } from "../../../../services/category"
import { useSelector } from "react-redux";
import { IState } from "../../../../store";
import { useAnimePage } from "../../../../hooks/anime";

import LinkCategory from "../../../../components/Link/LinkCategory";

type Props = {
    categories: ICategory[];
}

export default function Page({categories}:Props){
    let pageRef = useRef({} as HTMLDivElement);
    let { load } = useSelector((state:IState)=>state.loadPage);

    useAnimePage(pageRef, load);

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center pt-3 pb-5 mb-3" 
            ref={pageRef}>
            <h1 className="fs-4 text-dark-700 fw-500 text-center pt-md-5 mb-3 mb-md-4">Categories</h1>
            <div className="category__wrapper px-1 p-sm-4 pt-0">
                {categories?.map((c, i)=>(
                    <LinkCategory key={c._id}
                                category={c}
                                style={{"--gradient": `var(--lg-${(i%6)+1})`} as React.CSSProperties}/>
                ))}
            </div>
        </div>
    )
}