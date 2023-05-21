import "./style.scss";
import { useRef, useState } from "react";
import { minDevice } from "../../utils";
import { DEVICE_WIDTH, currentDevice, useResize } from "../../hooks";

import PillButton from "../../containers/Button/PillButton";
import PillButtonPrimary from "../Button/PillButtonPrimary";

type Props = {
    totalPrice: number;
    savedMoney: number;
    shippingCost: number;
}

export default function Summary({ totalPrice, savedMoney, shippingCost }:Props) {
    let device = currentDevice();
    let container = useRef({} as HTMLDivElement);
    let [rect, setRect] = useState<{width:string, left:string}>({} as any);

    useResize(()=>{
        if(container.current?.getBoundingClientRect){
            let {width, left} = container.current.getBoundingClientRect();
            setRect({width: width+"px", left: left+"px"});
            return;
        }

        setRect({width: "100%", left: "0px"})
    });

    return (
        <>
            {minDevice(device, DEVICE_WIDTH.TABLET) && 
                <div className="summary__space w-100 container-fluid me-3" style={{height:"1px"}}
                    ref={container}></div>
            }

            <div className="summary__body position-fixed py-2 px-2 px-md-0 py-md-0"
                style={{width: rect.width, left: rect.left}}>
                <details open className="mb-2">
                    <summary style={{appearance: "auto"}}>
                        <header className="border-bottom">
                            <h1 className="text-prim-500 text-center fs-6">Summary</h1>
                        </header>
                    </summary>

                    <div className="position-relative d-block mt-4">
                        <div className="d-flex align-items-center px-2">
                            <p className="mb-0 small fw-500 text-dark-400">Subtotal</p>
                            <div className="h-100 flex-grow-1 pt-2 border-dark-300 mx-3"
                                style={{borderBottomStyle: "dashed", borderWidth: "1px"}}></div>
                            <p className="mb-0 fs-6 fw-500 ms-auto text-dark-600">${totalPrice}</p>
                        </div>
                        <div className="d-flex align-items-center px-2">
                            <p className="mb-0 small fw-500 text-dark-400">Saved Money</p>
                            <div className="h-100 flex-grow-1 pt-2 border-dark-300 mx-3"
                                style={{borderBottomStyle: "dashed", borderWidth: "1px"}}></div>
                            <p className="mb-0 fs-6 fw-500 ms-auto text-dark-600">${savedMoney}</p>
                        </div>
                        <div className="d-flex align-items-center px-2">
                            <p className="mb-0 small fw-500 text-dark-400">Cost of shipping</p>
                            <div className="h-100 flex-grow-1 pt-2 border-dark-300 mx-3"
                                style={{borderBottomStyle: "dashed", borderWidth: "1px"}}></div>
                            <p className="mb-0 fs-6 fw-500 ms-auto text-dark-600">${shippingCost}</p>
                        </div>
                        <div className="w-100 position-relative border-top mt-4 pb-2 d-flex align-items-center px-2">
                            <p className="mb-0 fs-6 fw-500 text-dark-400">Total</p>
                            <p className="mb-0 fs-6 fw-600 ms-auto text-dark-700">${ totalPrice - savedMoney + shippingCost }</p>
                        </div>
                    </div>
                </details>

                
                {/* <PillButtonPrimary onclick={()=>{

                                    }}>
                    <PillButton.Text value="Pagar"/>
                </PillButtonPrimary> */}
            </div>
        </>
    )
}