import axios from "axios"
const BASE_API = "https://api.rawg.io/api"
export const getData = async () =>{
    const res = await axios.get(`${BASE_API}/games`)
    return res.data
}
export const postData = async ()=>{
    const res = await axios.post(`${BASE_API}/games`,data)
    return res.data
}