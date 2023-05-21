import DrawLine from "../../../../containers/Anime/DrawLine";
import Path from "../../../../containers/Anime/Path";
import LinkDrawLine from "../../../Link/LinkDrawLine";

export default function LinkUser(){
    return (
        <LinkDrawLine title="Account" to="/profile"
                        animeConfig={{
                            duration: 1000,
                            ignoreDuration: false
                        }}
                        SVGDrawLine={({color, duration, play})=>(
                            <svg viewBox="0 0 219 247" fill="none">
                                <DrawLine animeConfig={{
                                            duration,
                                            easing: "linear",
                                            loop: false,
                                            direction: "normal",
                                            reverse: false
                                        }}
                                        play={play}>
                                    <Path d="M60 58.4997C61.3467 26.1797 81.884 8 110.5 8C140.8 8 161 33.2498 161 58.4997C161 83.7497 139.117 109 110.5 109C80.2007 109 60 87.1167 60 58.4997Z"
                                            style={{ stroke:color, strokeWidth:"15" }}/>
                                    <Path d="M7.5 238.5C26 112 189 110 211.5 238.5"
                                            style={{ stroke:color, strokeWidth:"15", strokeLinecap:"round" }}/>
                                </DrawLine>
                            </svg>
                        )}/> 
    )
}