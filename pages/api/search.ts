import * as axios from 'axios'
import {INode} from '../../store/reducers/nodesInputReducer'
import { fetcher } from './fetch'

export default async (nodes: INode[]) => {
    console.log("SEARCH", nodes)

    const res = await fetcher.post('/search', {
        body: nodes,
        limit: 10,
        offset: 0
    });
    console.log("SEARCHRES", res)

    return res.data;
}