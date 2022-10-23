import { NextPage } from "next";
import { MyHeader } from "../сomponents/header";
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';


const AboutUs: NextPage = () => {

  
    return (
      <div className={styles.aboutContainer}>
          <MyHeader></MyHeader>
          <div className={styles.h1}>
            Наша команда
          </div>
          <div className={styles.imgWrapper}>
                <img className={styles.img} src="/member1.png"></img>
                <img className={styles.img} src="/member2.png"></img>
                <img className={styles.img} src="/member3.png"></img>
                <img className={styles.img} src="/member5.png"></img>
          </div>
          
      </div>
    )
  }
  
  export default AboutUs;