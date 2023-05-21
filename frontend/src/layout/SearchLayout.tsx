import { Outlet } from "react-router-dom";
import Search from "../components/Search";

export default function SearchLayout(){
    return (
        <>
            <Search />
            <Outlet />
        </>
    )
}