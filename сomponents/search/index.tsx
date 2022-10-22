import React, { useState } from "react";
import { AutoComplete, Input, Tag, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createNode, deleteNode, hints, INode, nodes, products } from "../../store/reducers/nodesInputReducer";
import { createHints, search } from "../../store/reducers/asyncActions";
import styles from "./search.module.css"

function parse_types(type: string) {
    if (type == 'Name') return 'Наименование'
    if (type == 'Category') return 'Категория'
    return type;
}

export const Search: React.FC<{onData:(data:any)=>void}> = (props) =>{
    const [data, setData] = useState("")
    const [tags, setTags] = useState(new Array<JSX.Element>())
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();
    const getNodes = useAppSelector(nodes);
    const getProducts = useAppSelector(products);
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
        setLoading(true)
        console.log(getNodes);
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
            style={{ width: "50vw" }}
            color="red-6"
            className={styles.search}
            onChange={(e)=>onChange(e.target.value)} 
            value={data}
            onSearch={(e) => onEnter(e)}
            size="large"
            placeholder="Поиск товара"
            loading={loading && getProducts.length == 0}
            enterButton />
        </AutoComplete>

    );
}