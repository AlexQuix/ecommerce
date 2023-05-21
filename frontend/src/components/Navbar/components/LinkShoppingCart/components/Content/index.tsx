import { IProductFromShoppingCart } from "../../../../../../services/client";
import { calcTotalPrice } from "../../../../../../utils";

import PillButton from "../../../../../../containers/Button/PillButton";
import LineCard from "../../../../../../containers/Card/LineCard";
import PillButtonSecondary from "../../../../../Button/PillButtonSecondary";
import EmptyShoppingCart from "../../../../../ErrorMessage/EmptyShoppingCart";

type Props = {
    products: IProductFromShoppingCart[],
    btnOnClick: ()=>Promise<void>;
}

export default function Content({products, btnOnClick}:Props){
    return (
        <>
            <div className="scrollbar w-100 pt-2 p-3 d-flex flex-column gap-3" style={{maxHeight: "300px", overflowX: "hidden", overflowY: "scroll"}}>
                {
                    products.length > 0
                        ? products.map(p => (
                            <div className="w-100 d-flex gap-3 align-items-center"
                                key={p.product._id}
                            >
                                <span className="fs-5 text-dark-500">{p.quantity}</span>
                                <LineCard RightElement={<></>} 
                                        product={p.product}
                                        heigth="84px"
                                        maxHeightText="32px"/>
                            </div>
                        ))
                        : <EmptyShoppingCart />
                }
            </div>
            <div className="position-relative pt-2 p-3 pe-2">
                <p className="text-center fs-5 fw-400 text-dark-400 mb-2">
                    Total: <span className="fw-500 text-dark-700">${ calcTotalPrice(products) }</span>
                </p>
                <PillButtonSecondary onclick={btnOnClick}>
                    <PillButton.Text value="Complete List" />
                </PillButtonSecondary>
            </div>
        </>
    )
}