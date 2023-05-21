import { useDispatch } from "react-redux";
import { AlertType, alertActions } from "../../store/slices/alert";

export type AlertHooks = {
    displayAlert: (message:string, type:AlertType)=>void;
    closeAlert: ()=>void;
}

export function useAlert(): AlertHooks{
    let dispatch = useDispatch();

    function displayAlert(message:string, type:AlertType){
        dispatch(alertActions.setShow(true));
        dispatch(alertActions.setMessage(message));
        dispatch(alertActions.setType(type));
    }

    function closeAlert(){
        dispatch(alertActions.setShow(false));
        dispatch(alertActions.setMessage(""));
        dispatch(alertActions.setType("danger"));
    }

    return {
        displayAlert,
        closeAlert
    }
}