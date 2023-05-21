import { useEffect, useState, useRef } from "react";
import { useAnimeTimeline } from "../../../hooks/anime";

export interface IOption{ 
    value: string;
    title: string;
}

type Props = {
    value: IOption;
    options: IOption[]
    handleSelected: (option:IOption)=>void;
}

export default function Select({ value, options, handleSelected }:Props){
    let iconRef = useRef<HTMLDivElement>({} as HTMLDivElement);
    let dropdownRef = useRef<HTMLDivElement>({} as HTMLDivElement);
    let [showMenu, setShowMenu] = useState(false);
    let {events, direction, addAnimation, playAnime} = useAnimeTimeline();

    useEffect(()=>{
        if(iconRef.current.id && dropdownRef.current.id){
            addAnimation(dropdownRef.current, {
                        opacity: [0, 1],
                        translateY: [100, 0]
                    }, 0);
            addAnimation(iconRef.current, { 
                        rotate:[0, 180]
                    }, 0);

            events({
                onBegin(){
                    setShowMenu(true);
                },
                onReverseComplete() {
                    
                    setShowMenu(false);
                },
            });
        }
    }, [iconRef, dropdownRef])
    
    return (
        <div className="select d-block position-relative">
            {/* TARGET */}
            <div className="select__target neu-drop-1 py-2 rounded-3 d-flex justify-content-between px-3"
                onClick={()=>{
                    playAnime(direction === "normal" ? "reverse" : "normal");
                }}>
                <p className="text-capitalize m-0 p-0 text-prim-400">{value.title}</p>

                <div className="select__icon"
                    id="select__icon"
                    style={{rotate: "90deg"}}
                    ref={iconRef}>
                    <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L14.5 15.5L1 31" stroke="var(--bs-prim-400)" strokeWidth="3"/>
                    </svg>
                </div>
            </div>

            {/* OPTIONS */}
            <div className={`select__dropdown w-100 mt-2 bg-cs-100 rounded-3 neu-drop-1 overflow-hidden ${showMenu ? "position-absolute start-0" : "d-none"}`}
                id="select__dropdown"
                style={{ opacity: 0 }}
                ref={dropdownRef}>
                <ul className="select__menu w-100 p-0 m-0 position-relative d-flex flex-column gap-1">
                    {options.map((o, i)=>(
                        <li key={i} className="select__option d-block bg-white"
                            onClick={()=>{
                                playAnime("reverse");
                                handleSelected(o);
                            }}>
                            <p className="small text-capitalize text-dark-500 text-prim-300-hover m-0 px-2 py-2">{o.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}