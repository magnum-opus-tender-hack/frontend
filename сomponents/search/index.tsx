import React, { useState } from "react";
import { AutoComplete, Input, Tag } from 'antd';
import { fetcher } from "../../pages/api/fetch";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hints, INode, products } from "../../store/reducers/nodesInputReducer";
import { createHints, search } from "../../store/reducers/asyncActions";

export const Search: React.FC<{onData:(data:any)=>void}> = (props) =>{
    const [data, setData] = useState("")
    const [tags, setTags] = useState(new Array<JSX.Element>())
    const [searchOptions, setSearchOptions] = useState(new Array<INode>())
    const dispatch = useAppDispatch();
    const getHints = useAppSelector(hints);
    const [autoCompleteValue, setAutoCompleteValue] = useState("")
    const onChange = (text:string) =>{
        if (text.length >= 3 && text.length%3 == 0){
            
            dispatch(
                createHints({word:text, hints:getHints.length == 0? []: getHints.map((el)=>el.value)})
            )
        }
        setData(text)
    } 
    const addTag = (value:INode) => {
        let color = "red"
        switch((value as any).type ){
            case "Category":
                color = "gold"
                break
            case "Name":
                color = "green"
                break
            case "All":
                color = "gray"
                break
        }

        let tag =   <Tag
                        color={color}
                        closable
                        style={{ marginRight: 3 }}
                        >
                            {value.value.length <13? value.value:value.value.slice(0,10)+"..."}
                        </Tag>
        setTags(tags.concat([tag]))
    }

    const onSelect = (value:string, type:INode) =>{
        addTag(type)
        setSearchOptions(searchOptions.concat([type]))
        setAutoCompleteValue("")

    }

    const onEnter = (value:any) => {
        dispatch(
            search(
                searchOptions.concat(
                    autoCompleteValue.length ?
                    [
                        {
                            'type': 'All',
                            'value': autoCompleteValue
                
                        }
                    ] : []
                )
            )
        )
    }
    return(
        <AutoComplete
            options={getHints.map((el)=>el.value)}
            onSelect={onSelect as any}
            value={autoCompleteValue}
            onChange={(e: any)=>setAutoCompleteValue(e)}
            // onSearch={handleSearch}
        >
            <Input.Search  prefix={tags}
            onChange={(e)=>onChange(e.target.value)} 
            value={data}
            onSearch={(e) => onEnter(e)}
            size="large"
            placeholder="Поиск товара"
            enterButton />
        </AutoComplete>

    );
}