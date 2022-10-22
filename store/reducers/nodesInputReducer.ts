import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import {search, createHints} from './asyncActions';


export interface INode{
    type: "All" | "Category" | "Name" | string;
    value: string;
}

export interface IHint{
    value: INode;
    coordinate: number;
}

export interface IProduct{
    name: string;
    category: string;
    characteristics: {
        name: string;
        value: string;
    }[];
}

interface INodesInput {
    nodes: INode[],
    hints: {
        coordinate: number,
        value: INode
    }[],
    current_word: string,
    products: IProduct[]
}

const initialState: INodesInput = {
    nodes: [],
    hints: [],
    current_word: "",
    products: []
}

const nodesInputSlice = createSlice({
    name: 'nodesInput',
    initialState,
    reducers: {
        setCurrentWord(state, action: PayloadAction<string>) {
            state.current_word = action.payload;
        },
        createNode(state, action: PayloadAction<INode>) {
            state.nodes = state.nodes.concat([action.payload]);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        builder.addCase(createHints.fulfilled, (state, action) => {
            state.hints = action.payload;
        })
    }
})

export const {setCurrentWord, createNode} = nodesInputSlice.caseReducers;


export const hints = createSelector((state: INodesInput) => state.hints, hints => hints)
export const currentWord = createSelector((state: INodesInput) => state.current_word, word => word)
export const products = createSelector((state: INodesInput) => state.products, products => products)


export default nodesInputSlice.reducer;