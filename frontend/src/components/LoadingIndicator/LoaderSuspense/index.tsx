import "./style.scss";

export default function LoaderSuspense(){
    return(
        <div className="container">
            <div className="suspense__container d-flex justify-content-center align-items-center">
                <div className="suspense">
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