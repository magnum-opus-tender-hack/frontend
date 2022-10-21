import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Search } from '../сomponents/search'
import 'antd/dist/antd.css';
import { useState } from 'react'
import { TagSearch } from '../сomponents/tagSearch'

const Home: NextPage = () => {
  const [goods, setGoods] = useState([])
  return (
    <div className={styles.container}>
        <Search onData={(data)=>setGoods(data)}></Search>
        <div>{goods}</div>
        <TagSearch  onData={(data)=>setGoods(data)}></TagSearch>
    </div>
  )
}

export default Home;
