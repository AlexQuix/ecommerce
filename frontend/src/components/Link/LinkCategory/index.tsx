import "./style.scss";
import { useDispatch } from "react-redux";
import { ICategory } from "../../../services/category";
import { useNavigate } from "react-router-dom";
import { filterActions } from "../../../store/slices/filter";

interface IProps{
    category: ICategory
    imgSrc: string;
    className: string;
    style: React.CSSProperties;
}

export default function LinkCategory({category, imgSrc, className, style}:IProps){
    let navigate = useNavigate();
    let dispath = useDispatch();

    return (
        <button className={`link-category h-100 text-decoration-none p-2 p-sm-3 rounded-4 position-relative shadow-drop border border-2 border-white ${className}`}
                style={style}
                onClick={()=>{
                    dispath(filterActions.setQuery({
                        category: category.category_name,
                        page: 1,
                        minPrice: 0,
                        maxPrice: 50000,
                        offer: 0   
                    }));

                    navigate("/search");
                }}>

            <div className="link-category__text">
                <p className="fs-4 fw-500 text-white mb-0 text-start">{category.category_name}</p>
            </div>

            {imgSrc && (
                <div className="wrapper-img w-100 h-100 position-absolute end-0 bottom-0 flex-grow-1 d-flex justify-content-center align-items-center">
                    <img src={imgSrc}/>
                </div>
            )}
        </button>
    )
}

LinkCategory.defaultProps = {
    className: "",
    imgSrc: "",
    style: {}
}