import "./style.scss";
import { useContext } from "react"
import { MosaicContext } from "../../context"

export default function Button(){
    let { mode, changeMode } = useContext(MosaicContext);

    return (
        <div className="d-flex gap-3">
            <button className={"mosaic__btn bg-white neu-drop-dark-1 p-0 m-0 py-1 px-2 rounded-2 " + (mode === "line" && "mosaic__btn--active")}
                    onClick={()=>{
                        changeMode("line");
                    }}>
                <svg width="101" height="74" viewBox="0 0 101 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5H96M5 37H96M5 69H96" 
                        strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <button className={"mosaic__btn bg-white neu-drop-dark-1 p-0 m-0 py-1 px-2 rounded-2 " + (mode === "square" && "mosaic__btn--active")}
                    onClick={()=>{
                        changeMode("square");
                    }}>
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 27H2V43H18V27Z" 
                            strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M43 2H27V18H43V2Z" 
                            strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 2H2V18H18V2Z" 
                            strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26 35C26.24 29.24 29.9001 26 34.9999 26C40.4 26 44 30.5 44 35C44 39.4999 40.1 44 35.0001 44C29.6001 44 26 40.1 26 35Z" 
                            strokeWidth="5"/>
                </svg>
            </button>
        </div>
    )
}