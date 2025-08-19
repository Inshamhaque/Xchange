import express from "express";
import axios from 'axios';
async function main(){
    const response = await axios.get('https://api.backpack.exchange/api/v1/trades?symbol=SOL_USDC');
    console.log("this isthe respose:",response.data);
}
main();