import { useEffect, useState } from "react";
import { IProductFromShoppingCart } from "../../../../services/client";
import { calcTotalPrice } from "../../../../utils";

import BackNavigation from "../../../../components/BackNavigation";
import LineCardShoppingCart from "../../../../components/Card/LineCardShoppingCart";
import Summary from "../../../../components/Summary";
import EmptyShoppingCart from "../../../../components/ErrorMessage/EmptyShoppingCart";

type Props = {
    products: IProductFromShoppingCart[];
    refresh: ()=>void;
}

export default function Content({ products, refresh}:Props){
    let [ totalPrice, setTotalPrice ] = useState(0);

    useEffect(()=>{
        let total = calcTotalPrice(products);
        setTotalPrice(total);
    }, [products])

    return (
        <div className="page__wrapper w-100 pb-0 pb-sm-5 mb-5">
            <header className="container-fluid position-sticky bg-white top-0 px-0 mb-3 mb-sm-4 border-bottom"
                    style={{zIndex: "750"}}>
                <div className="d-flex gap-2 justify-content-start align-items-center py-2">
                    <BackNavigation />
                    <h1 className="fs-5 fs-sm-4 fw-400 text-dark-600 m-0">
                        Cart 
                        <span className="fw-500 text-dark-700">({products.length})</span>
                    </h1>
                </div>
            </header>

            <div className="container-fluid px-0 d-flex flex-row-reverse gap-5 gap-md-4">
                <Summary totalPrice={totalPrice}
                        savedMoney={0}
                        shippingCost={totalPrice <= 0 ? 0 : 10}/>

                <div className="w-100 flex-grow-1 d-flex flex-column gap-4">
                    {
                        products.length > 0
                            ? (
                                products.map((p)=>
                                    <LineCardShoppingCart key={p.product._id} 
                                                            data={p}
                                                            onDelete={()=> refresh() }/>
                                ))
                            : <EmptyShoppingCart />
                    }                    
                </div>
            </div>
        </div>
    )
}