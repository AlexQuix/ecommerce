import { useContext, useEffect, useRef } from "react";
import { DrawLineContext, IContext } from "../../contexts/anime";

type Props = {
    d: string;
    style: React.CSSProperties;
}

export default function Path({ d, style} : Props){
    const {addPath} = useContext<IContext>(DrawLineContext as any);
    let pathRef = useRef({} as SVGPathElement);
    let isAdded = useRef(false);
    
    useEffect(()=>{
        if(pathRef.current && !isAdded.current){
            addPath(pathRef.current);
            isAdded.current = true;
        }
    }, [pathRef, addPath])

    return (<>
        <path d={d} style={style} ref={pathRef}/>
    </>)
}

Path.defaultProps = {
    style: {}
}