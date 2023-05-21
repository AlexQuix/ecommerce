import "./style.scss";

type Props = {
    style?: React.CSSProperties;
}

export default function Spinner({style}:Props){
    return (
        <div className="spinner w-100 h-100 rounded-3"
            style={style}>
                <span className="circle"
                    style={{"--delay": 0} as React.CSSProperties}></span>
                <span className="circle"
                    style={{"--delay": 1} as React.CSSProperties}></span>
                <span className="circle"
                    style={{"--delay": 2} as React.CSSProperties}></span>
            </div>
    )
}