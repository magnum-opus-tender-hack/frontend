import { Card } from "antd";
import React from "react";
import { useAppSelector } from "../../hooks";
import { products } from "../../store/reducers/nodesInputReducer";

export const ProductsView:React.FC = () =>{
    const getProducts =  useAppSelector(products)
    console.log(getProducts)
    return(
        <div>
            <Card title="Card title" bordered={false}>
                    Card content
            </Card>
        </div>
    );
}