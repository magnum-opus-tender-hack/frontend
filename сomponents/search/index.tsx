import React, { useState } from "react";
import { Input } from 'antd';
import axios from "axios";
import { fetcher } from "../../pages/api/fetch";

export const Search: React.FC<{onData:(data:any)=>void}> = (props) =>{
    const [data, setData] = useState("")

    const onEnter = (value:any) => {
        fetcher.post("/search", {body:value}).then((response)=>{
            console.log(response)
            props.onData(response.data)
            }
        )
    }
    return(
        <Input.Search value={data} onSearch={(e)=>onEnter(e)} onChange={(e)=>setData(e.target.value)} size="large" placeholder="Поиск товара" enterButton />

    );
}