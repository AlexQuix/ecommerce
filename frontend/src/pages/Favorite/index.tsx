import { ChildrenProps } from "../../containers/Loader/components/LoaderLogic";
import { favoriteLoader } from "./loader";
import { IProduct } from "../../services/product";

import Loader from "../../containers/Loader";
import Page from "./components/Page";
import Skeleton from "../../components/LoadingIndicator/Skeleton";
import SomethingWasWrong from "../../components/ErrorMessage/SomethingWasWrong";

export default function Favorite(){
    return (
        <Loader loader={favoriteLoader}
                LoadingIndicator={(
                    <div className="w-100 px-3 py-4 position-relative">
                        <Skeleton>
                            <Skeleton.Header />
                            <Skeleton.MenuLineCard />
                        </Skeleton>
                    </div>
                )}>
            {({result}:ChildrenProps<IProduct[] | null>)=>
                result 
                    ? <Page products={result}/>
                    : <SomethingWasWrong/>
            }
        </Loader>
    )
}