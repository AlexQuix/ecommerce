import { useContext } from "react";
import { useBodyScroll } from "../../../../hooks/bodyScroll";

import ModalContext from "../../context";

type Props = {
    children: React.ReactNode | JSX.Element;
}

export default function ShowButton({children}:Props){
    let { setVisible } = useContext(ModalContext);
    let { hiddenScroll } = useBodyScroll();

    return (
        <div className="w-100" onClick={()=>{
                setVisible(true);
                hiddenScroll();
            }}>
            {children}
        </div>
    )
}