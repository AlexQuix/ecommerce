import { Navigate } from "react-router-dom";
import { getTokenCookie } from "../../utils/auth";

type Props = {
    children: JSX.Element;
}

export default function ProtectedRoute({children}:Props){
    let token = getTokenCookie();
    if(!token){
        return <Navigate to="/login"/>
    }

    return children;
}