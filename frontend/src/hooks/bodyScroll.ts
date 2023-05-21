import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";
import { bodySrollActions } from "../store/slices/bodyScroll";

export function useBodyScroll(){
    const dispath = useDispatch();
    let bodyScroll = useSelector((state:IState)=>state.bodyScroll);

    useEffect(()=>{
        if(bodyScroll.hidden){
            document.body.style.overflowY = "hidden";
            return;
        }
        
        document.body.style.overflowY = "scroll";
    }, [bodyScroll]);

    return {
        showScroll(){
            dispath(bodySrollActions.setHidden(false));
        },
        hiddenScroll(){
            dispath(bodySrollActions.setHidden(true));
        }
    }
}