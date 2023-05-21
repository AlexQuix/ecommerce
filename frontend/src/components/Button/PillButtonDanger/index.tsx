import PillButton from "../../../containers/Button/PillButton";

type Props = {
    children: JSX.Element | React.ReactNode;
    onclick: ()=>Promise<void>;
    type: "button" | "submit" | "reset";
}

export default function PillButtonDanger({children, onclick, type}:Props) {
    return (
        <PillButton bg="linear-gradient(90deg, #FF764A, #FF006B)"
                    bgClicked="linear-gradient(90deg, #FF764A, #FF006B)"
                    bgDisabled="#fff"
                    bgHover="red"
                    color="#fff"
                    colorHover="#fff"
                    colorClicked="#fff"
                    colorDisabled="#FF764A"
                    svgSize="20px"
                    clickedDuration={1000}
                    onclick={onclick}
                    type={type}>
            {children}
        </PillButton>
    )
}

PillButtonDanger.defaultProps = {
    type: "button"
}