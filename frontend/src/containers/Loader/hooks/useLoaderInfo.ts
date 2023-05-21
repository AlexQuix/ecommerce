import { useContext } from "react";
import { LoaderContext } from "../context/loader";

export function useLoaderInfo(){
    let { loading, error, result } = useContext( LoaderContext );
    
    return {
        loading,
        error,
        result
    }
}