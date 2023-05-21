type Props = {
    width: string;
    height: string;
}

export default function Square({width, height}:Props){
    return (
        <div className="skeleton rounded-4"
            style={{ width, height }}>
        </div>
    )
}