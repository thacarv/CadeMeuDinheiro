import ItemObject from "./ItemObject";
import { useMemo } from "react";

function FixedTransactions({ historyList, removeTransaction }: any) {

  const filteredList = useMemo(() => {
    return historyList.filter((item: any) => {
      // Must be recurring
      if (item.recurring !== "on") return false;
      return true;
    });
  }, [historyList]);

  return (
    <>
      <div className="flex flex-col items-center pt-2 w-full">
        {/* TÍTULO */}
        <h1 className="mt-2 text-xl font-semibold text-white tracking-wide">TRANSAÇÕES FIXAS</h1>
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
