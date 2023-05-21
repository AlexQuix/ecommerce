import "./style.scss";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/user";
import { useRef, useEffect } from "react";
import { Field, Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useAnime } from "../../hooks/anime";
import { useAlert } from "../../hooks/alert/useAlert";
import AuthService, { ILoginBody } from "../../services/auth";
import ClientService from "../../services/client";
import * as Yup from "yup";

// COMPONENTS
import PageContainer from "../../components/PageContainer";
import PillButtonPrimary from "../../components/Button/PillButtonPrimary";
import PillButton from "../../containers/Button/PillButton";
import ErrorMessage from "../../components/Forms/ErrorMessage";
import Alert, { AlertType } from "../../components/Alert";

const LoginSchema = Yup.object().shape({
    userOrEmail: Yup.string()
                        .required(),
    password: Yup.string()
                    .required()
});

export default function Login(){
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let formRef = useRef({} as HTMLDivElement);
    let { displayAlert, closeAlert } = useAlert();
    let { playAnime, events } = useAnime(formRef.current, {
                                rotateY: [0, 90],
                                skew: [0, 20]
                            }, {
                                duration: 1500,
                                easing: "easeInQuad",
                                delay: 0
                            });

    useEffect(()=>{
        playAnime("reverse");
        events({
            onComplete(){
                navigate("/signin");
            }
        })
    }, [playAnime, events, navigate]);

    async function retrieveUser(){
        let res = await ClientService.details();
        if(res.ok)
            dispatch(userActions.setData(res.result));
    }

    async function handleSumbit(user:ILoginBody){
        try{
            let res = await AuthService.login(user);
            let message = res.message;
            let type: AlertType = "danger";
        
            if(res.ok){
                type = "success";
                message = "!Hello! It's a pleasure having you around here";
                dispatch(userActions.setIsLogged(true));
                retrieveUser();
                
                setTimeout(()=>{
                    navigate("/");
                }, 3000)
            }

            displayAlert(message, type);
        }catch(e){
            displayAlert("Something went wrong, please try again later", "danger");
        }
    }

    return (
        <PageContainer showNavbar={false}
                        defSyle={false}
                        className="w-100 p-2 position-relative d-flex flex-column justify-content-center align-items-center overflow-hidden"
                        style={{
                            minHeight: "100vh",
                            background: "linear-gradient(90deg, #65FFA3, #4243FF)"
                        }}>
            <div className="w-100 position-relative" 
                style={{
                    maxWidth: "500px"
                }}>
                <Formik initialValues={{
                            userOrEmail: "",
                            password: "",
                        } as ILoginBody}
                        validationSchema={LoginSchema}
                        onSubmit={ handleSumbit }>
                    {({submitForm, errors})=>(
                        <Form>
                            <div className="form__container position-relative"
                                style={{zIndex: "100"}}>
                                <div className="form__wrapper py-2 px-3 px-md-4 rounded-3 neu-drop-1 bg-white"
                                    ref={formRef}>
                                    <div className="form d-flex align-items-center flex-column gap-4">
                                        <header className="w-100 mt-3 border-bottom border-2">
                                            <h1 className="text-center fs-4 text-dark-600">Log in</h1>
                                        </header>
                                        <div className="w-100 d-flex flex-column">
                                            <label className="ms-3 small text-dark-400">Username or Email</label>
                                            <Field name="userOrEmail" className="fs-6 p-2 px-3 neu-inner-1 rounded-3 text-prim-500"/>
                                            <ErrorMessage error={errors.userOrEmail}/>
                                        </div>
                                        <div className="w-100 d-flex flex-column">
                                            <label className="ms-3 small text-dark-400">Password</label>
                                            <Field name="password" className="fs-6 p-2 px-3 neu-inner-1 rounded-3 text-prim-500"/>
                                            <ErrorMessage error={errors.password}/>
                                        </div>

                                        <div className="w-100 mb-4 d-flex flex-column gap-4">
                                            <PillButtonPrimary onclick={async ()=>{
                                                                    await submitForm();
                                                                }}>
                                                <PillButton.Text value="Log in"/>
                                            </PillButtonPrimary>
                                            
                                            <button className="text-center fw-500 text-prim-400 text-decoration-none bg-transparent"
                                                type="button"
                                                onClick={()=>{
                                                    playAnime("normal");
                                                }}>
                                                <span>I don't have an account</span>
                                                <div className="w-100 d-flex justify-content-center">
                                                    <span className="w-100 mt-1 d-block border border-prim-300"
                                                        style={{
                                                            maxWidth: "120px"
                                                        }}></span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

                <NavLink to="/" className="d-block my-3 px-3 text-white text-decoration-none">
                    <span>
                        Back to Home
                        <div className="d-flex justify-content-start">
                            <span className="w-100 mt-1 d-block border border-white"
                                style={{
                                    maxWidth: "100px"
                                }}></span>
                        </div>
                    </span>
                </NavLink>

                {/* BUBBLES */}
                <span className="bubble d-block position-absolute rounded-circle"></span>
                <span className="bubble__small d-block position-absolute rounded-circle"></span>
            </div>

            <div className="w-auto position-fixed bottom-0 end-0"
                style={{zIndex: "800"}}>
                <Alert onClose={()=>{
                            closeAlert();
                        }}/>
            </div>
        </PageContainer>
    )
}