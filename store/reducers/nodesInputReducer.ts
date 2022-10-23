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
    id:number,
    score:number,
    characteristic: {
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
    products: IProduct[],
    loading: boolean
}

const initialState: INodesInput = {
    nodes: [],
    hints: [],
    current_word: "",
    products: [],
    loading:false
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
        },
        deleteNode(state, action: PayloadAction<string>) {
            state.nodes = state.nodes.filter((e) => e.value != action.payload)
        },
        setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload
        },
        updateNumberNode(state, action: PayloadAction<{value: string, number: number}>) {
            state.nodes = state.nodes.map((e) => {
                var operation = '=';
                if (e.value[0] == '>' && e.value[1] == '=') operation = '>='
                if (e.value[0] == '<' && e.value[1] == '=') operation = '<=' 
                return e.value == e.value ? {
                    type: e.type,
                    value: operation + action.payload.number.toString()
                } : e
            })
        },
        updateOperationNode(state, action: PayloadAction<{value: string, operation: string}>) {
            state.nodes = state.nodes.map((e) => {
                var value = 0
                if (action.payload.operation.length == 2) {
                    value = Number.parseInt(e.value.slice(2, e.value.length))
                }
                else {
                    value = Number.parseInt(e.value.slice(1, e.value.length))
                }
                return e.value == e.value ? {
                    type: e.type,
                    value: action.payload.operation + value
                } : e
            })
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false
        })
        builder.addCase(createHints.fulfilled, (state, action) => {
            state.hints = action.payload;
        })
    }
})

export const {
    setCurrentWord, 
    createNode, 
    deleteNode, 
    setLoading, 
    updateNumberNode, 
    updateOperationNode
} = nodesInputSlice.actions;


export const hints = createSelector((state: INodesInput) => state.hints, hints => hints)
export const currentWord = createSelector((state: INodesInput) => state.current_word, word => word)
export const products = createSelector((state: INodesInput) => state.products, products => products)
export const nodes = createSelector((state: INodesInput) => state.nodes, nodes => nodes)
export const loading = createSelector((state: INodesInput) => state.loading, loading => loading)



export default nodesInputSlice.reducer;