import { Formik, Form } from "formik";
import { minDevice } from "../../../../utils";
import { DEVICE_WIDTH, currentDevice } from "../../../../hooks";
import { IProduct } from "../../../../services/product";
import { useAlert } from "../../../../hooks/alert/useAlert";
import ClientService, { IClient } from "../../../../services/client";

import PopoverGallery from "../PopoverGallery";
import FavoriteButton from "../../../../components/Button/FavoriteButton";
import PageContainer from "../../../../components/PageContainer";
import Quantity from "../../../../components/Forms/Quantity";
import PillButtonPrimary from "../../../../components/Button/PillButtonPrimary";
import PillButtonSecondary from "../../../../components/Button/PillButtonSecondary";
import BackNavigation from "../../../../components/BackNavigation";
import Accordion from "../../../../containers/Accordion";
import Galleries from "../../../../components/Galleries";
import PillButton from "../../../../containers/Button/PillButton";
import Alert from "../../../../components/Alert";
import LabelColor from "../../../../components/LabelColor";

type Props = {
    product: IProduct
    user: IClient | null;
}

export default function Page({product, user}:Props){
    let { displayAlert, closeAlert } = useAlert();

    async function addProductToShoppingCart(quantity:number){
        let res = await ClientService.addProductToShoppingCart(product._id, quantity);
        displayAlert(
            res.message,
            res.ok ? "success" : "danger"
        )
    }

    return (
        <PageContainer showNavbar={minDevice(currentDevice(), DEVICE_WIDTH.TABLET)}
                        className="pt-0 pt-md-3"
                        style={{overflowX: "hidden"}}>
            <PopoverGallery collection={product.img_galleries}
                            main={product.main_img}/>

            <header className="py-2 mb-3 position-sticky position-md-relative top-0 bg-dark-000" 
                style={{zIndex: "750"}}>
                <div className="w-100 gap-2 pb-3 border-bottom">
                    <div className="w-auto align-self-start mb-3 mb-sm-0">
                        <BackNavigation />
                    </div>

                    <div className="d-flex align-items-center ">
                        <h1 className="fs-4 text-dark-900 mb-0">{product.product_name}</h1>
                        <div className="ms-auto neu-drop-1 rounded-3">
                            <FavoriteButton isFavorite={
                                                user 
                                                    ? user.favorites.some( p => p as any === product._id )
                                                    : false
                                            }
                                            productId={product._id}/>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row gap-5 gap-md-0 gap-lg-4 justify-content-center position-relative">
                    {/* GALLERIES */}
                    <div className="col-12 col-md-6 col-lg-5 col-xl-4 position-relative">
                        <div className="ps-0 ps-md-3 position-sticky top-0">
                            <Galleries main={product.main_img}
                                        collection={product.img_galleries}/> 
                        </div>
                    </div>                

                    <div className="col-12 col-md-6 ps-md-4">
                        <h1 className="text-start fs-3 fw-500 text-dark-700 mb-4">
                            ${new Intl.NumberFormat("en-US").format(product.price)}
                        </h1>

                        {/* DESCRIPTION */}
                        <div className="mb-5">
                            <Accordion>
                                <Accordion.Header>
                                    <h1 className="text-dark-400 fs-5">Description</h1>
                                </Accordion.Header>

                                <p className="mb-0 text-dark-700">{product.description}</p>
                            </Accordion>
                        </div>

                        {/* SPECIFICATIONS */}
                        
                        { 
                            product.specifications.length > 0
                                ? (
                                    <div className="mb-5">
                                        <Accordion>
                                            <Accordion.Header>
                                                <h1 className="text-dark-400 fs-5">Specifications</h1>
                                            </Accordion.Header>

                                            <ul>
                                                {product.specifications.map((s)=>(
                                                    <li>{s.description}</li>
                                                ))}
                                            </ul>
                                        </Accordion>
                                    </div>)
                                : <></>
                        }
                        
                        <Formik initialValues={{
                                    color: [ ],
                                    quantity: 1
                                }}
                                onSubmit={()=>{
                                    
                                }}>
                            {({values, setValues})=>(
                                <Form>
                                    {/* COLORS */}
                                    <div className="w-100 mb-5 border-bottom pb-1">
                                        <div className="d-flex justify-content-between gap-3">
                                            <h1 className="text-dark-400 fs-5">Colors</h1>
                                            <div className="d-flex gap-2">
                                                {product.colors.map((c, i)=>(
                                                    <LabelColor key={i}
                                                                background={(c as any).color}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* QUANTITY */}
                                    <div className="w-100 mb-4 border-bottom pb-2">
                                        <div className="d-flex justify-content-between align-items-center gap-3">
                                            <h1 className="text-dark-400 fs-5">Quantity</h1>
                                            <div className="d-flex flex-row-reverse align-items-center gap-2">
                                                <Quantity value={values.quantity}
                                                            onRest={()=>{
                                                                let newQuantity = values.quantity - 1;
                                                                setValues({...values, quantity: newQuantity})
                                                            }}
                                                            onAdd={()=>{
                                                                let newQuantity = values.quantity + 1;
                                                                setValues({...values, quantity: newQuantity})
                                                            }}/>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="w-100 position-fixed bottom-0 start-0 position-md-relative p-2 px-md-0 bg-dark-000 neu-drop-dark-2 neu-md-none">
                                        <div className="w-100 d-flex gap-sm-3">
                                            <PillButtonSecondary onclick={async ()=>{
                                                                    await addProductToShoppingCart(values.quantity);
                                                                }}>
                                                <PillButton.Icon>
                                                    <svg width="249" height="218" viewBox="0 0 249 218" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M63 200C63.4 190.4 69.5002 185 78 185C87.0002 185 93.0002 192.5 93.0002 200C93.0002 207.5 86.5002 215 78.0002 215C69.0002 215 63 208.5 63 200Z" 
                                                                strokeWidth="20"/>
                                                        <path d="M176 200C176.4 190.4 182.5 185 191 185C200 185 206 192.5 206 200C206 207.5 199.5 215 191 215C182 215 176 208.5 176 200Z" 
                                                                strokeWidth="20"/>
                                                        <path d="M5 7.13458C21.6667 2.13458 55.3 2.73457 56.5 45.1346M56.5 45.1346H244.5L220.5 113.635L76.5 141.635M56.5 45.1346L76.5 141.635M76.5 141.635C71 146.801 63.3 157.735 76.5 160.135L210.5 162.135" 
                                                                strokeWidth="20" 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round"/>
                                                    </svg>
                                                </PillButton.Icon>
                                                <PillButton.Text value="Add"/>
                                            </PillButtonSecondary>

                                            <PillButtonPrimary onclick={async ()=>{
                                                                    displayAlert("You have buy an product", "success");
                                                                }}>
                                                <PillButton.Icon>
                                                    <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.04412 0.5C2.23677 0.5 1.46248 0.820021 0.891602 1.38966C0.320719 1.9593 0 2.7319 0 3.5375V24.4625C0 25.2681 0.320719 26.0407 0.891602 26.6103C1.46248 27.18 2.23677 27.5 3.04412 27.5H13.1912C13.9936 27.5 14.7636 27.1839 15.3337 26.6204C15.9038 26.0569 16.2278 25.2915 16.2353 24.4909V22.4389C16.2353 22.1703 16.1284 21.9128 15.9381 21.7229C15.7478 21.533 15.4897 21.4263 15.2206 21.4263C14.6064 21.4263 14.2194 21.2603 13.9529 21.0457C13.6715 20.8202 13.4388 20.4719 13.2629 19.9805C12.8935 18.9613 12.8529 17.618 12.8529 16.3625C12.8529 16.1059 12.7552 15.8588 12.5796 15.6713L12.3578 15.4324C12.2848 15.351 12.208 15.273 12.1278 15.1988C12.0276 15.1043 11.7219 14.8141 10.5259 13.622C9.8927 12.9889 9.54094 12.4543 9.42594 12.0452C9.37983 11.9034 9.37282 11.7519 9.40565 11.6065C9.45612 11.4387 9.55156 11.2879 9.68165 11.1704C9.79899 11.0407 9.94963 10.9455 10.1173 10.895C10.2627 10.8627 10.4141 10.8702 10.5556 10.9166C10.9656 11.0313 11.5014 11.3837 12.1359 12.0169C12.8665 12.7459 13.5592 13.429 14.1802 14.0419C15.2084 15.0571 16.0391 15.8778 16.5072 16.3773C16.6908 16.5739 16.945 16.6897 17.2141 16.6992C17.4832 16.7087 17.745 16.6111 17.942 16.428C18.139 16.2448 18.255 15.9911 18.2646 15.7226C18.2741 15.4541 18.1763 15.1929 17.9928 14.9963C17.4164 14.3953 16.8301 13.8039 16.2339 13.2224V8.681L20.079 12.5177C20.6499 13.0874 20.9706 13.8596 20.9706 14.6642V26.4875C20.9706 26.756 21.0775 27.0136 21.2678 27.2034C21.4581 27.3933 21.7162 27.5 21.9853 27.5C22.2544 27.5 22.5125 27.3933 22.7028 27.2034C22.8931 27.0136 23 26.756 23 26.4875V14.6656C23.0001 14.0007 22.869 13.3423 22.6141 12.728C22.3592 12.1137 21.9856 11.5555 21.5145 11.0854L16.2353 5.81765V3.53615C16.2349 2.73079 15.9141 1.95854 15.3432 1.38919C14.7724 0.819836 13.9983 0.5 13.1912 0.5H3.04412ZM12.6811 22.6238C13.1263 22.9791 13.6484 23.2259 14.2059 23.3447V23.45H13.1912C12.9221 23.45 12.664 23.5567 12.4737 23.7466C12.2834 23.9364 12.1765 24.194 12.1765 24.4625V25.475H10.1471V24.4625C10.1471 23.257 10.8506 22.2148 11.8721 21.7247C12.0885 22.0541 12.3551 22.3619 12.6811 22.6238ZM10.8249 16.7621C10.8276 17.1036 10.8357 17.4722 10.856 17.8556C10.226 18.3009 9.49649 18.5857 8.73096 18.6852C7.96543 18.7848 7.18712 18.6961 6.46381 18.4268C5.7405 18.1576 5.09414 17.7159 4.58102 17.1404C4.06789 16.5648 3.70358 15.8728 3.5198 15.1246C3.33602 14.3765 3.33836 13.5948 3.5266 12.8477C3.71485 12.1006 4.08329 11.4108 4.59984 10.8383C5.11639 10.2659 5.76538 9.82807 6.49028 9.56312C7.21519 9.29817 7.99402 9.21409 8.75894 9.3182C8.57765 9.43835 8.40718 9.57875 8.24618 9.7394C7.85112 10.1336 7.57106 10.5899 7.43982 11.1029C7.30723 11.6159 7.33971 12.1208 7.47229 12.5933C7.72935 13.5019 8.372 14.3362 9.09176 15.0544C9.64245 15.6101 10.2004 16.1587 10.7654 16.7L10.7708 16.7041L10.8195 16.7567L10.8249 16.7621ZM4.05882 2.525H6.08824V3.5375C6.08824 4.3431 5.76752 5.11569 5.19663 5.68534C4.62575 6.25498 3.85147 6.575 3.04412 6.575H2.02941V4.55H3.04412C3.31323 4.55 3.57133 4.44333 3.76162 4.25345C3.95192 4.06357 4.05882 3.80603 4.05882 3.5375V2.525ZM10.1471 2.525H12.1765V3.5375C12.1765 4.0964 12.6311 4.55 13.1912 4.55H14.2059V6.575H13.1912C12.3838 6.575 11.6095 6.25498 11.0387 5.68534C10.4678 5.11569 10.1471 4.3431 10.1471 3.5375V2.525ZM6.08824 25.475H4.05882V24.4625C4.05882 24.194 3.95192 23.9364 3.76162 23.7466C3.57133 23.5567 3.31323 23.45 3.04412 23.45H2.02941V21.425H3.04412C3.85147 21.425 4.62575 21.745 5.19663 22.3147C5.76752 22.8843 6.08824 23.6569 6.08824 24.4625V25.475Z" 
                                                            fill="#F0F0FF"/>
                                                    </svg>
                                                </PillButton.Icon>
                                                <PillButton.Text value="Buy"/>
                                            </PillButtonPrimary>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <div className="position-fixed bottom-0 end-0">
                <Alert onClose={()=>{
                            closeAlert();
                        }}
                        delayToClose={3000}/>
            </div>
        </PageContainer>
    )
}