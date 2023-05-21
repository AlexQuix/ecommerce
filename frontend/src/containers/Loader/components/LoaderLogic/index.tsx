import { useState, useEffect, useCallback } from "react";
import { LoaderHook, DataLoader, useLoader } from "../../hooks/useLoader";

export type ErrorComponent = (props:{reason:any})=>JSX.Element;
export type LoadingIndicator = JSX.Element;
export type ChildrenProps<T> = LoaderHook<T> & { refresh: ()=>void };
export type ChildrenComponent<T> = (props:ChildrenProps<T>)=> JSX.Element | React.ReactNode;

interface Props<T> {
    dataLoader: DataLoader;
    LoadingIndicator: LoadingIndicator;
    Error: ErrorComponent
    children: JSX.Element | React.ReactNode | ChildrenComponent<T>;

}

export default function LoaderLogic<T>({dataLoader, children, LoadingIndicator, Error}:Props<T>){
    let [ initialRender, setInitialRender ] = useState(true);
    let [ exec, setExec ] = useState(false);
    let { loading, error, result } = useLoader<T | null>(dataLoader, exec);

    // Function to update the exec state to true and thus reload the information
    const refresh = useCallback(()=>setExec(true), []);

    useEffect(()=>{
        if(initialRender){
            setExec(true);
            setInitialRender(false);
        }
    }, [ initialRender ])

    useEffect(()=>{
        if(!loading && exec){
            setExec(false);
        }
    }, [ loading, exec ])


    // If the information is still loading, return a LoadingIndicator Component
    if (loading || initialRender)
        return LoadingIndicator;

    // If an error occurred during the loading of the information, return an Error component
    if (error)
        return <Error reason={error}/>

    // If there are no errors and no information is being loaded, return the content of the parent component
    return <>{ typeof children === "function" 
                ? children({loading, error, result, refresh}) 
                : children 
            }</>;
}