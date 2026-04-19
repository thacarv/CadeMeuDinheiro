import Filter from "./Filter";
import ItemObject from "./ItemObject";
import { useState, useMemo } from "react";

function FixedTransactions({ historyList, removeTransaction }: any) {
  const [filterData, setFilterData] = useState({ transactionType: 'all', start: '', end: '' });

  const filteredList = useMemo(() => {
    return historyList.filter((item: any) => {
      // Must be recurring
      if (item.recurring !== "on") return false;
      
      // Filtragem por Transação (entrada/saida)
      if (filterData.transactionType !== 'all' && item.transaction !== filterData.transactionType) return false;
      
      // Filtragem por Datas
      if (item.date && item.date.length === 3) {
        const itemDate = new Date(`${item.date[0]}-${item.date[1]}-${item.date[2]}T00:00:00`);
        if (filterData.start && itemDate < new Date(`${filterData.start}T00:00:00`)) return false;
        if (filterData.end && itemDate > new Date(`${filterData.end}T23:59:59`)) return false;
      }
      return true;
    });
  }, [historyList, filterData]);

  return (
    <>
      <div className="flex flex-col items-center pt-2 w-full">
        {/* TÍTULO */}
        <h1 className="mt-2 text-xl font-semibold text-white tracking-wide">TRANSAÇÕES FIXAS</h1>
        {/* Filter */}
        <div className="flex items-start w-full max-w-[340px] mt-6 px-2 relative z-20">
          <Filter filterData={filterData} setFilterData={setFilterData} />
        </div>
        {/* LISTA */}
        <div className="div-app-content-theme w-full max-w-[340px] mx-auto pb-24 z-10">
          {filteredList.map((item: any) => {
            return (
              <ItemObject
                key={item.id}
                item={item}
                removeTransaction={removeTransaction}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FixedTransactions;
