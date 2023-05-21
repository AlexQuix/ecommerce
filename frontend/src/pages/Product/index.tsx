import { Navigate, useParams } from "react-router-dom";
import { ChildrenProps } from "../../containers/Loader/components/LoaderLogic";
import { IClient } from "../../services/client";
import ProductService, { IProduct } from "../../services/product";

import Loader from "../../containers/Loader";
import Page from "./components/Page";
import useDataLoader from "../../hooks/user/useDataLoader";

type DataLoader = {
    user: IClient | null;
    product: IProduct
}

export default function Product(){
    let {id} = useParams();
    let userLoader = useDataLoader();

    async function loader(){
        let user = await userLoader();

        let res = await ProductService.details(id as string);
        if(res.ok) 
            return { user, product: res.result };

        return {};
    }

    return (
        <Loader loader={loader}>
            {({result}:ChildrenProps<DataLoader>)=>
                result?.product 
                    ? <Page product={result.product} user={ result.user }/>
                : typeof result?.product === "undefined"
                    ? <></>
                    : <Navigate to={"/404"}/>
            }
        </Loader>
    )
}