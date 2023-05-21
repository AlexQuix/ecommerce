import Header from "./components/Header";

type Props = {
    children: JSX.Element | React.ReactNode;
}

export default function Accordion({children}:Props) {
    return (
        <details open>
            {children}
        </details>
    )
}

Accordion.Header = Header;