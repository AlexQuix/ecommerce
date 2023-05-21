import DrawLine from "../../../../containers/Anime/DrawLine";
import Path from "../../../../containers/Anime/Path";
import LinkDrawLine from "../../../Link/LinkDrawLine";

export default function LinkCategory(){
    return (
        <LinkDrawLine title="Search" to="/se"
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
                                    <Path d="M65.0718 61.5C58.6503 68.9302 49.2513 74 38.5003 74C17.2005 74 3 58.6167 3 38.4998C3.94666 15.7798 18.3838 3 38.4997 3C59.8001 3 74 20.7498 74 38.4998C74 46.7636 70.6657 55.0274 65.0718 61.5ZM65.0718 61.5L94 85"
                                            style={{ stroke:color, strokeWidth:"5", strokeLinecap: "round", strokeLinejoin: "round" }}/>
                                </DrawLine>
                            </svg>
                        )}/> 
    )
}