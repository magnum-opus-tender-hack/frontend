import { Card } from "antd";
import React from "react";
import { useAppSelector } from "../../hooks";
import { fetcher } from "../../pages/api/fetch";
import { products } from "../../store/reducers/nodesInputReducer";

export const ProductsView:React.FC = () =>{
    const getProducts =  useAppSelector(products)
    console.log("Продукты", getProducts)
    return(
        <div>
            {
                getProducts.map(el=> <Card title={el.name} bordered={true}>
                        <div>
                            {el.score}
                        </div>
                        <div>
                            {
                               el.characteristic == undefined? "":el.characteristic.map(e=><div><div>{e.name}</div><div>{e.value}</div></div>)
                            }
                        </div>
                        <div onClick={()=>fetcher.post("/score/"+el.id)}>Посмотреть</div>
                </Card>)
            }

        </div>
    );
}