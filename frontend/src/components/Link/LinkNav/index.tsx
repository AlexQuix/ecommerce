import "./style.scss";
import { useDevice } from "../../../hooks";
import { Link, useLocation } from "react-router-dom";

interface IProps{
    title: string;
    SVG?: ({fill}:{fill:string})=>JSX.Element;
    isActive: boolean;
    to: string;
}

export default function LinkNav({title, isActive, SVG, to}:IProps){
    const device = useDevice();
    let {pathname} = useLocation();

    return (
        <li className="nav-item px-2 px-sm-3 rounded-3 shadow-sm-inner shadow-sm-drop-hover bg-white" style={{cursor:"default"}}>
            <Link to={to} className="nav-link d-flex align-items-center gap-2 py-1 py-sm-2">
                {SVG && (
                    <div className="nav-item__icon position-relative mb-1">
                        {<SVG fill={(isActive || pathname === to)? "var(--bs-prim-400)" : "var(--bs-dark-400)"}  />}
                    </div>
                )}
                { (device === "laptop" || device === "desktop" || device === "extra-desktop") && 
                    <span className={`small fw-400 ${(isActive || pathname === to)? "text-prim-400" : "var(--bs-dark-100)"}`}>{title}</span>
                }
            </Link>
        </li>
    )
}