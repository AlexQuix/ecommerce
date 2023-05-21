import { useState, useEffect } from "react"
import { DrawLineContext, IContext } from "../../contexts/anime"
import Anime from "animejs";

type Props = {
    animeConfig:{
        duration: number;
        loop: boolean | number;
        easing: string;
        direction: string;
        reverse: boolean;
    }
    play: boolean;
    children: any;
};

export default function DrawLine({animeConfig, play, children}:Props){
    let [paths, setPaths] = useState<SVGPathElement[]>([]);

    function addPath(path:SVGPathElement){
        setPaths(prev=>[...prev, path]);
    }

    useEffect(()=>{
        if(play){
            Anime({
                targets: paths,
                strokeDashoffset: [Anime.setDashoffset, 0],
                easing: animeConfig.easing,
                duration: animeConfig.duration,
                loop: animeConfig.loop,
                direction: animeConfig.direction,
                autoplay: true
            })
        }
    }, [play])

    return (
        <DrawLineContext.Provider value={{
            paths, addPath
        } as IContext}>
            {children}
        </DrawLineContext.Provider>
    )
}


DrawLine.defaultProps = {
    animeConfig: {
        duration: 1000,
        easing: "linear",
        loop: false,
        direction: "normal",
        reverse: false
    }
}