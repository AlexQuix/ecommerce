import { ChildrenProps } from "../../containers/Loader/components/LoaderLogic";
import { IClient } from "../../services/client";
import useDataLoader from "../../hooks/user/useDataLoader";

import Loader from "../../containers/Loader";
import Page from "./components/Page";

export default function Search(){
    let userLoader = useDataLoader();

    return (
        <Loader loader={ userLoader } >
            {({result}:ChildrenProps<IClient | null>)=>(
                <Page user={result}/>
            )}
        </Loader>
    )
}