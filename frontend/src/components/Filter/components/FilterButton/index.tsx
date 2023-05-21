import "./style.scss";
import { useDispatch } from "react-redux";
import { useBodyScroll } from "../../../../hooks/bodyScroll";
import { filterActions } from "../../../../store/slices/filter";
import { DEVICE_WIDTH, currentDevice } from "../../../../hooks";
import { minDevice } from "../../../../utils";

export default function FilterButton(){
    let dispatch = useDispatch();
    let {hiddenScroll} = useBodyScroll();

    let visibility = !minDevice(currentDevice(), DEVICE_WIDTH.TABLET);

    if(visibility){
        return (
            <button className="filter-btn bg-transparent"
                    onClick={()=>{
                        dispatch(filterActions.showFilter());
                        hiddenScroll();
                    }}>
                <div className="d-flex align-items-center gap-2">
                    <div className="filter-btn__icon position-relative">
                        <svg width="195" height="162" viewBox="0 0 195 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M111.883 132.952L152.372 158L191 132.952M70 4H130.499L85.821 62.9096V158L54.5 123V54.5L4.5 4H70Z" 
                            stroke="var(--bs-prim-500)" 
                            strokeWidth="15" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-prim-500">Filtrar</span>
                </div>
            </button>
        )
    }

    return <></>
}