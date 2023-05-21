import { IProduct } from "../../../../services/product"

import PageContainer from "../../../../components/PageContainer";
import Mosaic from "../../../../containers/Mosaic";
import LineCardFavorite from "../../../../components/Card/LineCardFavorite";
import Card from "../../../../containers/Card/SquareCard";
import BackNavigation from "../../../../components/BackNavigation";
import EmptyFavorite from "../../../../components/ErrorMessage/EmptyFavorite";


type Props = {
    products: IProduct[];
}

export default function Page({products}:Props){
    return (
        <PageContainer>
            <Mosaic initialMode="line">
                <div className="w-100 d-flex justify-content-center">
                    <div className="page__wrapper w-100">
                        <header className="container-fluid position-sticky top-0 px-0 mb-3 bg-white mb-sm-4 border-bottom border-2"
                                style={{zIndex: "750"}}>
                            <div className="d-flex align-items-center py-2 gap-2">
                                <BackNavigation />
                                <h1 className="fs-5 fs-sm-4 fw-400 text-dark-600 m-0">
                                    Favorites <span className="fw-500 text-dark-700">({products.length})</span>
                                </h1>
                                
                                <div className="ms-auto">
                                    <Mosaic.Button />
                                </div>
                            </div>
                        </header>

                        <div className="page__mosaic container-fluid px-0">
                            { products.length > 0 
                                ? ( <Mosaic.Content>
                                        {({mode})=>{
                                            return products.map((p)=>{
                                                if(mode === "line"){
                                                    return (
                                                        <LineCardFavorite key={p._id}
                                                                            isFavorite={true}
                                                                            product={p}/>
                                                    )
                                                }
                                            
                                                return (
                                                    <Card key={p._id}
                                                            product={p}
                                                            isFavorite={true}
                                                            width="100%"
                                                            maxWidth="100%"/>
                                                )
                                            })
                                        }}
                                    </Mosaic.Content> )
                                : <EmptyFavorite imgMaxWidth="200px"/>
                            }
                        </div>
                    </div>
                </div>
            </Mosaic>
        </PageContainer>
    )
}