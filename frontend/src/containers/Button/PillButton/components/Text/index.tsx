type Props = {
    value: string;
}

export default function Text({value}:Props){
    return(
        <span className="pill__text fw-500 fs-6">{value}</span>
    )
}