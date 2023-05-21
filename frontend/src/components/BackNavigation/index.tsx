import "./style.scss";
import { useNavigate } from "react-router-dom";
import { minDevice } from "../../utils";
import { DEVICE_WIDTH, currentDevice } from "../../hooks";


export default function BackNavigation(){
    let navigate = useNavigate();
    let isMobile = !minDevice(currentDevice(), DEVICE_WIDTH.MOBILE);

    function backNavigation(){
        if(window.history.length > 1)
            return navigate(-1);
        
        navigate("/");
    }

    if(isMobile){
        return (
            <div className="back-nav__wrapper">
                <button className="back-nav bg-transparent"
                        onClick={backNavigation}>
                    <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L14.5 15.5L1 31" 
                        stroke="var(--bs-dark-700)" strokeWidth="3"/>
                    </svg>
                </button>
            </div>
        )   
    }

    return <></>
}