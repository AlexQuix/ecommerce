import "./style.scss";
import { Field, Formik, Form } from "formik";
import { AlertType } from "../../../../components/Alert";
import ClientService from "../../../../services/client";

import Modal from "../../../../containers/Modal";
import PillButton from "../../../../containers/Button/PillButton";
import PillButtonDanger from "../../../../components/Button/PillButtonDanger";

type Props = {
    direction: string;
    alert: (message:string, type:AlertType)=>void;
}

export default function RemoveDirection({ direction, alert }:Props){
    async function handleSubmit(){
        let res = await ClientService.removeDirection(direction);
        alert(res.message, res.ok? "success" : "danger" );
    }

    return (
        <Modal>
            <Modal.ShowButton>
                <div className="mb-0 text-prim-400 cursor-pointer">{direction}</div>
            </Modal.ShowButton>
            <Modal.Content bg="rgba(255,255,255,0.9)">
                <Formik initialValues={{ data: direction }}
                        onSubmit={ handleSubmit }>
                    {({submitForm})=>(
                        <Form className="model-form w-100 p-4 bg-white rounded-3 position-relative neu-drop-dark-1">
                            <Modal.CloseButton />

                            <div className="flex-grow-1 mt-5">
                                <h1 className="fs-6 fw-400 ms-2 mb-2 text-dark-400">Address</h1>
                                <Field name="data" className="w-100 p-2 rounded-3 text-dark-700 neu-inner-1"/>
                                <div className="mt-3 d-flex flex-column flex-sm-row gap-3">
                                    <PillButtonDanger onclick={async ()=>{
                                                        await submitForm();
                                                    }}>
                                        <PillButton.Text value="Delete"/>
                                    </PillButtonDanger>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Content>
        </Modal>
    )
}