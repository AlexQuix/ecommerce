import "./style.scss";
import { Field } from "formik";

type Props = {
    name: string;
    title?: string;
    color: string;
    bg: string;
    colorChecked: string;
    bgChecked: string;
    shadow: string;
    size: string;
}

export default function Checkbox({ size, name, title, color, bg, colorChecked, bgChecked, shadow }:Props){
    return (
        <div className="d-flex align-items-center"
            style={{
                "--check-size": size,
                "--check-color": color,
                "--check-bg": bg,
                "--check-color-active": colorChecked,
                "--check-bg-active": bgChecked,
                "--check-shadow": shadow
            } as React.CSSProperties}>
            <Field type="checkbox" name={name} id={name} className="check__hidden"/>
            <label htmlFor={name} className="check rounded-2"></label>
            {title && <label htmlFor={name} className="check__text ps-3 text-dark-500">{title}</label>}
        </div>
    )
}

Checkbox.defaultProps = {
    size: "24px",
    color: "var(--bs-dark-200)",
    bg: "transparent",
    colorChecked: "var(--bs-prim-500)",
    bgChecked: "var(--bs-prim-100)",
    shadow: "var(--neu-inner-2)"
}