import "./style.scss";

import Button from "../";
import Text from "./components/Text";
import Icon from "./components/Icon";

type Props = {
    onclick: ()=>Promise<void>;
    clickedDuration: number;
    children: JSX.Element | React.ReactNode;
    bg: string;
    bgClicked: string;
    bgDisabled: string;
    bgHover: string;
    color: string;
    colorClicked: string;
    colorDisabled: string;
    colorHover: string;
    svgSize: string;
    type: "button" | "submit" | "reset";
    disabled: boolean;
}

export default function PillButton({
    onclick, clickedDuration, color, colorClicked, colorDisabled, colorHover, children, bg, bgClicked, bgHover, bgDisabled, svgSize, type, disabled
}:Props) {
    return (
        <Button className="pill w-100 text-center bg-transparent"
                onclick={onclick}
                clickedDuration={clickedDuration}
                disabled={disabled}
                disableWhenIsClicked={true}
                type={type}
                style={{}}>
            <div className={`pill__body d-flex justify-content-center gap-2 p-2 rounded-pill neu-inner-dark-1`}
                style={{
                    "--pill-svg-size": svgSize,
                    "--pill-bg": bg,
                    "--pill-bg-hover": bgHover,
                    "--pill-bg-clicked": bgClicked,
                    "--pill-bg-disabled": bgDisabled,
                    "--pill-color": color,
                    "--pill-color-hover": colorHover,
                    "--pill-color-clicked": colorClicked,
                    "--pill-color-disabled": colorDisabled
                } as React.CSSProperties}>
                {children}
            </div>
        </Button>
    )
}

PillButton.Text = Text;
PillButton.Icon = Icon;


PillButton.defaultProps = {
    clickedDuration: 1000,
    svgSize: "20px",
    colorClicked: "#fff",
    type: "button",
    disabled: false
}