import { AlertType } from "../../../../components/Alert";
import { Field, Formik, Form } from "formik";
import ClientService from "../../../../services/client";

import AddButton from "../../../../components/Button/AddButton";
import Modal from "../../../../containers/Modal";
import PillButtonPrimary from "../../../../components/Button/PillButtonPrimary";
import PillButton from "../../../../containers/Button/PillButton";

type Props = {
    alert: (message:string, type:AlertType)=>void;
}

export default function AddDirection({alert}:Props){
    
    async function handleSubmit(value:{direction:string}){
        let res = await ClientService.addDirection(value.direction);
        let type:AlertType = res.ok ? "success" : "danger";
        alert(res.message, type);
    }

    return (
        <div className="position-relative">
            <Modal>
                <Modal.ShowButton>
                    <AddButton />
                </Modal.ShowButton>
                <Modal.Content bg="rgba(255,255,255,0.9)">
                    <Formik initialValues={{ direction: "" }}
                            onSubmit={ handleSubmit }>
                        {({submitForm})=>(
                            <Form className="model-form w-100 p-4 bg-white rounded-3 position-relative neu-drop-dark-1">
                                <Modal.CloseButton />

                                <div className="flex-grow-1 mt-5">
                                    <h1 className="fs-6 fw-400 ms-2 mb-2 text-dark-400">Address</h1>
                                    <Field name="direction" className="w-100 p-2 rounded-3 text-dark-700 neu-inner-1"/>
                                    
                                    <div className="mt-3 d-flex flex-column flex-sm-row gap-3">
                                        <PillButtonPrimary onclick={async ()=>{
                                                                await submitForm();
                                                            }}>
                                            <PillButton.Text value="Save"/>
                                        </PillButtonPrimary>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Content>
            </Modal>
        </div>
    )
}