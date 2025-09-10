import { useEffect, useState } from "react"
import { rawData } from "../data/depth"
import { getDepth } from "./utils/httpClient";
import AskTable from "./Depth/AskTable";
export const Depth = ()=>{
    const [data,setData] = useState();
    useEffect(()=>{
        getDepth().then(d=>{
            setData(d);
        })

    },[])
    const [selected, setSelected] = useState<'book'|'trades'>('book');
    return(
        <div className="bg-baseBackgroundL2 h-full m-2 rounded-md p-3 text-baseTextHighEmphasis">
            {/* Navbar has two -- OrderBook and Trades */}
            <div className="flex  space-x-2">
                <div 
                    onClick={() => setSelected('book')} 
                    className={`px-2 py-1 rounded-md hover:cursor-pointer ${selected === 'book' ? 'text-baseTextHighEmphasis border border-baseBorderLight' : 'text-baseTextLowEmphasis'}`}
                    >
                    Book
                </div>

                <div 
                    onClick={() => setSelected('trades')} 
                    className={`px-2 py-1 rounded-md hover:cursor-pointer ${selected === 'trades' ? 'text-baseTextHighEmphasis  border border-baseBorderLight' : 'text-baseTextLowEmphasis'}`}
                    >
                    Trades
                </div>
            </div>
            {/* Optional Rendering of Order Book and Trade */}
            {selected=='book' && 
                <div>
                    <div className="flex space-x-4 mt-3" >
                        <div className="text-sm text-white">Price(USD)</div>
                        <div className="text-xs text-gray-400">Size(SOL)</div>
                        <div className="text-xs text-gray-400">Total(SOL)</div>
                    </div>
                    <AskTable />
                </div>
                
            
            }


        </div>
    )
}