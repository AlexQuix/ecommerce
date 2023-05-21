import { useState } from "react";
import { useAlert } from "../../../hooks/alert/useAlert";
import { IProductFromShoppingCart } from "../../../services/client";
import ClientService from "../../../services/client";

import LineCard from "../../../containers/Card/LineCard";
import Quantity from "../../Forms/Quantity";


type Props = {
    data: IProductFromShoppingCart;
    onDelete: ()=>void;
}

export default function LineCardShoppingCart({data, onDelete}:Props){
    let {displayAlert} = useAlert();
    let [quantity, setQuantity] = useState(data.quantity);

    async function deleteProduct(){
        let res = await ClientService.removeProductToShoppingCart(data.product._id, quantity);
        if(res.ok) onDelete();

        displayAlert(
            res.message,
            res.ok ? "success" : "danger"
        );
    }

    async function onRest(){
        let res = await ClientService.removeProductToShoppingCart(data.product._id, 1);
        if(res.ok){
            if(quantity <= 1)
                onDelete();
            else 
                setQuantity(quantity-1);
        }

        displayAlert(
            res.message,
            res.ok ? "success" : "danger"
        );
    }

    async function onAdd(){
        let res = await ClientService.addProductToShoppingCart(data.product._id, 1);
        if(res.ok)
            setQuantity(quantity+1);

        displayAlert(
            res.message,
            res.ok ? "success" : "danger"
        );
    }

    let rightElement = (
        <div className="mt-2 d-flex align-items-start">
            <button className="bg-white p-0 m-0 py-1 px-2 rounded-2 neu-drop-1"
                    onClick={() => deleteProduct()}>
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 1.05556H12.5L11.3571 0H5.64286L4.5 1.05556H0.5V3.16667H16.5M1.64286 16.8889C1.64286 17.4488 1.88367 17.9858 2.31233 18.3817C2.74098 18.7776 3.32236 19 3.92857 19H13.0714C13.6776 19 14.259 18.7776 14.6877 18.3817C15.1163 17.9858 15.3571 17.4488 15.3571 16.8889V4.22222H1.64286V16.8889Z" fill="#EC6984"/>
                </svg>
            </button>
        </div>
    );

    return (
        <div className="w-100 position-relative d-flex align-items-center gap-2 gap-md-3">
            <div className="align-self-stretch d-flex flex-column">
                <Quantity value={quantity}
                            onRest={onRest}
                            onAdd={onAdd}/>
            </div>
            <div className="w-100 h-100 position-relative" 
                style={{maxHeight: "100px"}}>
                <LineCard RightElement={rightElement} 
                            product={data.product}
                            heigth="100px"
                            maxHeightText="32px"/>
            </div>
        </div>
    )
}