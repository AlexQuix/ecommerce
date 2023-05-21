import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../store";
import { IProduct } from "../../../../services/product";
import { IClient } from "../../../../services/client";

import LineCardFavorite from "../../../../components/Card/LineCardFavorite";
import FilterButton from "../../../../components/Filter/components/FilterButton";

type Props = {
    products: IProduct[] | null;
    user: IClient | null;
    refresh: ()=> void;
}

export default function SearchResult({products, user, refresh}:Props){
    let { refreshData } = useSelector((state:IState)=>state.filter);

    useEffect(()=>{
        if(refreshData) 
            refresh();
    }, [ refreshData ]);

    if(products){
        return (<>
                <header className="mb-3 d-flex justify-content-between align-items-center">
                    <h1 className="mb-0 fs-5 text-dark-500">
                        <span className="fw-400">Result:</span>
                        <span className="ms-2 text-dark-700">({products.length})</span>
                    </h1>
                    <FilterButton />
                </header>
                
                <div className="d-flex flex-column gap-3 position-relative opacity-effect"
                    style={{opacity: 1, transition: "1s"}}>
                    {products.map((p)=>(
                        <LineCardFavorite key={p._id}
                                            isFavorite={(user)? user.favorites.some(c=> (c as any) === p._id) : false}
                                            product={p}/>
                    ))}
                </div>
        </>)
    }

    return <></>
}