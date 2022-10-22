import React, { useState } from "react";
import { AutoComplete, Input, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createNode, deleteNode, hints, INode, nodes, products } from "../../store/reducers/nodesInputReducer";
import { createHints, search } from "../../store/reducers/asyncActions";


export const Search: React.FC<{onData:(data:any)=>void}> = (props) =>{
    const [data, setData] = useState("")
    const [tags, setTags] = useState(new Array<JSX.Element>())
    const dispatch = useAppDispatch();
    const getNodes = useAppSelector(nodes);
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
                        onClose={() => {
                            dispatch(
                                deleteNode(value.value)
                            )
                        }}
                        >
                            {value.value.length <13? value.value:value.value.slice(0,10)+"..."}
                        </Tag>
        setTags(tags.concat([tag]))
    }

    const onSelect = (value:string, type:INode) =>{
        addTag(type)
        dispatch(createNode(type));
        setAutoCompleteValue("")

    }

    const onEnter = (value:any) => {
        dispatch(
            search(
                getNodes.concat(
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

    if (autoCompleteValue.endsWith('  ')) {
        dispatch(
            createNode({
                type: "All",
                value: autoCompleteValue.slice(0, autoCompleteValue.length-2)
            })
        )
        addTag({
            type: "All",
            value: autoCompleteValue.slice(0, autoCompleteValue.length-2)
        })
        setAutoCompleteValue('');
    }
    return(
        <AutoComplete
            options={getHints.map((e) => {
                const pre_str = e.value.value.slice(0, e.coordinate)
                const after_str = e.value.value.slice(e.coordinate+autoCompleteValue.length, e.value.value.length)
                const bold_str = e.value.value.slice(e.coordinate, e.coordinate+autoCompleteValue.length)
                return {
                    label: <div>
                        <span>{pre_str}</span>
                        {bold_str.toLocaleLowerCase () == autoCompleteValue.toLowerCase() ? <strong>{bold_str}</strong> : <span>{bold_str}</span>}
                        <span>{after_str}</span>
                    </div>,
                    value: e.value.value
                }
            })}
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