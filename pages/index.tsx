import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Search } from '../сomponents/search'
import 'antd/dist/antd.css';
import { useState } from 'react'
import { TagSearch } from '../сomponents/tagSearch'
import {useAppDispatch, useAppSelector} from '../hooks';
import {search, createHints} from '../store/reducers/asyncActions';
import {products, hints, INode} from '../store/reducers/nodesInputReducer'
import { ProductsView } from '../сomponents/ProductsView'

const Home: NextPage = () => {
  const [goods, setGoods] = useState([]);
  const dispatch = useAppDispatch();
  const getProducts = useAppSelector(products);
  const getHints = useAppSelector(hints);

  // if (getHints.length == 0) {
  //   dispatch(
  //       createHints({word:"сап", hints: [] as INode[]})
  //   )
  // }
  // console.log(getHints) 

  // if (getProducts.length == 0) {
  //   dispatch(
  //       search([
  //           {
  //               'type': 'Name',
  //               'value': 'Сапоги'
  //           }
  //       ])
  //     )
  // }
  // console.log(getProducts)
// - вызов поиска
//

  return (
    <div className={styles.container}>
        <Search onData={(data)=>setGoods(data)}></Search>
        {
          getProducts.length == 0? null:<ProductsView></ProductsView>
        }
        
    </div>
  )
}

export default Home
