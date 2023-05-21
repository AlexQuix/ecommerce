export default function SomethingWasWrong(){
    return (
        <div className="w-100">
            <img src="/img/icons/wire-disconnected.png"
                style={{
                    maxHeight: "90px",
                    objectFit: "contain"
                }}/>
            <p className="fs-5 text-dark-600 fw-400 text-center">
                Something went wrong! It's not your fault.
                <br/>
                Please try again later
            </p>
        </div>
    )
}