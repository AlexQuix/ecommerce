type Props = {
    children: JSX.Element;
}

export default function Icon({children}:Props){
    return (
        <div className="pill__icon">
            {children}
        </div>
    )
}