import { useAlert } from "../../../../hooks/alert/useAlert";
import { IClient } from "../../../../services/client";
import { useNavigate } from "react-router-dom";
import { deleteTokenCookie } from "../../../../utils/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../store/slices/user";

import Alert from "../../../../components/Alert";
import PageContainer from "../../../../components/PageContainer";
import BackNavigation from "../../../../components/BackNavigation";
import PillButton from "../../../../containers/Button/PillButton";
import PillButtonDanger from "../../../../components/Button/PillButtonDanger";
import RemoveDirection from "../../components/RemoveDirection";
import Username from "../../components/Username";
import AddDirection from "../../components/AddDirection";

type Props = {
    client: IClient;
}

export default function Page({client}:Props){
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { displayAlert, closeAlert } = useAlert();

    return (
        <PageContainer>
            <div className="mx-auto mt-sm-4" style={{maxWidth: "640px"}}>
                <header className="border-bottom pb-2 d-flex align-items-center">
                    <BackNavigation />
                    <h1 className="fs-3 mb-0 pe-3 ps-2 text-dark-700">Account</h1>
                </header>

                <div className="container-fluid mt-4 px-0 px-sm-5 d-flex flex-column gap-4">
                    <div className="flex-grow-1 neu-inner-1 p-2 rounded-3">
                        <Username username={client.user.username}
                                alert={displayAlert}/>
                    </div>
                    {/* EMAIL */}
                    <div className="flex-grow-1 neu-inner-1 p-2 rounded-3">
                        <h1 className="mb-1 ms-2 fs-6 text-dark-400">Email</h1>
                        <div className="px-2">
                            <p className="ms-1 mb-0 text-dark-700">{client.user.email}</p>
                        </div>
                    </div>
                    {/* DIRECTION */}
                    <div className="flex-grow-1 neu-inner-1 p-2 rounded-3">
                        <div className="px-2 d-flex justify-content-between align-items-center">
                            <h1 className="w-100 mb-2 fs-6 text-dark-400">Address</h1>
                            <AddDirection alert={displayAlert}/>
                        </div>
                        <div className="d-flex flex-column p-2 gap-3">
                            { client.directions.length < 1
                                ? <span className="text-center text-dark-500">You haven't added an address yet</span>
                                : client.directions.map((direction, i)=>(
                                    <div key={i} className="d-flex p-2 neu-drop-1 rounded-3">
                                        <RemoveDirection direction={direction}
                                                        alert={displayAlert}/>
                                    </div>))
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-3">
                        <div className="w-100 flex-grow-1 mb-2">
                            <PillButtonDanger onclick={async ()=>{
                                                deleteTokenCookie();
                                                dispatch(userActions.reset);
                                                navigate("/login");
                                            }}>
                                <PillButton.Text value="Log out"/>
                            </PillButtonDanger>
                        </div>
                    </div>
                </div>
            </div>

            {/* GLOBAL ALERT */}
            <div className="position-fixed bottom-0 end-0"
                style={{ zIndex: 830 }}>
                <Alert delayToClose={3000}
                        onClose={()=>{
                            closeAlert();
                        }}/>
            </div>
        </PageContainer>
    )
}