import { useState } from "react";
import History from "./History";
import NewTransaction from "./NewTransaction";
import { useSwipeable } from "react-swipeable";
import { ChevronRight, ChevronLeft } from "lucide-react";

function Transaction({
  setHistoryList,
  historyList,
  rawHistoryList,
  removeTransaction,
}: any) {
  const [newTransaction, setNewTransaction] = useState(false);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left") {
        setNewTransaction(true);
      } else if (eventData.dir === "Right") {
        setNewTransaction(false);
      }
    },
  });

  return (
    <div {...handlers} className="w-full flex-1 flex flex-col relative">
      <div className={`${newTransaction ? "hidden" : "w-full"}`}>
        {/* Desktop Arrow Right */}
        <button 
          onClick={() => setNewTransaction(true)}
          className="absolute right-4 top-4 hidden sm:flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-20 cursor-pointer shadow-lg border border-white/5"
          title="Nova Transação"
        >
          <ChevronRight size={24} />
        </button>
        <History
          setHistoryList={setHistoryList}
          historyList={historyList}
          removeTransaction={removeTransaction}
        />
      </div>
      <div className={`${newTransaction ? "w-full" : "hidden"}`}>
        {/* Desktop Arrow Left */}
        <button 
          onClick={() => setNewTransaction(false)}
          className="absolute left-4 top-4 hidden sm:flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-20 cursor-pointer shadow-lg border border-white/5"
          title="Voltar ao Histórico"
        >
          <ChevronLeft size={24} />
        </button>
        <NewTransaction
          setHistoryList={setHistoryList}
          historyList={rawHistoryList || historyList}
        />
      </div>
    </div>
  );
}

export default Transaction;
