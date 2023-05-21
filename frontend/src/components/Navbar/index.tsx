import "./style.scss";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import { Link } from "react-router-dom";

import LinkFavorite from "./components/LinkFavorite";
import LinkShoppingCart from "./components/LinkShoppingCart";
import LinkUser from "./components/LinkUser";
import LinkCategory from "./components/LinkCategory";

export default function Navbar(){
    let { show } = useSelector((state:IState)=>state.navbar);

    if( show ){
        return <>
            <div className="navbar__container w-100 start-0" 
                    style={{zIndex: 780}}>
                <nav className="navbar navbar-light bg-white px-2 neu-drop-dark-1">
                    <div className="container-fluid px-xxl-5 mx-xxl-5">
                        <Link to={"/"} className="navbar-brand text-decoration-none text-prim-500">
                            Store
                        </Link>
                        <ul className="navbar-nav flex-row gap-2 gap-sm-3 ms-auto">
                            <LinkCategory />
                            <LinkFavorite />
                            <LinkShoppingCart />
                            <LinkUser />
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    }

    return <></>
}