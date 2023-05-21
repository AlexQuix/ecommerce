import "./style.scss";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popGalleryActions } from "../../../../store/slices/popover/popoverGallery";
import { IState } from "../../../../store";
import { useAnime } from "../../../../hooks/anime";
import { useBodyScroll } from "../../../../hooks/bodyScroll";

import CloseButton from "../../../../components/Button/CloseButton";

type Props = {
    main: string;
    collection: string[]
}

export default function PopoverGallery({ collection, main }:Props) {
    let contRef = useRef({} as HTMLDivElement);
    let dispatch = useDispatch();
    let { hiddenScroll, showScroll } = useBodyScroll();
    let { show } = useSelector((state:IState)=>state.popoverGallery);
    
    let {pause, playAnime, events} = useAnime(contRef.current, 
                                        { scale: [0, 1], opacity: [0, 1] } )

    useEffect(()=>{
        events({
            onBegin(){
                hiddenScroll();
            },
            onReverseComplete(){
                dispatch(popGalleryActions.setShow(false));
                showScroll();
            }
        });
    }, [ events, hiddenScroll, dispatch, showScroll ])

    useEffect(()=>{
        if(show) playAnime("normal");
    }, [show, playAnime])

    return (
        <div className="pop-gallery__container bg-white position-fixed top-0 start-0"
            ref={contRef}>
            {(pause && show && contRef.current?.classList) && (
                <div className="pop-gallery__body scrollbar h-100 w-100 position-relative pb-4">
                    <div className="pop-gallery__header p-2 bg-white d-flex justify-content-end position-sticky top-0 start-0">
                        <p className="ms-auto mb-0 me-auto text-dark-700">
                            <span className="fs-5 fw-500 text-dark-900 me-2">{collection.length + 1}</span>
                            imagines
                        </p>
                        <CloseButton handleClick={()=>{
                                        playAnime("reverse");
                                    }}/>
                    </div>

                    <div className="pop-gallery w-100 d-flex align-items-center flex-column gap-3">
                        <div className="pop-gallery__item rounded-3"
                                style={{background: "#f8f8f8"}}>
                            <img src={"/assets/img/"+main}
                                alt="main product"/>
                        </div>
                        {collection.map((i)=>(
                            <div key={i}
                                className="pop-gallery__item rounded-3"
                                style={{background: "#f8f8f8"}}>
                                <img src={"/assets/img/"+i}
                                    alt="product"/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}