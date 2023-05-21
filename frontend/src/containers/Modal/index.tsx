import { useState } from "react";
import ModelContext, { IModalContext } from "./context"

import Close from "./components/Close";
import Content from "./components/Content";
import ShowButton from "./components/ShowButton";

type Props = {
    children: JSX.Element | React.ReactNode;
}

export default function Modal({children}:Props){
    let [visible, setVisible] = useState(false);
    
    return (
        <ModelContext.Provider value={{
            visible, setVisible
        } as IModalContext}>
            {children}
        </ModelContext.Provider>
    )
}

Modal.ShowButton = ShowButton;
Modal.CloseButton = Close;
Modal.Content = Content;