import { useState } from "react";
import { useDispatch } from "react-redux";
import { linkPopover } from "../../../../store/slices/popover/linkPopover";
import { IProduct } from "../../../../services/product";
import { ChildrenProps } from "../../../../containers/Loader/components/LoaderLogic";
import ClientService from "../../../../services/client";

import LinkPopover from "../../../Link/LinkPopover";
import Content from "./components/Content";
import Loader from "../../../../containers/Loader";
import DrawLine from "../../../../containers/Anime/DrawLine";
import Path from "../../../../containers/Anime/Path";

import LinkDrawLine from "../../../Link/LinkDrawLine";
import LoginRequired from "../../../ErrorMessage/LoginRequired";
import Skeleton from "../../../LoadingIndicator/Skeleton";


export default function LinkFavorite() {
    const dispatch = useDispatch();
    let [ execAnime, setExecAnime ] = useState(false);

    async function loaderFavorite(){
        let data = await ClientService.getAllProductFromFavorite();
        if(data.ok) return data.result.favorites;
        
        return null;
    }

    return (
        <LinkPopover posx={-150} posy={23} 
                    Link={(
                        <LinkDrawLine title="Favorite" to="/favorite"
                                    execute={execAnime}
                                    animeConfig={{
                                        duration: 1000,
                                        ignoreDuration: false
                                    }}
                                    SVGDrawLine={({color, duration, play})=>(
                                        <svg viewBox="0 0 40 36" fill="none">
                                            <DrawLine animeConfig={{
                                                        duration,
                                                        easing: "linear",
                                                        loop: false,
                                                        direction: "normal",
                                                        reverse: false
                                                    }}
                                                    play={play}>
                                                <Path d="M18.0834 31.8496L18.0812 31.8477C12.9006 27.3676 8.72471 23.7481 5.82642 20.3665C2.94203 17.0011 1.5 14.069 1.5 10.9905C1.5 5.99315 5.59876 2 11 2C14.0523 2 16.9879 3.36267 18.885 5.47072L20 6.70963L21.115 5.47072C23.0121 3.36267 25.9477 2 29 2C34.4012 2 38.5 5.99315 38.5 10.9905C38.5 14.069 37.058 17.0011 34.1736 20.3665C31.2753 23.7481 27.0994 27.3676 21.9188 31.8477L21.9166 31.8496L20 33.5136L18.0834 31.8496Z"
                                                    style={{ stroke:color, strokeWidth:"3" }}/>
                                            </DrawLine>
                                        </svg>
                                    )}/> 
                    )}
                    PopoverContent={(
                        <div className="popover__content bg-white shadow-drop-dark pt-3 pe-2 rounded-3" style={{width: "400px"}}>                                
                                <Loader loader={loaderFavorite}
                                        LoadingIndicator={(
                                            <div className="p-2 ps-3 overflow-hidden"
                                                style={{maxHeight: "300px"}}>
                                                <Skeleton>
                                                    <Skeleton.MenuLineCard />
                                                </Skeleton>
                                            </div>
                                        )}
                                >
                                    {({result}:ChildrenProps<IProduct[] | null>)=>
                                        (result)
                                            ? <Content products={result}
                                                        btnOnClick={async ()=>{
                                                            setExecAnime(true);
                                                            dispatch(linkPopover.actions.setCloseAll(true));
                                                            
                                                            await new Promise((res, rej)=>{
                                                                setTimeout(()=>{
                                                                    setExecAnime(false);
                                                                    res(true);
                                                                }, 1000)
                                                            });
                                                        }}/>
                                            : (
                                                <div className="w-100 position-relative"
                                                    style={{maxHeight: "300px"}}>
                                                    <LoginRequired imgMaxWidth="150px"/>
                                                </div>
                                            )
                                    }
                                </Loader>
                        </div>
                    )}/>
    )   
}