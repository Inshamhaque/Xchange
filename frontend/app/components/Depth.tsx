import { useEffect, useState, useRef } from "react";
import { getDepth } from "./utils/httpClient";
import AskTable from "./Depth/AskTable";
import BidsTable from "./Depth/BidTable";

export const Depth = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState<"book" | "trades">("book");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getDepth().then((d) => {
      setData(d);
    });
  }, []);
    // TODO : not correct calculation
    useEffect(() => {
    if (selected === "book" && containerRef.current && dividerRef.current) {
        const container = containerRef.current;
        const divider = dividerRef.current;

        // Divider's center relative to container
        const dividerCenter =
        divider.offsetTop + divider.clientHeight;

        // Target scroll so dividerCenter aligns with container's center
        const scrollTop = dividerCenter - container.clientHeight/2 ;

        container.scrollTop = scrollTop;
    }
    }, [selected, data]);

  return (
    <div className="bg-baseBackgroundL2 h-full m-2 rounded-md p-3 text-baseTextHighEmphasis">
      {/* Navbar */}
      <div className="flex space-x-2">
        <div
          onClick={() => setSelected("book")}
          className={`px-2 py-1 rounded-md hover:cursor-pointer ${
            selected === "book"
              ? "text-baseTextHighEmphasis border border-baseBorderLight"
              : "text-baseTextLowEmphasis"
          }`}
        >
          Book
        </div>
        <div
          onClick={() => setSelected("trades")}
          className={`px-2 py-1 rounded-md hover:cursor-pointer ${
            selected === "trades"
              ? "text-baseTextHighEmphasis border border-baseBorderLight"
              : "text-baseTextLowEmphasis"
          }`}
        >
          Trades
        </div>
      </div>

      {/* Order Book */}
      {selected === "book" && (
        <div
          ref={containerRef}
          className="overflow-y-auto h-full mt-3 scroll-smooth"
        >
          {/* Header */}
          <div className="flex text-xs font-semibold text-gray-400 border-b border-baseBorderLight pb-1 sticky top-0 bg-baseBackgroundL2 z-10">
            <div className="w-24 text-left">Price (USD)</div>
            <div className="w-20 text-right">Size (SOL)</div>
            <div className="w-24 text-right">Total (SOL)</div>
          </div>

          {/* Asks */}
          <AskTable />

          {/* Divider */}
          <div
            ref={dividerRef}
            className="flex items-center justify-center my-2"
          >
            <button className="text-xs px-3 py-1 rounded-md border border-baseBorderLight text-baseTextLowEmphasis hover:bg-baseBackgroundL3">
              Recenter
            </button>
          </div>

          {/* Bids */}
          <BidsTable />
        </div>
      )}
    </div>
  );
};
