import "./style.scss";

type Props = {
    children: any;
    Pointer: JSX.Element;
}

export default function Popover({children, Pointer}:Props){
    return (
        <div className="popover">
            <div className="popover__wrapper position-relative">
                {Pointer}
                <div className="position-relative">
                    {children}
                </div>
            </div>
        </div>
    )
}