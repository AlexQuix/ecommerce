import { IProduct } from "../../../services/product";

import LineCard from "../../../containers/Card/LineCard";
import FavoriteButton from "../../Button/FavoriteButton";

type Props = {
    isFavorite: boolean;
    product: IProduct;
}

export default function LineCardFavorite({isFavorite, product}:Props){
    const rightElement = (
        <div className="d-flex align-items-center">
            <FavoriteButton visibility={true}
                            productId={product._id}
                            isFavorite={isFavorite}
                            size={35}
                            className={`p-2 rounded-3 ${ isFavorite ? "" : "neu-drop-1" }`}/>
        </div>
    );

    return (
        <LineCard RightElement={rightElement} 
                product={product}
                heigth="84px"
                maxHeightText="32px"/>
    )
}