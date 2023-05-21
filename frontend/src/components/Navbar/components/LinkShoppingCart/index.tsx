import { useState } from "react";
import { ChildrenProps } from "../../../../containers/Loader/components/LoaderLogic";
import ClientService, { IProductFromShoppingCart } from "../../../../services/client";

import DrawLine from "../../../../containers/Anime/DrawLine";
import Path from "../../../../containers/Anime/Path";
import LinkDrawLine from "../../../Link/LinkDrawLine";
import LinkPopover from "../../../Link/LinkPopover";
import Loader from "../../../../containers/Loader";
import Content from "./components/Content";
import LoginRequired from "../../../ErrorMessage/LoginRequired";
import Skeleton from "../../../LoadingIndicator/Skeleton";

export default function LinkShoppingCart(){
    let [executeAnime, setExecuteAnime] = useState(false);

    async function loader(){
        let res = await ClientService.getAllProductFromShoppingCart();
        if(res.ok)
            return res.result.shoping_cart;
        
        return null;
    }

    const link = <LinkDrawLine title="Cart" 
                                to="/shopping-cart"
                                execute={executeAnime}
                            SVGDrawLine={({color, duration, play})=>(
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 167" xmlSpace="preserve">
                                    <DrawLine animeConfig={{
                                                    duration,
                                                    easing: "linear",
                                                    loop: false,
                                                    direction: "normal",
                                                    reverse: false
                                                }}
                                                play={play}>
                                        <g fill="none">
                                            <Path d="M5 7.13458C21.6667 2.13458 55.3 2.73457 56.5 45.1346M56.5 45.1346H244.5L220.5 113.635L76.5 141.635M56.5 45.1346L76.5 141.635M76.5 141.635C71 146.801 63.3 157.735 76.5 160.135L210.5 162.135"
                                                    style={{strokeWidth: "20", stroke: color, strokeLinecap: "round", strokeLinejoin: "round", transform: "translateY(-20%)"}}/>
                                            <Path d="M176 200C176.4 190.4 182.5 185 191 185C200 185 206 192.5 206 200C206 207.5 199.5 215 191 215C182 215 176 208.5 176 200Z"
                                                    style={{strokeWidth: "20", stroke: color, transform: "translateY(-10%)"}}/>
                                            <Path d="M63 200C63.4 190.4 69.5002 185 78 185C87.0002 185 93.0002 192.5 93.0002 200C93.0002 207.5 86.5002 215 78.0002 215C69.0002 215 63 208.5 63 200Z"
                                                    style={{strokeWidth: "20", stroke: color, transform: "translateY(-10%)"}}/>
                                        </g>
                                    </DrawLine>
                                </svg>
                            )}/>

    return (
        <LinkPopover posx={-200} posy={20}
                    Link={link}
                    PopoverContent={(
                        <div className="popover__content bg-white shadow-drop-dark pt-2 pe-2 rounded-3" style={{width: "400px"}}>
                            <Loader loader={loader}
                                    LoadingIndicator={(
                                        <div className="p-2 ps-3 overflow-hidden"
                                            style={{maxHeight: "300px"}}>
                                            <Skeleton>
                                                <Skeleton.MenuLineCard />
                                            </Skeleton>
                                        </div>
                                    )}
                            >
                                {({result}:ChildrenProps<IProductFromShoppingCart[]>)=>
                                    result
                                        ? <Content products={result}
                                                    btnOnClick={async ()=>{
                                                        setExecuteAnime(true);
                        
                                                        await new Promise((res, rej)=>{
                                                            setTimeout(()=>{
                                                                setExecuteAnime(false);
                                                                res(null);
                                                            }, 1000)
                                                        })
                                                    }}/>
                                        : <LoginRequired imgMaxWidth="150px"/>
                                }
                            </Loader>
                        </div>
                    )}/>   
    )
}