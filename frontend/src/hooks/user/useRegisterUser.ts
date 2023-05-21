import { useDispatch } from "react-redux";
import { IClient } from "../../services/client";
import { userActions } from "../../store/slices/user";

export default function useRegisterUser(){
    let dispatch = useDispatch();

    function register(user:IClient){
        dispatch(userActions.setIsLogged(true));
        dispatch(userActions.setData(user));
    }

    return { register }
}