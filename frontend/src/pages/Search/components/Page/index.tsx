import { ChildrenProps } from "../../../../containers/Loader/components/LoaderLogic";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../../../services/product";
import { IState } from "../../../../store";
import { DEVICE_WIDTH, currentDevice, useResize } from "../../../../hooks";
import { minDevice } from "../../../../utils";
import { navbarActions } from "../../../../store/slices/navbar";
import { IClient } from "../../../../services/client";
import ProductService from "../../../../services/product";

import Filter from "../../../../components/Filter";
import PageContainer from "../../../../components/PageContainer";
import Loader from "../../../../containers/Loader";
import SearchResult from "../SearchingResult";
import Skeleton from "../../../../components/LoadingIndicator/Skeleton";
import SomethingWasWrong from "../../../../components/ErrorMessage/SomethingWasWrong";

type Props = {
    user: IClient | null;
}

export default function Page({ user }:Props){
    let dispatch = useDispatch();
    let { query } = useSelector((state:IState)=> state.filter);

    useResize(()=>{
        if(minDevice(currentDevice(), DEVICE_WIDTH.MOBILE))
            return dispatch(navbarActions.setShow(true));

        dispatch(navbarActions.setShow(false));
    });


    return (
        <PageContainer className="pt-0">
            <div className="container-xxl px-0 px-md-3">
                <div className="position-relative d-block d-md-flex gap-3 mt-2 mt-md-4">
                    {/* FILTER */}
                    <Filter />
                    
                    <div className="w-100 ms-md-3 pt-2">
                        <Loader loader={async ()=>{   
                                    try{
                                        let res = await ProductService.filter(query);
                                        return res.result;
                                    }catch(e){
                                        console.error(e);
                                        return null;
                                    }
                                }}
                                LoadingIndicator={(
                                    <Skeleton>
                                        <Skeleton.Header />
                                        <Skeleton.MenuLineCard />
                                    </Skeleton>
                                )}
                        >
                            {({result, refresh}:ChildrenProps<IProduct[] | null>)=>(
                                result
                                    ? <SearchResult products={result} 
                                                    refresh={refresh}
                                                    user={user}/>
                                    : <SomethingWasWrong/>     
                            )}
                        </Loader>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}