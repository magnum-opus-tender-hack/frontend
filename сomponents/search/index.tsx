import React, { useState } from "react";
import { AutoComplete, Input, Tag, Tooltip } from 'antd';
import { InputNumber, Popover, Radio } from 'antd';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createNode, deleteNode, hints, INode, loading, nodes, products, setLoading } from "../../store/reducers/nodesInputReducer";
import { createHints, search } from "../../store/reducers/asyncActions";
import styles from "./search.module.css"

import {CalculatorOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';


function parse_types(type: string) {
    if (type == 'Name') return 'Наименование'
    if (type == 'Category') return 'Категория'
    return type;
}

export const Search: React.FC<{onData:(data:any)=>void}> = (props) =>{
    const [data, setData] = useState("")
    const [tags, setTags] = useState(new Array<JSX.Element>())
    const dispatch = useAppDispatch();
    const getNodes = useAppSelector(nodes);
    const getProducts = useAppSelector(products);
    const getHints = useAppSelector(hints);
    const getLoading = useAppSelector(loading)
    const [disableInput, setDisableInput] = useState(false)
    const [autoCompleteValue, setAutoCompleteValue] = useState("")
    const onChange = (text:string) =>{
        if (text.length >= 3 && text.length%2 == 0){
            dispatch(
                createHints({word:text, hints:getHints.length == 0? []: getHints.map((el)=>el.value)})
            )
        }
        setData(text)
    } 
    const addTag = (value:INode) => {
        let color = "red"

        switch(value.type){
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
        
        if (value.type.split("_")[1] == "numeric"){
            let popver = <div className={styles.popover}>
                <div>{value.type.split("_")[0]}</div>
                <Radio.Group defaultValue="=" size="small">
                    <Radio.Button value=">=">≥</Radio.Button>
                    <Radio.Button value="=">=</Radio.Button>
                    <Radio.Button value="<=">≤</Radio.Button>
                </Radio.Group>
                <InputNumber autoFocus  onClick={()=>setDisableInput(true)} size="small" min={1} max={100000} defaultValue={100}/>

            </div>

            tag =   <Popover onOpenChange={(e)=> e?null:setDisableInput(false)} content={popver} title="Задать значение">
                    <Tag
                        color={"cyan"}
                        closable
                        style={{ marginRight: 3 }}
                        onClose={() => {
                            dispatch(
                                deleteNode(value.value)
                            )
                        }}
                        >
                            <CalculatorOutlined></CalculatorOutlined>
                            {value.value.length < 13? value.value:value.value.slice(0,10)+"..."}
                        </Tag>
            </Popover>
        }
        
        setTags(tags.concat([tag]))
    }

    const onSelect = (value:string, type:any) =>{
        const vts = value.split('--');
        addTag({
            'type': vts[1],
            'value': vts[0]
        })

        dispatch(createNode({
            'type': vts[1],
            'value': vts[0]
        }));
        setAutoCompleteValue("")

    }

    const onEnter = (value:any) => {
        console.log(getNodes);
        dispatch(setLoading(true))
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
            autoFocus={false}
            onBlur={()=>null}
            disabled={disableInput}
            options={getHints.map((e) => {
                const pre_str = e.value.value.slice(0, e.coordinate)
                const after_str = e.value.value.slice(e.coordinate+autoCompleteValue.length, e.value.value.length)
                const bold_str = e.value.value.slice(e.coordinate, e.coordinate+autoCompleteValue.length)
                return {
                    label: <Tooltip title={parse_types(e.value.type)} placement={'topRight'}>
                        <div>
                            <span>{pre_str}</span>
                            {bold_str.toLocaleLowerCase () == autoCompleteValue.toLowerCase() ? <strong>{bold_str}</strong> : <span>{bold_str}</span>}
                            <span>{after_str}</span>
                        </div>
                    </Tooltip>,
                    value: e.value.value + '--' + e.value.type
                }
            })}
            onSelect={onSelect as any}
            value={autoCompleteValue}
            onChange={(e: any)=>setAutoCompleteValue(e)}
            // onSearch={handleSearch}
            dropdownMatchSelectWidth={252}
        >
            <Input.Search  prefix={tags}
            autoFocus={false}
            onBlur={()=>null}
            style={{ width: "60vw" }}
            color="red-6"
            className={styles.search}
            onChange={(e)=>onChange(e.target.value)} 
            value={data}
            onSearch={(e) => onEnter(e)}
            size="large"
            placeholder="Поиск товара"
            loading={getLoading}
            enterButton />
        </AutoComplete>

    );
}