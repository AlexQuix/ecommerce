import "./style.scss";
import {LegacyRef, forwardRef} from "react";

type Props = {
    id?: string;
    className?: string;
    handleClick: ()=>void;
    style?: React.CSSProperties;
}

const CloseButton = forwardRef(({className, handleClick, style, id}:Props, ref:LegacyRef<HTMLButtonElement>)=>{
    return (
        <button className={`btn__close ms-2 neu-drop-dark-1 px-2 py-2 rounded-3 ${className}`}
                ref={ref}
                style={style}
                onClick={handleClick}
                id={id}
                type="button">
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L27 27M51 51L27 27M27 27L51 3M27 27L3 51" 
                    stroke="#d53369" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    )
});

CloseButton.defaultProps = {
    className: "",
    id: "",
    style: {}
}

export default CloseButton;