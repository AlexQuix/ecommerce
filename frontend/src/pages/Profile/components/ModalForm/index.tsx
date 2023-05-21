import "./style.scss";
import { Field, Formik, Form } from "formik";

import Modal from "../../../../containers/Modal";
import PillButtonPrimary from "../../../../components/Button/PillButtonPrimary";
import EditButton from "../../../../components/Button/EditButton";
import PillButton from "../../../../containers/Button/PillButton";

type Props = {
    title: string;
    formTitle: string;
    value: string;
    onSubmit: (values:{value:string})=>void;
}

export default function ModalForm({title, value, formTitle, onSubmit}:Props){
    return (
        <Modal>
            <div className="d-flex justify-content-between align-items-center">
                <div className="position-relative">
                    <h1 className="mb-1 ms-2 fs-6 text-dark-400">{title}</h1>
                    <div className="px-2 justify-content-between d-flex">
                        <p className="ms-1 mb-0 text-dark-700">{value}</p>
                    </div>
                </div>
                <div className="position-relative">
                    <Modal.ShowButton>
                        <EditButton />
                    </Modal.ShowButton>
                </div>
            </div>
            
            <Modal.Content bg="rgba(255,255,255,0.9)">
                <Formik initialValues={{ value }}
                        onSubmit={onSubmit}>
                    {({submitForm})=>(
                        <Form className="model-form w-100 p-4 bg-white rounded-3 position-relative neu-drop-dark-1">
                            <Modal.CloseButton />

                            <div className="flex-grow-1 mt-5">
                                <h1 className="fs-6 fw-400 ms-2 mb-2 text-dark-400">{formTitle}</h1>
                                <Field name="value" className="w-100 p-2 rounded-3 text-dark-700 neu-inner-1"/>
                                <div className="mt-3 d-flex flex-column gap-3">
                                    <PillButtonPrimary onclick={async ()=>{ await submitForm() }}>
                                        <PillButton.Text value="Save"/>
                                    </PillButtonPrimary>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Content>
        </Modal>
    )
}