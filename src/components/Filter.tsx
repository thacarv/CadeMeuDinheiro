import { ArrowDownWideNarrowIcon } from "lucide-react";
import { useState } from "react";

function Filter({ filterData, setFilterData }: any) {
  const [filterDown, setFilterDown] = useState(false);

  const toggleType = (type: string) => {
    setFilterData({
      ...filterData,
      transactionType: filterData.transactionType === type ? 'all' : type
    });
  };

  return (
    <>
      <div>
        <button onClick={() => setFilterDown(!filterDown)} className="cursor-pointer text-text-200 hover:text-white transition-colors">
          <ArrowDownWideNarrowIcon />
        </button>
        {/*  MAIN DIV */}
        <div
          className={`${filterDown ? "flex flex-col w-[300px] bg-[#0f172a] rounded-2xl p-5 mt-2 border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.9)] absolute left-0 top-full z-[100]" : "hidden"}`}
        >
          {/*  Transaction */}
          <div className="flex justify-center gap-4 mt-2">
            <button 
              onClick={() => toggleType('entrada')}
              className={`px-5 py-2 cursor-pointer rounded-xl text-sm font-bold tracking-wide transition-all ${filterData.transactionType === 'entrada' ? 'bg-secondary-100/50 text-white shadow-md' : 'bg-secondary-100/20 text-secondary-100 hover:bg-secondary-100/30'}`}
            >
              ENTRADA
            </button>
            <button 
              onClick={() => toggleType('saída')}
              className={`px-5 py-2 cursor-pointer rounded-xl text-sm font-bold tracking-wide transition-all ${filterData.transactionType === 'saída' ? 'bg-secondary-200/50 text-white shadow-md' : 'bg-secondary-200/20 text-secondary-200 hover:bg-secondary-200/30'}`}
            >
              SAÍDA
            </button>
          </div>
          {/*  Date */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex flex-col">
              <label className="text-xs text-text-200 mb-1">Início</label>
              <input 
                value={filterData.start}
                onChange={(e) => setFilterData({...filterData, start: e.target.value})}
                onClick={(e: any) => { try { e.target.showPicker(); } catch(err){} }}
                style={{ colorScheme: "dark" }}
                type="date" 
                className="bg-transparent text-white border-b border-white/20 text-sm pb-1 outline-none cursor-pointer w-full" 
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-xs text-text-200 mb-1">Fim</label>
              <input 
                value={filterData.end}
                onChange={(e) => setFilterData({...filterData, end: e.target.value})}
                onClick={(e: any) => { try { e.target.showPicker(); } catch(err){} }}
                style={{ colorScheme: "dark" }}
                type="date" 
                className="bg-transparent text-white border-b border-white/20 text-sm pb-1 outline-none cursor-pointer w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
