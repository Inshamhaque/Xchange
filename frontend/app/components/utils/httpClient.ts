import { BACKEND_URL } from "@/app/config";
import axios from "axios"
export async  function getDepth(){
    const response = await axios.get(`${BACKEND_URL}/depth/fetch`);
    console.log(response.data.asks);
    return response.data.asks;
}
getDepth();