import axios from "axios"
import { host } from "./consts"


export const fetcher = axios.create(
    {
        baseURL: host,
        timeout: 60000
    }
)
