import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDevice } from "../../../hooks";

interface ISVGAnimeProps{
    color: string;
    play: boolean;
    duration: number;
}

interface IProps{
    title: string;
    animeConfig: {
        duration: number;
        ignoreDuration: boolean; // ignore the duration to execute the link
    };
    className: string;
    SVGDrawLine: (props:ISVGAnimeProps)=>JSX.Element;
    to: string;
    execute: boolean;
}

export default function LinkDrawLine({to, title, SVGDrawLine, animeConfig, className, execute}:IProps){
    let [play, setPlay] = useState(false);

    let device = useDevice();
    let {pathname} = useLocation();
    let navigate = useNavigate();
    
    let validDevice = (device === "laptop" || device === "desktop" || device === "extra-desktop");
    let drawLineColor = (pathname === to)? "var(--bs-prim-400)" : "var(--bs-dark-400)";

    useEffect(()=>{
        if(execute){
            handleClick();
        }
    }, [execute])

    function handleClick(){
        setPlay(true);

        if(!animeConfig.ignoreDuration){
            setTimeout(()=>{
                setPlay(false);
                navigate(to);
            }, animeConfig.duration);
        }else{
            navigate(to);
            setPlay(false);
        }
    }

    return (
        <a className={`nav-link d-flex align-items-center gap-2 px-2 px-sm-3 py-2 neu-drop-dark-1 rounded-3${className && " " + className}`}
            onClick={handleClick}>
            <div className="nav-link__icon position-relative">
                {<SVGDrawLine color={drawLineColor}
                                play={play}
                                duration={animeConfig.duration}/>}
            </div>
            { validDevice && 
                <span className={`small fw-400 ${(pathname === to)? "text-prim-400" : "var(--bs-dark-100)"}`}>{title}</span>
            }
        </a>
    )
}

LinkDrawLine.defaultProps = {
    className: "",
    animeConfig: {
        duration: 1000,
        ignoreDuration: false
    },
    execute: false
}