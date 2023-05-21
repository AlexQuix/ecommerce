import "./style.scss";
import { useDispatch } from "react-redux";
import { popGalleryActions } from "../../store/slices/popover/popoverGallery";

import PillButton from "../../containers/Button/PillButton";

type Props = {
    main: string;
    collection: string[]
}

export default function Galleries({main, collection}:Props){
    let dispatch = useDispatch();

    return (
        <div className="galleries__container row gap-3 justify-content-center">
            <div className="col-12 col-sm-8 col-md-12 rounded-3">
                <div className="galleries__main w-100 h-100 px-0 px-md-4">
                    <img src={main ? "/assets/img/"+main : "/img/preview-motocycle.jpg"}/>
                </div>
            </div>
            { collection.length > 0 
                ? (
                    <div className="col-12 col-sm-3 col-md-12">
                        <div className="row d-none d-md-flex justify-content-center">
                            {collection.slice(0, 3).map((i)=>(
                                <div key={i} 
                                    className="col-4 col-sm-12 col-md-4 px-2">
                                    <div className="galleries__item h-100 p-3 d-flex align-items-center neu-drop-dark-1 rounded-4">
                                        <img src={"/assets/img/"+i}/>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-100 mt-3 mt-md-4 d-flex justify-content-center">
                            <div className="w-100" style={{maxWidth: "270px"}}>
                                <PillButton bg="var(--bs-dark-900)"
                                            bgClicked="var(--bs-dark-700)"
                                            bgDisabled=""
                                            bgHover=""
                                            color="white"
                                            colorClicked="white"
                                            colorDisabled=""
                                            colorHover=""
                                            onclick={async ()=>{
                                                dispatch(popGalleryActions.setShow(true));
                                            }}>
                                    <PillButton.Text value="All image"/>
                                </PillButton>
                            </div>
                        </div>
                    </div>)
                : <></>
            }
        </div>
    )
}