import { NextPage } from "next";
import { MyHeader } from "../сomponents/header";
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';


const AboutProject: NextPage = () => {

  
    return (
      <div className={styles.aboutProjectContainer}>
          <MyHeader></MyHeader>
          <div className={styles.h1}>
            О проекте
          </div>
          <div>
                <div className={styles.h2}>Ссылки</div>
                <div>Demo: <a href="">Скоро будет!</a></div>
                <div>GitHub: <a  href="https://github.com/magnum-opus-tender-hack">https://github.com/magnum-opus-tender-hack</a></div>
                <div>Frontend: <a  href="https://github.com/magnum-opus-tender-hack/frontend">https://github.com/magnum-opus-tender-hack/frontend</a></div>
                <div>Backend: <a  href="https://github.com/magnum-opus-tender-hack/backend">https://github.com/magnum-opus-tender-hack/backend</a></div>
                <div>Презентация: <a  href="">Скоро будет!</a></div>
          </div>
          <div>
                <div className={styles.h2}>Описание</div>
                <div>
                    Наша идея решения заключается в том чтобы максимально упростить когнитивную нагрузку
                    на поиск в целом, сведя весь фокус в одну поисковую строку. Пользователю достаточно
                    просто начать вводить информацию о продукте в поисковой строке, наша система сама начнет
                    его дополнять и предлагать варианты. К тому же реализовано автоматическое определение 
                    сорта высказывания. Например автоматическое определение что пользователь начинает
                    вводить название продукта или его категорию. Также автоматически определяться могут
                    категории из необработанной части базы данных - поля из Характеристик в выданном нам
                    excel файле
                </div>
          </div>
          
      </div>
    )
  }
  
  export default AboutProject;