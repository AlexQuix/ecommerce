import { useContext } from "react";

import ModalContext from "../../context";

type Props = {
    bg: string;
    children: React.ReactNode | JSX.Element;
}

export default function Content({children, bg}:Props){
    let { visible } = useContext(ModalContext);
    
    
    if(visible){
        return (
            <div className="position-fixed top-0 start-0"
                style={{width: "100%", height: "100vh", zIndex: "800", background: bg}}>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    {children}
                </div>
            </div>
        )
    }

    return <></>
}

Content.defaultProps = {
    bg: "white"
}