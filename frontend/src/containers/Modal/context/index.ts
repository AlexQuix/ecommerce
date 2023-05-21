import { createContext } from "react";

export interface IModalContext{
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ModelContext = createContext({} as IModalContext);

export default ModelContext;