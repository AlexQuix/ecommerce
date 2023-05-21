import "./style.scss";
import { useState } from "react";
import ClientService from "../../../services/client";
import { useSelector } from "react-redux";
import { IState } from "../../../store";
import { useAlert } from "../../../hooks/alert/useAlert";

import Button from "../";

type Props = {
    size?: number;
    isFavorite: boolean;
    visibility: boolean;
    productId: string;
    handleClick?: ()=>void;
    className?: string;
}

export default function FavoriteButton({size, isFavorite, productId, visibility, className}:Props){
    let { isLogged } = useSelector((state:IState)=>state.user);
    let [isFav, setIsFav] = useState(isFavorite);

    let {displayAlert} = useAlert();
    
    async function onClick(){
        if(!isLogged)
            displayAlert("Debes iniciar sesion", "danger");
        
        if(isFav){
            let removeRes = await ClientService.removeFavorite(productId);
            if(removeRes.ok)
                return setIsFav(false);
        }

        let addedRes = await ClientService.addFavorite(productId);
        if(addedRes.ok) setIsFav(true);
    }

    return (
        <Button classStates={{
                    normal: `favorite position-relative ${ isFav ? "favorite--added" : "" } ${ visibility ? "favorite--hover" : "" } ${ className || "p-2 border-0 rounded-3" }`
                }}
                handleClick={ onClick }
                style={{"--size": size+"px"} as React.CSSProperties}
                clickedDuration={1000}
        >
            {({isClicked})=>(<>
                <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8918 22.9918L11.8904 22.9904C8.65343 19.7911 6.04273 17.2052 4.22971 14.7876C2.42961 12.3873 1.5 10.2597 1.5 7.99319C1.5 4.2541 4.15546 1.5 7.375 1.5C9.21428 1.5 11.0226 2.43905 12.2143 3.95246L13 4.95016L13.7857 3.95246C14.9774 2.43905 16.7857 1.5 18.625 1.5C21.8445 1.5 24.5 4.2541 24.5 7.99319C24.5 10.2597 23.5704 12.3873 21.7703 14.7876C19.9573 17.2052 17.3466 19.7911 14.1096 22.9904L14.1082 22.9918L13 24.0913L11.8918 22.9918Z" 
                            strokeWidth="2"/>
                </svg>

                {isClicked && <div className="w-100 h-100 position-absolute top-0 start-0">
                    <div className="w-100 h-100 position-relative">
                        <div className="favorite--animate" style={{"--delay":"0ms"} as React.CSSProperties}>
                            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.8918 22.9918L11.8904 22.9904C8.65343 19.7911 6.04273 17.2052 4.22971 14.7876C2.42961 12.3873 1.5 10.2597 1.5 7.99319C1.5 4.2541 4.15546 1.5 7.375 1.5C9.21428 1.5 11.0226 2.43905 12.2143 3.95246L13 4.95016L13.7857 3.95246C14.9774 2.43905 16.7857 1.5 18.625 1.5C21.8445 1.5 24.5 4.2541 24.5 7.99319C24.5 10.2597 23.5704 12.3873 21.7703 14.7876C19.9573 17.2052 17.3466 19.7911 14.1096 22.9904L14.1082 22.9918L13 24.0913L11.8918 22.9918Z" 
                                        strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="favorite--animate" style={{"--delay":"200ms"} as React.CSSProperties}>
                            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.8918 22.9918L11.8904 22.9904C8.65343 19.7911 6.04273 17.2052 4.22971 14.7876C2.42961 12.3873 1.5 10.2597 1.5 7.99319C1.5 4.2541 4.15546 1.5 7.375 1.5C9.21428 1.5 11.0226 2.43905 12.2143 3.95246L13 4.95016L13.7857 3.95246C14.9774 2.43905 16.7857 1.5 18.625 1.5C21.8445 1.5 24.5 4.2541 24.5 7.99319C24.5 10.2597 23.5704 12.3873 21.7703 14.7876C19.9573 17.2052 17.3466 19.7911 14.1096 22.9904L14.1082 22.9918L13 24.0913L11.8918 22.9918Z" 
                                        strokeWidth="2"/>
                            </svg>
                        </div>
                    </div>
                </div>}
            </>)}
        </Button>
    )
}

FavoriteButton.defaultProps = {
    size: 40,
    visibility: true,
    className: ""
}