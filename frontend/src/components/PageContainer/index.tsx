import "./style.scss";
import { useRef, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { useAnimePage } from "../../hooks/anime";
import { navbarActions } from "../../store/slices/navbar";

type Props = {
    children: JSX.Element | React.ReactNode;
    showNavbar: boolean;
    className: string;
    defSyle: boolean;
    appersEffect: boolean;
    style: React.CSSProperties;
}

export default function PageContainer({children, showNavbar, className, style, defSyle, appersEffect}:Props) {
    let dispatch = useDispatch();
    let { load } = useSelector((state:IState)=>state.loadPage);
    let pageRef = useRef({} as HTMLDivElement);

    useAnimePage(appersEffect ? pageRef : {current:{}} as any, load);
    
    useEffect(()=>{
        dispatch(navbarActions.setShow(showNavbar));
    }, [showNavbar])

    return (
        <div className={`${defSyle?"page container-fluid py-3 mb-4 pb-5 pb-sm-0":""} ${className}`}
            ref={pageRef}
            style={style}>
            {children}
        </div>
    )
}

PageContainer.defaultProps = {
    showNavbar: true,
    className: "",
    defSyle: true,
    style: {},
    appersEffect: true
}