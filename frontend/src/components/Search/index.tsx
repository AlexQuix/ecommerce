import "./style.scss";

import { useRef, useEffect } from "react"
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { DEVICE_WIDTH, currentDevice } from "../../hooks";
import { matchPathname, minDevice } from "../../utils";
import { useAnime } from "../../hooks/anime";
import { useDispatch } from "react-redux";
import { filterActions } from "../../store/slices/filter";

import CloseButton from "../Button/CloseButton";
import PillButtonPrimary from "../Button/PillButtonPrimary";
import PillButton from "../../containers/Button/PillButton";

interface ISearchForm {
    search: string;
}

export default function Search(){
    let btnClose = useRef({} as HTMLButtonElement);
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let { pathname } = useLocation();

    let device = currentDevice();
    let isSearchPage = matchPathname(pathname, "/search");
    let {playAnime, events} = useAnime(btnClose.current, { scale: [0.7, 1, 1] }, {duration:500, delay: 0, easing: "linear"});
    
    useEffect(()=>{
        events({
            onBegin(){
                navigate("/search");
            },
            onReverseComplete() {
                navigate("/")
            }
        });
    }, [navigate, events]);

    function handleSubmit({search}:ISearchForm) {
        search = search.trim();
        if(!search) search = "*";

        dispatch(filterActions.setKeyword(search));
        dispatch(filterActions.refresh());

        setTimeout(()=>{
            dispatch(filterActions.notRefresh());
        }, 100);
    }

    function handleChange({target}: any){
        let isGreatherThanOne = (target as any).value.length > 0;
        if( isGreatherThanOne && !isSearchPage && !minDevice(device, DEVICE_WIDTH.MOBILE)){
            playAnime("normal");
        }
    }

    function handleClose(){
        playAnime("reverse");
    }

    return (
        <div className="w-100 d-flex justify-content-center border-bottom border-dark-100">
            <div className={`search__wrapper w-100 px-3 py-3 py-sm-4 bg-white d-flex justify-content-center top-0 left-0"`}>
                <Formik initialValues={{search:""} as ISearchForm}
                        onSubmit={handleSubmit}>
                    {({submitForm})=>(
                        <Form className="w-100 position-relative d-flex justify-content-center" 
                                onChange={ handleChange }>
                            <div className={`search search--anime w-100 px-2 px-sm-3 me-0 me-md-3 py-1 d-flex align-items-center gap-1 gap-sm-3 position-relative`}>
                                <div className="search__icon position-relative">
                                    <svg viewBox="0 0 36 36" fill="none">
                                        <path d="M28.9389 14.7167C28.9389 17.8539 27.9203 20.7519 26.2044 23.1031L34.8591 31.763C35.7136 32.6174 35.7136 34.0049 34.8591 34.8592C34.0046 35.7136 32.6168 35.7136 31.7623 34.8592L23.1075 26.1994C20.7559 27.9218 17.8573 28.9333 14.7194 28.9333C6.86457 28.9333 0.5 22.57 0.5 14.7167C0.5 6.86333 6.86457 0.5 14.7194 0.5C22.5743 0.5 28.9389 6.86333 28.9389 14.7167ZM14.7194 24.559C16.0122 24.559 17.2923 24.3044 18.4867 23.8098C19.681 23.3152 20.7662 22.5902 21.6804 21.6762C22.5945 20.7623 23.3196 19.6773 23.8143 18.4832C24.309 17.289 24.5637 16.0092 24.5637 14.7167C24.5637 13.4242 24.309 12.1443 23.8143 10.9502C23.3196 9.75605 22.5945 8.67105 21.6804 7.7571C20.7662 6.84316 19.681 6.11818 18.4867 5.62356C17.2923 5.12894 16.0122 4.87436 14.7194 4.87436C13.4267 4.87436 12.1466 5.12894 10.9522 5.62356C9.75786 6.11818 8.67264 6.84316 7.75852 7.7571C6.8444 8.67105 6.11928 9.75605 5.62456 10.9502C5.12984 12.1443 4.87521 13.4242 4.87521 14.7167C4.87521 16.0092 5.12984 17.289 5.62456 18.4832C6.11928 19.6773 6.8444 20.7623 7.75852 21.6762C8.67264 22.5902 9.75786 23.3152 10.9522 23.8098C12.1466 24.3044 13.4267 24.559 14.7194 24.559Z" 
                                                fill="var(--bs-dark-300)"/>
                                    </svg>
                                </div>
                                <Field type="text" name="search" 
                                        className="w-100 text-start fs-6 text-prim-500 border-0 bg-transparent"
                                        placeholder="Tenere 700..."
                                        autoComplete="off"/>

                                <div className="search__bg w-100 h-100 position-absolute top-0 start-0 rounded-pill"></div>
                            </div>

                            {/* CLOSE BUTTON */}
                            { !minDevice(device, DEVICE_WIDTH.MOBILE) && (
                                <CloseButton handleClick={ handleClose }
                                            ref={btnClose}
                                            style={{display: ( isSearchPage )? "block" : "none"}}/>
                            )}

                            {/* SUBMIT BUTTON */}
                            { (matchPathname(pathname, "/search") || minDevice(device, DEVICE_WIDTH.MOBILE)) &&
                                <div className="search__btn w-100 py-2 py-sm-0 neu-drop-1 neu-sm-none bg-white">
                                    <div className="w-100 position-relative"
                                        style={{minWidth: "200px"}}>
                                        <PillButtonPrimary onclick={async ()=>{
                                                                if(matchPathname(pathname, "/")){
                                                                    navigate("/search");
                                                                }

                                                                await submitForm();
                                                            }}>
                                            <PillButton.Text value="Search"/>
                                        </PillButtonPrimary>
                                    </div>
                                </div>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="search__space pt-4 pb-5 p-sm-0"></div>
        </div>
    )
}