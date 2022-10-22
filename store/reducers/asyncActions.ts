import {createAsyncThunk} from '@reduxjs/toolkit'
import {INode, IProduct, IHint, hints} from './nodesInputReducer';
import search_api from '../../pages/api/search';
import create_hints_api from '../../pages/api/create_hints';

export const createHints = createAsyncThunk(
    'nodesInput/createHints',
    async (data: {word: string, hints: INode[]}, thunkApi) => {
        console.log("thunk")
        const response: IHint[] = await create_hints_api(data.word,[]);
        //TODO: добавить сеть
        console.log(response, "RESP")
        return response;
    }
)

export const search = createAsyncThunk(
    'nodesInput/search',
    async (nodes: INode[], thunkApi) => {

        const response: IProduct[] = await search_api(nodes) as IProduct[];

        return response;
    }
)