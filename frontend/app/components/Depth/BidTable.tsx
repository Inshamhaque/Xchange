import { useState, useEffect } from "react";
import { getDepth } from "../utils/httpClient";

export default function BidsTable() {
  const [bidsWithTotal, setbidsWithTotal] = useState<[string, string, number][]>([]);

  useEffect(() => {
    getDepth().then(d => {
      const rawAsks: [string, string][] = d.bids || [];

      let totQuantity = 0;
      const withTotals: [string, string, number][] = rawAsks.map(([price, qty]) => {
        totQuantity += Number(qty);
        return [price, qty, totQuantity];
      });

      setbidsWithTotal(withTotals);
    });
  }, []);

  return (
    <div className="mt-2 space-y-1 text-sm">
      {bidsWithTotal.map(([price, qty, total], i) => (
        <div key={i} className="flex">
          <div className="w-24 text-left text-green-400">{Number(price).toFixed(2)}</div>
          <div className="w-20 text-right">{Number(qty).toFixed(2)}</div>
          <div className="w-24 text-right">{total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
