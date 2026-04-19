import { ArrowDown, ArrowUp } from "lucide-react";

function Balance({ finalBalance, positiveValue, negativeValue }) {
  return (
    <div className="relative w-full z-10 pt-10 pb-2">
      <div className="glass-card flex flex-col items-center p-6 w-full shadow-lg">
        <p className="text-text-200 text-xs font-semibold tracking-widest mb-3">MEU SALDO</p>
        
        {/* Receber o valor do saldo */}
        <div className="flex items-end max-w-full overflow-hidden no-scrollbar mb-6">
          <p className="text-xl text-primary-100 mr-2 mb-1 font-medium">R$</p>
          <p className="text-5xl text-white font-bold tracking-tight">{finalBalance}</p>
        </div>
        
        {/* Receber os valores de entrada e saída */}
        <div className="flex justify-between items-center w-full px-2 pt-5 border-t border-white/10">
          <div className="flex items-center text-secondary-100 font-medium bg-secondary-100/10 px-3 py-1.5 rounded-xl">
            <ArrowUp size={18} className="mr-1" />
            <p className="text-sm">R$ {positiveValue}</p>
          </div>
          <div className="flex items-center text-secondary-200 font-medium bg-secondary-200/10 px-3 py-1.5 rounded-xl">
            <ArrowDown size={18} className="mr-1" />
            <p className="text-sm">R$ {negativeValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
