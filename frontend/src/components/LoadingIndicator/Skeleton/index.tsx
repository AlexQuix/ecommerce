import "./style.scss";
import { useBodyScroll } from "../../../hooks/bodyScroll";
import { useEffect } from "react";

import Header from "./components/Header";
import MenuLineCard from "./components/MenuLineCard";
import MenuCard from "./components/MenuCard";
import Square from "./components/Square";

type Props = {
    hideScroll: boolean;
    children: React.ReactNode | JSX.Element;
}

export default function Skeleton({children, hideScroll}:Props){
    let {showScroll, hiddenScroll} = useBodyScroll();

    useEffect(()=>{
        if( hideScroll ){
            hiddenScroll();
            return ()=> showScroll();
        }
    }, [ hideScroll, hiddenScroll, showScroll ])

    return (
        <div className="w-100 h-100 position-relative">
            {children}
        </div>
    )
}

Skeleton.defaultProps = {
    hideScroll: true
}

Skeleton.Header = Header;
Skeleton.MenuLineCard = MenuLineCard;
Skeleton.MenuCard = MenuCard;
Skeleton.Square = Square;