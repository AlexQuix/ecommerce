import DrawLine from "../../../../containers/Anime/DrawLine";
import Path from "../../../../containers/Anime/Path";
import LinkDrawLine from "../../../Link/LinkDrawLine";

export default function LinkCategory(){
    return (
            <LinkDrawLine title="Categories" to="/categories"
                        SVGDrawLine={({color, duration, play})=>(
                            <svg viewBox="0 0 46 46" fill="none">
                                <DrawLine animeConfig={{
                                            duration,
                                            easing: "linear",
                                            loop: false,
                                            direction: "normal",
                                            reverse: false
                                        }}
                                        play={play}>
                                    <Path d="M18 27H2V43H18V27Z"
                                            style={{ stroke:color, strokeWidth:"5", strokeLinecap: "round", strokeLinejoin: "round" }}/>
                                    <Path d="M43 2H27V18H43V2Z"
                                            style={{ stroke:color, strokeWidth:"5", strokeLinecap: "round", strokeLinejoin: "round" }}/>
                                    <Path d="M18 2H2V18H18V2Z"
                                            style={{ stroke:color, strokeWidth:"5", strokeLinecap: "round", strokeLinejoin: "round" }}/>
                                    <Path d="M26 35C26.24 29.24 29.9001 26 34.9999 26C40.4 26 44 30.5 44 35C44 39.4999 40.1 44 35.0001 44C29.6001 44 26 40.1 26 35Z"
                                            style={{ stroke:color, strokeWidth:"5", strokeLinecap: "round", strokeLinejoin: "round" }}/>
                                </DrawLine>
                            </svg>
                        )}/> 
    )
}