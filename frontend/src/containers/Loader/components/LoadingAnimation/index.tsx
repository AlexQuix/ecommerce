import "./style.scss";

export default function LoadingAnimation(){
    return (
        <div className="loader__container">
            <div className="loader__wrapper d-flex justify-content-center align-items-center">
                <div className="loader">
                    <span className="circle__central"></span>


                    <span className="circle__item" 
                            style={{ "--d": "0" } as React.CSSProperties}>
                    </span>
                    <span className="circle__item" 
                            style={{ "--d": "1" } as React.CSSProperties}>
                    </span>
                    <span className="circle__item" 
                            style={{ "--d": "2" } as React.CSSProperties}>
                    </span>
                </div>
            </div>
        </div>
    )
}