import { Card } from "antd";
import React from "react";
import { useAppSelector } from "../../hooks";
import { fetcher } from "../../pages/api/fetch";
import { products } from "../../store/reducers/nodesInputReducer";
import { ProductCard } from "../card";
import styles from "../card/card.module.css"

export const ProductsView:React.FC = () =>{
    const getProducts =  useAppSelector(products)
    return(
        <div className={styles.productWrapper}>
            {
                getProducts.map(el=> <ProductCard {...el}></ProductCard>)
            }

        </div>
    );
}