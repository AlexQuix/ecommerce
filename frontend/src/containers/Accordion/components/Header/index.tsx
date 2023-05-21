type Props = {
    children: JSX.Element | React.ReactNode;
}

export default function Header({children}:Props) {
    return (
        <summary style={{appearance: "auto"}}>
            <header className="border-bottom">
                {children}
            </header>
        </summary>
    )
}