import { Card } from "antd";
import React from "react";
import { useAppSelector } from "../../hooks";
import { products } from "../../store/reducers/nodesInputReducer";

export const ProductsView:React.FC = () =>{
    const getProducts =  useAppSelector(products)
    console.log(getProducts)
    return(
        <div>
            {
                getProducts.map(el=> <Card title={el.name} bordered={true}>
                        <div>
                            {el.category}
                        </div>
                        <div>
                            {
                               el.characteristics == undefined? "":el.characteristics.toString()
                            }
                        </div>
                </Card>)
            }

        </div>
    );
}