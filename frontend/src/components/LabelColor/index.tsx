import "./style.scss";

type Props = {
    background: string
}

export default function LabelColor({background}:Props){
    return (
        <span className="label-color" style={{background}}></span>
    )
}