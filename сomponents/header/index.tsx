import Link from "next/link";
import React from "react"
import styles from "./header.module.css"

export const MyHeader:React.FC = () =>{
    return(
        <div className={styles.header}>
            <div className={styles.link}><Link  href="/">Главная</Link></div>
            <div className={styles.link}><Link  className={styles.link}  href="/about-us">О нас</Link></div>
            <div className={styles.link}><Link  className={styles.link}  href="/about-project">О проекте</Link></div>
        </div>
    );
}