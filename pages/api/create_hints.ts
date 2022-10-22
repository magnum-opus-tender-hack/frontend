import { fetcher } from "./fetch";


export default async (word: string) => {
    const data = await fetcher.post('/autocomplete_schema', {
        content: word
    });
    return data.data;
}
