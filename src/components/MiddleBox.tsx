import Analytics from "./Analytics";
import FixedTransactions from "./FixedTransactions";
import Transaction from "./Transaction";
import Settings from "./Settings";
import { supabase } from "../lib/supabase";

function MiddleBox({
  pageValue,
  setHistoryList,
  historyList,
  session,
  setPageValue,
  installPrompt,
  setInstallPrompt
}: any) {

  // Função para remover as transações tanto no banco de dados quanto na UI em tempo real
  async function removeTransaction(itemInfo: any) {
    // UI otimista
    const newList = historyList.filter((item: any) => itemInfo.id !== item.id);
    setHistoryList(newList);

    // Banco de dados Supabase
    await supabase.from("transactions").delete().eq("id", itemInfo.id);
  }

  return (
    <div className="div-app-theme flex-1 z-10 w-full min-h-[400px]">
      {pageValue === 1 ? (
        <Transaction
          historyList={historyList}
          setHistoryList={setHistoryList}
          removeTransaction={removeTransaction}
        />
      ) : pageValue === 2 ? (
        <FixedTransactions
          historyList={historyList}
          removeTransaction={removeTransaction}
        />
      ) : pageValue === 3 ? (
        <Analytics historyList={historyList} />
      ) : pageValue === 4 ? (
        <Settings 
          session={session} 
          setPageValue={setPageValue} 
          installPrompt={installPrompt} 
          setInstallPrompt={setInstallPrompt} 
        />
      ) : null}
    </div>
  );
}
export default MiddleBox;
