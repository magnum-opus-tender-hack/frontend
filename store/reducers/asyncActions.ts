import {createAsyncThunk} from '@reduxjs/toolkit'
import {INode, IProduct, IHint} from './nodesInputReducer';
import search_api from '../../pages/api/search';
import create_hints_api from '../../pages/api/create_hints';

export const createHints = createAsyncThunk(
    'nodesInput/createHints',
    async (word: string, thunkApi) => {
        const response: IHint[] = await create_hints_api(word);
        //TODO: добавить сеть
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