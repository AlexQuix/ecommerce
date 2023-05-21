import { useState } from "react";
import { useAlert } from "../../../../hooks/alert/useAlert";
import { useRetrieveResult } from "../../../../containers/Loader/hooks/useRetrieveResult";

import PageContainer from "../../../../components/PageContainer";
import Loader from "../../../../containers/Loader";
import CategoryCarousel, { categoryLoader } from "../CategoryCarousel";
import GlobalAlert from "../../../../components/Alert";
import Skeleton from "../../../../components/LoadingIndicator/Skeleton";
import GlobalPopoverCard from "../../../../components/Popover/PopoverCard";
import ProductSection, { productLoader } from "../ProductSection";
import SomethingWasWrong from "../../../../components/ErrorMessage/SomethingWasWrong";


export default function Page(){
    const [ isSomethingWasWrong, setIsSomethingWasWrong ] = useState(false);
    const user = useRetrieveResult();
    let { closeAlert } = useAlert();

    function hideMessageError(){
        if(isSomethingWasWrong)
            setIsSomethingWasWrong(false);
    }

    function showMessageError(){
        if(isSomethingWasWrong) return;
        setIsSomethingWasWrong(true);
    }

    return (
        <PageContainer appersEffect={false}>
            {/* GLOBAL ERROR */}
            {isSomethingWasWrong && (
                <div className="w-100 mt-5">
                    <SomethingWasWrong />
                </div>
            )}

            {/* CATEGORY CAROUSEL */}
            <Loader loader={categoryLoader}
                    LoadingIndicator={(
                        <div className="px-5">
                            <Skeleton>
                                <Skeleton.MenuCard card={{width: "280px", height: "100px"}}/>
                            </Skeleton>
                        </div>
                    )}>
                {({result})=>{
                    if(result){
                        hideMessageError();
                        return <CategoryCarousel />;
                    }

                    showMessageError();
                    return <></>;
                }}
            </Loader>

            {/* PRODUCT CAROUSEL */}
            <div className="mt-4 px-3 px-md-5 d-flex gap-4 gap-md-5 flex-column">
                <Loader loader={productLoader("Motocicleta")}
                        LoadingIndicator={(
                            <Skeleton>
                                <Skeleton.Header />
                                <Skeleton.MenuCard card={{width: "280px", height: "200px"}}/>
                            </Skeleton>            
                        )}>
                {({result})=>{
                    if(result){
                        hideMessageError();
                        return <ProductSection title="Motocycles" user={user as any}/>;
                    }

                    showMessageError();
                    return <></>;
                }}
                </Loader>

            </div>

            {/* POPOVER CARD */}
            <GlobalPopoverCard />

            {/* ALERT */}
            <div className="position-fixed bottom-0 end-0">
                <GlobalAlert onClose={()=> closeAlert() } />
            </div>
        </PageContainer>
    )
}