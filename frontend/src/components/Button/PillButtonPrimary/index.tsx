import PillButton from "../../../containers/Button/PillButton";

type Props = {
    children: JSX.Element | React.ReactNode;
    onclick: ()=>Promise<void>;
    type: "button" | "submit" | "reset";
}

export default function PillButtonPrimary({ onclick, children, type }:Props) {
    return (
        <PillButton bg="var(--bs-prim-400)"
                    bgClicked="var(--bs-prim-600)"
                    bgDisabled="#fff"
                    bgHover="var(--bs-prim-500)"
                    svgSize="20px"
                    color="#fff"
                    colorClicked="#fff"
                    colorDisabled="var(--bs-prim-500)"
                    colorHover="var(--bs-prim-100)"
                    clickedDuration={1000}
                    onclick={onclick}
                    type={type}>
            {children}
        </PillButton>
    )
}

PillButtonPrimary.defaultProps = {
    type: "button"
}