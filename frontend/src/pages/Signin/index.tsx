import "./style.scss";
import { useRef, useEffect } from "react";
import { Field, Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useAnime } from "../../hooks/anime";
import AuthService, { ISignUpClient } from "../../services/auth";
import { useAlert } from "../../hooks/alert/useAlert";
import { AlertType } from "../../store/slices/alert";
import * as Yup from "yup";

// COMPONENTS
import PageContainer from "../../components/PageContainer";
import PillButton from "../../containers/Button/PillButton";
import ErrorMessage from "../../components/Forms/ErrorMessage";
import Alert from "../../components/Alert";
import PillButtonSecondary from "../../components/Button/PillButtonSecondary";

const SignInSchema = Yup.object().shape({
    username: Yup.string()
                .min(6)
                .max(100)
                .required(),
    email: Yup.string()
                .email()
                .matches(/(.*@gmail.com)/, "Must be @gmail.com")
                .required(),
    password: Yup.string()
                .min(8)
                .max(24),
    confirm_password: Yup.string()
                .min(8)
                .max(24)
})

export default function Signin(){
    let navigate = useNavigate();
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
                navigate("/login");
            }
        })
    }, [playAnime, events, navigate])

    async function handleSumbit(user:ISignUpClient){
        try{
            let result = await AuthService.signUp(user);
            let message = result.message;
            let alertType: AlertType = "danger";

            if(result.ok){
                message = "Welcome!";
                alertType = "success";

                setTimeout(()=>{
                    navigate("/");
                }, 2000)
            }

            displayAlert(message, alertType);
        }catch(e){
            displayAlert(
                "Something went wrong, please try again later",
                "danger"
            );
        }
    }

    return (
        <PageContainer showNavbar={false}
                    defSyle={false}
                    className="w-100 p-2 position-relative d-flex flex-column justify-content-center align-items-center overflow-hidden"
                    style={{
                        minHeight: "100vh",
                        background: "linear-gradient(90deg, #38CFFF, #595AFF)"
                    }}>

            <div className="w-100 position-relative" 
                style={{
                    maxWidth: "500px"
                }}>
                <Formik initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            confirm_password: ""
                        } as ISignUpClient}
                        validate={(v)=>{
                            if(v.password !== v.confirm_password){
                                return {
                                    confirm_password: "Las contrasenas no coinciden"
                                }
                            }
                        }}
                        validationSchema={SignInSchema}
                        onSubmit={ handleSumbit }>
                    {({submitForm, errors})=>(
                        <Form>
                            <div className="form__container position-relative"
                                style={{zIndex: "100"}}>
                                <div className="form__wrapper py-2 px-3 px-md-4 rounded-3 neu-drop-1 bg-white"
                                    ref={formRef}>
                                    <div className="form d-flex align-items-center flex-column gap-4">
                                        <header className="w-100 mt-3 border-bottom border-2">
                                            <h1 className="text-center fs-4 text-dark-600">Sign up</h1>
                                        </header>
                                        <div className="w-100 d-flex flex-column">
                                            <label className="ms-3 small text-dark-400">Username</label>
                                            <Field name="username" className="fs-6 p-2 px-3 neu-inner-1 rounded-3 text-prim-500"/>
                                            <ErrorMessage error={errors.username}/>
                                        </div>
                                        <div className="w-100 d-flex flex-column">
                                            <label className="ms-3 small text-dark-400">Email</label>
                                            <Field type="email" name="email" className="fs-6 p-2 px-3 neu-inner-1 rounded-3 text-prim-500"/>
                                            <ErrorMessage error={errors.email}/>
                                        </div>
                                        <div className="w-100 d-flex flex-column">
                                            <label className="ms-3 small text-dark-400">Password</label>
                                            <Field name="password" className="fs-6 p-2 px-3 neu-inner-1 rounded-3 text-prim-500"/>
                                            <ErrorMessage error={errors.password}/>
                                        </div>
                                        <div className="w-100 d-flex flex-column">
                                            <label className="ms-3 small text-dark-400">Confirm Password</label>
                                            <Field name="confirm_password" className="fs-6 p-2 px-3 neu-inner-1 rounded-3 text-prim-500"/>
                                            <ErrorMessage error={errors.confirm_password}/>
                                        </div>

                                        <div className="w-100 mb-4 d-flex flex-column gap-4">
                                            <PillButtonSecondary onclick={async () => { await submitForm() }}>
                                                <PillButton.Text value="Sign up"/>
                                            </PillButtonSecondary>
                                            
                                            <button className="text-center fw-500 text-cs-400 text-decoration-none bg-transparent"
                                                type="button"
                                                onClick={()=>{
                                                    playAnime("normal");
                                                }}>
                                                <span>I have an account</span>
                                                <div className="w-100 d-flex justify-content-center">
                                                    <span className="w-100 mt-1 d-block border border-cs-400"
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

            {/* ALERT */}
            <div className="w-auto position-fixed bottom-0 end-0"
                style={{zIndex: "800"}}>
                <Alert delayToClose={3000}
                        onClose={()=>{
                            closeAlert();
                        }}/>
            </div>
        </PageContainer>
    )
}