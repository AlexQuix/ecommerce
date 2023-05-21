import "./style.scss";
import { useContext } from "react"
import { MosaicContentComponent } from "../..";
import { MosaicContext } from "../../context";


type Props = {
    children: MosaicContentComponent;
}

export default function Content({children}:Props){
    let { mode } = useContext(MosaicContext);

    let colTemplate = mode === "line" ? "1fr" :"repeat(var(--cols), var(--col-width))";
    return (
        <div className="mosaic__content container-fluid"
            style={{
                "--col-template": colTemplate
            } as React.CSSProperties}>
            <div className="mosaic__grid mosaic__col-template mosaic__row-auto">
                {typeof children === "function" ? children({mode}) : children}
            </div>
        </div>
    )
}