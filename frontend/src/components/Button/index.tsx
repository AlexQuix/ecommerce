import {useState} from "react";

export interface IClassStates{
    normal?: string;
    hover?: string;
    clicked?: string;
    actived?: string;
    disabled?: string;
}
export interface IButtonStates{
    isHover: boolean;
    isClicked: boolean;
}

export type ButtonComponent = ((props: IButtonStates) => (React.ReactNode));

type IProps = {
    children: React.ReactNode | ButtonComponent;
    isDisabled: boolean;
    classStates: IClassStates;
    clickedDuration: number;
    style: React.CSSProperties;
    handleClick?:()=>void;
}

function notEmpty(value:string | undefined):string{
    return (value)? value : "";
}

export default function Button({children, classStates, isDisabled, style, handleClick, clickedDuration}:IProps) {
    let [isHover, setIsHover] = useState(false);
    let [isClicked, setIsClicked] = useState(false);
    let [idTimeoutClicked, setIdTimeoutClicked] = useState(0);

    return (
        <button 
            className={`${(classStates?.normal)? classStates?.normal : "rounded p-1"} ${(isHover && !isDisabled)? `${notEmpty(classStates?.hover)} hover` : ""} ${(isClicked)? `${notEmpty(classStates?.clicked)} clicked` : ""} ${(isDisabled)? `${notEmpty(classStates?.disabled)} disabled` : notEmpty(classStates?.actived)}`}
            style={{
                background: "none",
                ...style
            }}
            onClick={()=>{
                if(isDisabled) return;
                
                if(idTimeoutClicked)
                    clearTimeout(idTimeoutClicked);

                setIsClicked(true);
                let id = setTimeout(()=>{
                    setIdTimeoutClicked(0);
                    setIsClicked(false);
                }, clickedDuration);
                setIdTimeoutClicked(id as any);

                if(handleClick) handleClick();
            }}
            onMouseEnter={()=>setIsHover(true)}
            onMouseLeave={()=>setIsHover(false)}
        >
            {typeof children === "function" ? children({isClicked, isHover}) : children}
        </button>
    )
}

Button.defaultProps = {
    isDisabled: false,
    style: {},
    classStates: {},
    clickedDuration: 500
}