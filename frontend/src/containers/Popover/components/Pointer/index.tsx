type Props = {
    size: string;
    background: string;
    shadow: string;
    borderRadius: string;
    style: React.CSSProperties;
}

export default function Pointer({size, background, shadow, borderRadius, style}:Props){    
    return (
        <span className="position-absolute" style={{
            width: size,
            height: size,
            boxShadow: shadow,
            background,
            borderRadius,
            transform: "rotate(45deg)",
            zIndex: "-1",
            ...style
        }} />
    )
}


Pointer.defaultProps = {
    shadow: "none",
    background: "var(--bs-white)",
    borderRadius: "5px",
    style: {}
}