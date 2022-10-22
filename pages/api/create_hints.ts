import { INode } from "../../store/reducers/nodesInputReducer";
import { fetcher } from "./fetch";


export default async (word: string, hints:INode[]) => {

    const data = await fetcher.post('/autocomplete_schema', {
        content: word,
        exclude: []
    });
    return data.data.nodes;
}
