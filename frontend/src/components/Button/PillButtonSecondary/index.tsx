import PillButton from "../../../containers/Button/PillButton";

type Props = {
    children: JSX.Element | React.ReactNode;
    onclick: ()=>Promise<void>;
    type: "button" | "submit" | "reset";
}

export default function PillButtonSecondary({children, onclick, type}:Props) {
    return (
        <PillButton bg="var(--bs-cs-400)"
                    bgHover="var(--bs-cs-500)"
                    bgClicked="var(--bs-cs-500)"
                    bgDisabled="#fff"
                    color="#fff"
                    colorHover="#fff"
                    colorClicked="var(--bs-cs-300)"
                    colorDisabled="var(--bs-cs-500)"
                    svgSize="20px"
                    clickedDuration={1000}
                    onclick={onclick}
                    type={type}>
            {children}
        </PillButton>
    )
}

PillButtonSecondary.defaultProps = {
    type: "button"
}