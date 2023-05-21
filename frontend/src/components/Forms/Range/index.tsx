import "./style.scss";
import { Field } from "formik";

type Props = {
    value: number;
    name: string;
    min: number;
    max: number;
}

export default function Range({ value, name, min, max }:Props){
    return (
        <div className="range" style={{"--lightness": `${((value / max) * 100) + 50}%`} as React.CSSProperties}>
            <Field type="range" name={name}  min={min} max={max} />
        </div>
    )
}