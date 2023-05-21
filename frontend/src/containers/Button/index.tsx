import {useState, useRef} from "react";


export interface IButtonStates{
    isHover: boolean;
    isClicked: boolean;
    isDisable: boolean;
}

export type ButtonComponent = ((props: IButtonStates) => (React.ReactNode));

type IProps = {
    children: React.ReactNode | ButtonComponent;
    disabled: boolean;
    className: string;
    style: React.CSSProperties;
    clickedDuration: number; // remove this property
    onclick:()=>Promise<void>;
    type: "button" | "submit" | "reset";
    disableWhenIsClicked: boolean;
}

export default function Button({
    children, className, disabled, style, onclick, type, disableWhenIsClicked
}:IProps) {
    let btnRef = useRef({} as HTMLButtonElement);
    let [isDisable, setIsDisable] = useState(disabled);
    let [isHover, setIsHover] = useState(false);
    let [isClicked, setIsClicked] = useState(false);

    async function handleClick(){
        if(!btnRef.current) return;

        if(disableWhenIsClicked && isDisable) 
            return;

        if(disableWhenIsClicked){
            setIsDisable(true);
            btnRef.current.classList.add("disabled");
        }

        setIsClicked(true);
        btnRef.current.classList.add("clicked");

        await onclick();

        setIsDisable(false);
        setIsClicked(false);

        btnRef.current.classList.remove("clicked");
        btnRef.current.classList.remove("disabled");
    }

    return (
        <button type={type}
                className={className}
                style={style}
                onClick={()=>handleClick()}
                ref={btnRef}
            onMouseEnter={()=>{
                setIsHover(true);
            }}
            onMouseLeave={()=>{
                setIsHover(false);
            }}
        >
            {typeof children === "function" ? children({isClicked, isHover, isDisable}) : children}
        </button>
    )
}