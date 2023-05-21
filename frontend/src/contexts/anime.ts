import { createContext, useState } from "react";

export interface IContext{
    paths: SVGPathElement[];
    addPath: (path:SVGPathElement)=>void;
}

export const DrawLineContext = createContext({} as IContext);