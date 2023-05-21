import "./style.scss";
import { categoryLoader } from "./loader";
import { ChildrenProps } from "../../containers/Loader/components/LoaderLogic";
import { ICategory } from "../../services/category";

import Loader from "../../containers/Loader";
import Page from "./components/Page";
import SomethingWasWrong from "../../components/ErrorMessage/SomethingWasWrong";

export default function Categories(){
    return (
        <Loader loader={categoryLoader}>
            {({result}:ChildrenProps<ICategory[] | null>)=>(
                <>{ result 
                    ? <Page categories={result}/> 
                    : (
                        <div className="w-100 mt-5">
                            <SomethingWasWrong />
                        </div>
                    )
                }</>
            )}
        </Loader>
    )
}