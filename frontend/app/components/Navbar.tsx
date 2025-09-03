"use client";
import { usePathname } from "next/navigation";
import { PrimaryButton, SuccessButton } from "./core/Button"
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const route = usePathname();
  const router = useRouter()
  
  return (
    <div className="bg-baseBackgroundL2 border-b border-navbarBorder">
      <div className="flex justify-between items-center p-2">
        <div className="flex">
          <div 
            className="text-xl pl-4 flex flex-col justify-center cursor-pointer text-baseTextHighEmphasis hover-text-accent font-semibold" 
            onClick={() => router.push('/')}
          >
            Xchange
          </div>
          <div 
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer hover-text-blue transition-colors ${
              route.startsWith('/markets') 
                ? 'text-greenAccent' 
                : 'text-baseTextLowEmphasis'
            }`} 
            onClick={() => router.push('/markets')}
          >
            Markets
          </div>
          <div 
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer hover-text-blue transition-colors ${
              route.startsWith('/trade') 
                ? 'text-greenAccent' 
                : 'text-baseTextLowEmphasis'
            }`} 
            onClick={() => router.push('/trade/SOL_USDC')}
          >
            Trade
          </div>
        </div>
        <div className="flex">
          <div className="p-2 mr-2 space-x-2">
            <SuccessButton>Deposit</SuccessButton>
            <PrimaryButton>Withdraw</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}