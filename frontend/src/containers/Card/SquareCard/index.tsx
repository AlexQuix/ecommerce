import "./style.scss";
import { useState, useEffect, useRef } from "react";
import { popoverCardAction } from "../../../store/slices/popover/popoverCard";
import { DEVICE_WIDTH, currentDevice, useDevice } from "../../../hooks";
import { usePopover } from "../../../hooks/popover";
import { Link } from "react-router-dom";
import { IProduct } from "../../../services/product";
import { minDevice } from "../../../utils";

import FavoriteButton from "../../../components/Button/FavoriteButton";

type IProps = {
    width: string;
    maxWidth: string;
    product: IProduct;
    isFavorite: boolean;
}

export default function SquareCard({product, isFavorite, width, maxWidth}:IProps){
    const device = useDevice();
    const cardRef = useRef({} as HTMLDivElement);
    const [isHover, setIsHover] = useState(false);
    const [ payload, setPayload ] = useState({});

    usePopover(device, isHover, payload as any, popoverCardAction);

    useEffect(()=>{
        if(isHover && cardRef.current){
            let {x, y, height} = cardRef.current.getBoundingClientRect();
            setPayload({
                rect: {x:Math.floor(x), y:Math.floor(y), height:Math.floor(height)},
                data: product._id
            });
        }
    }, [isHover, product]);

    return (
        <div className="card align-self-stretch rounded-4 neu-drop-1 position-relative"
            ref={cardRef}
            onMouseEnter={()=>{
                if(!isHover) setIsHover(true);
            }}
            onMouseLeave={()=>{
                if(isHover) setIsHover(false);
            }}
            style={{ cursor:"default", "--width": width, "--max-width": maxWidth } as React.CSSProperties}>
            <Link className="w-100 h-100 pb-3 position-relative d-block text-decoration-none"
                to={"/product/"+product._id}>
                <div className="w-100 h-100 d-flex flex-column position-relative">
                    <div className="card__wrapper-img text-center w-100 mb-2 px-4 py-2 bg-white rounded-3">
                        <img className="small img-fluid rounded-4" src={product.main_img ? "/assets/img/"+product.main_img : "/img/preview-motocycle.jpg"}
                            alt={"No se pudo cargar la imagen"}/>
                    </div>
                    <div className="w-100 flex-grow-1 px-3 d-flex flex-column">
                        <h1 className="fs-6 fw-600 text-dark-600">{product.product_name}</h1>
                        <p className="small mt-auto fw-500 text-dark-400 m-0 p-0">${new Intl.NumberFormat("en-Us").format(product.price)}</p>
                    </div>
                </div>
            </Link>
            <div className="position-absolute top-0 end-0 mt-1 me-1">
                <FavoriteButton visibility={!minDevice(currentDevice(), DEVICE_WIDTH.TABLET)}
                                isFavorite={isFavorite}
                                productId={product._id}/>
            </div>
        </div>
    )
}

SquareCard.defaultProps = {
    width: "var(--card-width)",
    maxWidth: "100%",
    isFavorite: false
}