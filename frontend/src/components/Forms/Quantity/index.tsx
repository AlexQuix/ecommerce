import "./style.scss";

type Props = {
    value: number;
    onRest: ()=>void;
    onAdd: ()=>void;
}

export default function Quantity({value, onRest, onAdd}:Props){
    return (
        <>
            <button type="button" 
                    className="quantity__btn bg-prim-100 text-prim-500 fs-4 m-0 p-0 rounded-2"
                    onClick={onAdd}>
                +
            </button>
            <span className="quantity__text text-center text-dark-700 fs-5">{value}</span>
            <button type="button" 
                    className="quantity__btn bg-prim-100 text-prim-500 fs-4 m-0 p-0 rounded-2"
                    onClick={onRest}>
                -
            </button>
        </>
    )
}