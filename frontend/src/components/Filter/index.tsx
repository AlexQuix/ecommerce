import "./style.scss";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useAnimeTimeline } from "../../hooks/anime";
import { DEVICE_WIDTH, currentDevice } from "../../hooks";
import { IState } from "../../store";
import { IFilterForm, filterActions } from "../../store/slices/filter";
import { useBodyScroll } from "../../hooks/bodyScroll";
import { minDevice } from "../../utils";


import Range from "../Forms/Range";
import Checkbox from "../Forms/Checkbox";
import CloseButton from "../Button/CloseButton";
import SelectCategory from "./components/SelectCategory";


export default function Filter(){
    let dispatch = useDispatch();
    let btnCloseRef = useRef({} as HTMLButtonElement);
    let filterRef = useRef({} as HTMLDivElement);
    
    let { visibility, query } =  useSelector((state:IState)=>state.filter);
    let { showScroll } = useBodyScroll();
    let { events, addAnimation, playAnime } = useAnimeTimeline();
    let device = currentDevice();

    useEffect(()=>{
        if(Boolean(filterRef.current?.id && btnCloseRef.current?.id)){
            addAnimation(filterRef.current, {
                            translateX: [-400, 0],
                        }, 0)
            addAnimation(btnCloseRef.current, {
                            scale: [0.5, 1.2, 1],
                        }, "-=100");

            events({
                onReverseComplete() {
                    dispatch(filterActions.hideFilter());

                    if(!minDevice(device, DEVICE_WIDTH.TABLET)){
                        showScroll();            
                    }
                },
            })
        }        
    }, [filterRef, btnCloseRef])

    useEffect(()=>{
        if(visibility) playAnime("normal");
    }, [visibility])

    function handleChanges(v:IFilterForm){
        dispatch(filterActions.setQuery(v));
    }

    return (<>
        <div className="filter__wrapper position-relative">
            <div className={`filter scrollbar w-100 rounded-4 py-3 px-4 pb-5 me-4 neu-inner-1 bg-white ${visibility? "position-fixed" : (minDevice(device, DEVICE_WIDTH.TABLET))? "d-block" : "d-none" }`}
                    ref={filterRef}
                    id="filter">
                <header className="container-fluid px-0 d-flex justify-content-center align-items-center mb-4">
                    <h1 className="mx-auto mb-0 fs-5 text-center text-dark-500">Filter</h1>
                    { !minDevice(device, DEVICE_WIDTH.TABLET) && (
                        <CloseButton ref={btnCloseRef}
                                    id="filter__btn-close"
                                    handleClick={()=>{
                                        playAnime("reverse");
                                    }}/>
                    )}
                </header>
                
                {/* FORM */}
                <Formik initialValues={query as IFilterForm}
                        onSubmit={()=>{}}
                        validate={handleChanges}>
                    {({values, setValues})=>(
                        <Form className="w-100 d-flex flex-column gap-5">
                            <div className="w-100 d-flex flex-column gap-2">
                                <SelectCategory name="category"
                                                value={values.category}
                                                onChange={(option)=>{
                                                    setValues({...values, category: option});
                                                }}/>
                            </div>
                            <div className="w-100 position-relative d-flex flex-column gap-2">
                                <label className="small text-dark-500 pb-1 border-bottom" htmlFor="price">Maximum Price</label>
                                <div className="w-100 position-relative d-flex flex-column gap-0">
                                    <span className="mx-auto mb-2 fs-5 text-dark-400">
                                        $<Field type="number" name="maxPrice" className="text-dark-700 border-bottom rounded-2 ms-1" 
                                                style={{maxWidth: "90px"}}/>
                                    </span>
                                    <Range name="maxPrice" value={values.maxPrice} min={0} max={50000}/>
                                </div>
                            </div>
                            <div className="pt-3 border-top d-flex flex-column gap-3">
                                <Checkbox name="offer" title="Offers"/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </>)
}