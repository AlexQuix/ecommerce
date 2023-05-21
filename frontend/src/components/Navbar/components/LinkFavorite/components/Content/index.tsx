import { IProduct } from "../../../../../../services/product"

import PillButton from "../../../../../../containers/Button/PillButton";
import PillButtonPrimary from "../../../../../Button/PillButtonPrimary";
import LineCardFavorite from "../../../../../Card/LineCardFavorite";
import EmptyFavorite from "../../../../../ErrorMessage/EmptyFavorite";

type Props = {
    products: IProduct[];
    btnOnClick: ()=>Promise<void>;
}

export default function Content({products, btnOnClick}:Props){
    return (<>
        <div className="scrollbar pt-2 p-3 w-100 d-flex flex-column gap-3" 
            style={{maxHeight: "300px", overflowX: "hidden", overflowY: "scroll"}}>
            { products.length > 0
                    ? products.map((p)=>( <LineCardFavorite key={p._id} isFavorite={true} product={p}/> ))
                    : <EmptyFavorite/>
            }
        </div>
        <div className="position-relative p-3 pe-2">
            <PillButtonPrimary onclick={btnOnClick}>
                <PillButton.Text value="Complete List"/>
            </PillButtonPrimary>
        </div>
    </>)
}