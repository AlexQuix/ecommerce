import { useState } from "react";
import { MosaicContext } from "./context";

import Content from "./components/Content";
import Button from "./components/Button";

export interface IMosaicContext{
    mode: MosaicMode;
    changeMode: (mode:MosaicMode)=>void;
}
export type MosaicContentComponent = React.ReactNode | ((props:{mode:MosaicMode})=>JSX.Element|React.ReactNode);
export type MosaicMode = "line" | "square";

type Props = {
    children: JSX.Element | React.ReactNode;
    initialMode: MosaicMode;
}

function Mosaic({children, initialMode}:Props){
    let [mode, setMode] = useState<MosaicMode>(initialMode);

    function changeMode(mode:MosaicMode){
        setMode(mode);
    }

    return (
        <MosaicContext.Provider value={{
            mode, changeMode
        }}>
            {children}
        </MosaicContext.Provider>
    )
}

Mosaic.Content = Content;
Mosaic.Button = Button

export default Mosaic;