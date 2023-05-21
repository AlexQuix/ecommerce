import { useContext } from "react";
import { useBodyScroll } from "../../../../hooks/bodyScroll";
import ModalContext from "../../context";

import CloseButton from "../../../../components/Button/CloseButton";

export default function Close(){
    let {setVisible} = useContext(ModalContext);
    let { showScroll } = useBodyScroll();

    return (
        <div className="m-2 position-absolute top-0 end-0">
            <CloseButton handleClick={()=>{
                            setVisible(false);
                            showScroll();
                        }}/>
        </div>
    )
}