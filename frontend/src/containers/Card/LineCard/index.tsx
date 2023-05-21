import "./style.scss";
import { IProduct } from "../../../services/product";
import { Link } from "react-router-dom";

type Props = {
    RightElement?: JSX.Element;
    heigth: string;
    maxHeightText: string;
    product: IProduct;
}

export default function LineCard({RightElement, product, heigth, maxHeightText}:Props){
    return (
        <div className="card-line w-100 position-relative bg-white shadow-drop rounded-3" 
                style={{cursor:"default", height: heigth}}>
            <div className="w-100 h-100 pe-3 d-flex justify-content-between">
                <Link className="w-100 h-100 ps-2 px-sm-3 py-2 gap-3 d-flex align-items-center text-decoration-none position-relative"
                    to={"/product/"+product._id}>
                    <div className="card-line__wrapper-img flex-grow-1 p-1 rounded-2">
                        <img className="img-fluid" 
                            src={ product.main_img ? "/assets/img/"+product.main_img : "/img/preview-motocycle.jpg"}
                            alt="product"/>
                    </div>
                    <div className="card-line__text w-100 px-2 flex-grow-0">
                        <h1 className="fs-6 fw-400 text-dark-700 overflow-hidden" 
                            style={{height: maxHeightText}}>
                            {product.product_name}
                        </h1>
                        <p className="fw-400 text-dark-400 mb-0">${new Intl.NumberFormat("en-US").format(product.price)}</p>
                    </div>
                </Link>
                {RightElement}
            </div>
        </div>
    )
}