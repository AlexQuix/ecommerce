import "./style.scss";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../store";

import CloseButton from "../Button/CloseButton";

export type AlertType = "success" | "danger" | "warning";

type Props = {
    delayToClose: number;
    onClose: ()=>void;
}

export default function Alert({ onClose, delayToClose}:Props){
    const _onClose = useRef(onClose);
    const { show, message, type } = useSelector((state:IState) => state.alert);

    const handleClose = useCallback(()=>{
        let id = setTimeout(()=> _onClose.current(), delayToClose)
        return id as unknown as number;
    }, [ delayToClose ])

    useEffect(()=>{
        let id = 0;
        if( show ) id = handleClose();

        return ()=> clearTimeout(id);
    }, [ show, handleClose ]);

    if(show){
        return (
            <div className={`alert alert-${type} w-100 mb-0 mb-md-3`}>
                <div className="w-100 d-flex justify-content-between align-items-center gap-3">
                    <span className="alert__text">{message}</span>
                    <CloseButton handleClick={onClose}/>
                </div>
            </div>
        )
    }

    return <></>
}

Alert.defaultProps = {
    delayToClose: 4000
}