type Props = {
    className: string;
    onClick: ()=>void;
}

function AddButton({className, onClick}:Props){
    return (
        <button className={`p-1 neu-drop-dark-1 rounded-1 bg-white ${className}`}
                style={{
                    width: "30px",
                    height: "30px"
                }}
                onClick={onClick}
                type="button">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.2284 5V50.5M50.2284 95V50.5M5 50.5H50.2284M50.2284 50.5H95" 
                    stroke="var(--bs-prim-500)" 
                    strokeWidth="11" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
        </button>
    )
};

AddButton.defaultProps = {
    className: "",
    onClick: ()=>{}
}

export default AddButton;