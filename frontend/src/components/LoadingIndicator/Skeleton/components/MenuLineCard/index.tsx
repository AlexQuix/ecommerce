import "./style.scss";
import { DEVICE_WIDTH, currentDevice } from "../../../../../hooks";
import { minDevice } from "../../../../../utils";

export default function MenuLineCard(){
    let device = currentDevice();
    let isGreatherThanMobile = minDevice(device, DEVICE_WIDTH.MOBILE);

    return (
        <div className="skeleton__menu d-flex flex-column gap-3">
            <div className="skeleton skeleton__item rounded-4"></div>
            <div className="skeleton skeleton__item rounded-4"></div>
            <div className="skeleton skeleton__item rounded-4"></div>
            <div className="skeleton skeleton__item rounded-4"></div>
            
            {isGreatherThanMobile && (<>
                <div className="skeleton skeleton__item rounded-4"></div>
                <div className="skeleton skeleton__item rounded-4"></div>
                <div className="skeleton skeleton__item rounded-4"></div>
                <div className="skeleton skeleton__item rounded-4"></div>
            </>)}
        </div>
    )
}