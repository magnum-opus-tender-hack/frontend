import React, { useState } from "react";
import { fetcher } from "../../pages/api/fetch";
import { IProduct } from "../../store/reducers/nodesInputReducer";
import styles from "./card.module.css"


export const ProductCard: React.FC<IProduct> = (props) =>{
    const [opened, setOpened] = useState(false)

    const onClick = () =>{
        setOpened(true)
        fetcher.post("/score/" + props.id)
    }
    return(
        props.characteristic == undefined? null:
        <div  className={styles.card}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.prWrap}>
                <div className={styles.score}> <span className={styles.red}>{props.score}</span> прсмотров</div>
                <div className={styles.characteristic}> <span className={styles.blue}>{props.characteristic.length}</span> характеристик</div>
            </div>
            <div className={styles.id}>ID:{props.id}</div>
            <div onClick={()=>onClick()} className={styles.aboutBtn}>Подробнее</div>
            {opened?
                <div className={styles.filter}>
                    <div  className={styles.popup}>
                        <div className={styles.cross} onClick={()=>setOpened(false)}>+</div>
                        <div className={styles.h1}>{props.name}</div>
                        <div className={styles.charWrap}>
                            <div className={styles.score}> <span className={styles.red}>{props.score}</span> прсмотров</div>
                            <div className={styles.id}>ID:{props.id}</div>
                            <div className={styles.characteristic}> <span className={styles.blue}>{props.characteristic.length}</span> характеристик</div>
                            {
                                props.characteristic.map(el=><div className={styles.prWrap}> 
                                    <div className={styles.name}>{el.name}:</div>
                                    <div>{el.value}</div>
                                </div>)
                            }
                        </div>
                    </div>
                </div> : null
            }
        </div>
    );
}