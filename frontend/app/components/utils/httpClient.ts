import { BACKEND_URL } from "@/app/config";
import axios from "axios"
export async  function getDepth(){
    const response = await axios.get(`${BACKEND_URL}/depth/fetch`);
    console.log(response.data.asks);
    return response.data;
}
export async function getKlines() {
  try {
    const response = await axios.post(`${BACKEND_URL}/klines/fetch`, {
      interval: '1h',
      startTime: Math.floor(Date.now() / 1000),
    });
    console.log(response.data);

    return response.data; 
  } catch (error) {
    console.error("Error fetching klines:", error);
    return null;
  }
}
getKlines();