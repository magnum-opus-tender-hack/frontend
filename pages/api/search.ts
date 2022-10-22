import * as axios from 'axios'
import {INode} from '../../store/reducers/nodesInputReducer'
import { fetcher } from './fetch'

export default async (nodes: INode[]) => {
    const res = await fetcher.post('/search', {
        body: nodes
    });
    return res.data;
}