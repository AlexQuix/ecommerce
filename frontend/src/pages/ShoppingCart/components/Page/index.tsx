import { useState } from "react";
import { minDevice } from "../../../../utils";
import { DEVICE_WIDTH, currentDevice, useResize } from "../../../../hooks";
import { ChildrenProps } from "../../../../containers/Loader/components/LoaderLogic";
import { useAlert } from "../../../../hooks/alert/useAlert";
import ClientService, { IProductFromShoppingCart } from "../../../../services/client";

import PageContainer from "../../../../components/PageContainer";
import Alert from "../../../../components/Alert";
import Loader from "../../../../containers/Loader";
import Content from "../Content";
import SomethingWasWrong from "../../../../components/ErrorMessage/SomethingWasWrong";
import Skeleton from "../../../../components/LoadingIndicator/Skeleton";


export default function Page(){
    let { closeAlert } = useAlert();
    let [ showNavbar, setShowNavbar ] = useState(false);

    useResize(()=>{
        let device = currentDevice();
        if(minDevice(device, DEVICE_WIDTH.TABLET))
            return setShowNavbar(true);

        setShowNavbar(false);
    });

    async function shoppingCartLoader(){
        let res = await ClientService.getAllProductFromShoppingCart();
        if(res.ok) return res.result.shoping_cart;
        return null;
    }

    return (
        <PageContainer showNavbar={showNavbar}>
            <div className="w-100 d-flex justify-content-center mt-0 mt-sm-4">
                <Loader loader={shoppingCartLoader}
                        LoadingIndicator={(
                            <Skeleton>
                                <Skeleton.Header />
                                <div className="row justify-content-center">
                                    <div className="col-6">
                                        <Skeleton.MenuLineCard />
                                    </div>
                                    <div className="col-5">
                                        <Skeleton.Square width="100%"
                                                        height="300px"/>
                                    </div>
                                </div>
                            </Skeleton>
                        )}>
                    {({result, refresh}:ChildrenProps<IProductFromShoppingCart[] | null>)=>
                        result
                            ? <Content products={result} refresh={refresh} />
                            : <SomethingWasWrong />
                    }
                </Loader>
            </div>
            
            <div className="position-fixed bottom-0 end-0">
                <Alert onClose={ ()=> closeAlert() }
                        delayToClose={3000}/>  
            </div>                
        </PageContainer>
    )
}