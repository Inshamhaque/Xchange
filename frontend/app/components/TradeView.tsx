import { TradeView as CandleChart } from "./TradingView/Chart"

export const TradeView = ()=>{
    return(
        <div>
            <CandleChart market="SOL_USDC" />
        </div>
    )
}