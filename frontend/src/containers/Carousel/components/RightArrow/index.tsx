import Button from "../../../../components/Button";

type Props = {
    enable: boolean;
    handleClick: ()=>void;
}

export default function RightArrow({enable, handleClick}:Props){
    return (
        <Button classStates={{
                    normal: "p-2"
                }}
                isDisabled={!enable}
                handleClick={handleClick}
        >
            <svg viewBox="0 0 12 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L10 17L2 32" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Button>
    )
}