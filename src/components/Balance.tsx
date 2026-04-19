import { ArrowDown, ArrowUp, Settings as SettingsIcon } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

function Balance({ finalBalance, positiveValue, negativeValue, session, setPageValue }: any) {
  const metaName = session?.user?.user_metadata?.display_name;
  const rawEmail = session?.user?.email;
  const accountName = metaName || (rawEmail ? rawEmail.split('@')[0] : "visitante");

  return (
    <div className="relative w-full z-10 pt-8 pb-2">
      <div className="w-full mb-3 flex items-center justify-between">
         <p className="text-white/60 text-sm tracking-wide font-medium">Olá, <span className="text-white font-semibold">@{accountName}</span></p>
         <button 
           onClick={() => setPageValue?.(4)} 
           className="p-2 text-text-200 hover:text-white transition-all cursor-pointer rounded-[14px] bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-105 active:scale-95 shadow-sm border border-white/5"
           title="Configurações da Conta"
         >
            <SettingsIcon size={18} />
         </button>
      </div>
      <div className="glass-card flex flex-col items-center p-6 w-full shadow-lg">
        <p className="text-text-200 text-xs font-semibold tracking-widest mb-3">MEU SALDO</p>
        
        {/* Receber o valor do saldo */}
        <div className="flex items-end max-w-full overflow-hidden no-scrollbar mb-6">
          <p className="text-4xl sm:text-5xl text-white font-bold tracking-tight">{formatCurrency(finalBalance)}</p>
        </div>
        
        {/* Receber os valores de entrada e saída */}
        <div className="flex justify-between items-center w-full px-2 pt-5 border-t border-white/10 gap-2">
          <div className="flex items-center text-secondary-100 font-medium bg-secondary-100/10 px-3 py-1.5 rounded-xl truncate overflow-hidden flex-1 justify-center">
            <ArrowUp size={18} className="mr-1 flex-shrink-0" />
            <p className="text-sm truncate">{formatCurrency(positiveValue)}</p>
          </div>
          <div className="flex items-center text-secondary-200 font-medium bg-secondary-200/10 px-3 py-1.5 rounded-xl truncate overflow-hidden flex-1 justify-center">
            <ArrowDown size={18} className="mr-1 flex-shrink-0" />
            <p className="text-sm truncate">{formatCurrency(negativeValue)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
