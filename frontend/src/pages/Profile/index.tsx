import { ChildrenProps } from "../../containers/Loader/components/LoaderLogic";
import { Navigate } from "react-router-dom";
import { IClient } from "../../services/client";
import useDataLoader from "../../hooks/user/useDataLoader";

import Loader from "../../containers/Loader";
import Page from "./components/Page";


export default function Profile(){
    let userLoader = useDataLoader();

    return (
        <Loader loader={userLoader}>
            {({result}:ChildrenProps<IClient | null>)=>
                result 
                    ? <Page client={result}/>       
                : ( typeof result === "undefined" )
                    ? <></>
                    : <Navigate to="/login"/>
            }
        </Loader>
    )
}