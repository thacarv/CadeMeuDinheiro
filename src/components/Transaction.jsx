import { useState } from "react";
import History from "./History";
import NewTransaction from "./NewTransaction";
import { useSwipeable } from "react-swipeable";

function Transaction({
  setHistoryList,
  historyList,
  removeTransaction,
  updateBalance,
}) {
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
    <div {...handlers} className="h-[100%]">
      <div className={`${newTransaction ? "hidden" : ""}`}>
        <History
          setHistoryList={setHistoryList}
          historyList={historyList}
          removeTransaction={removeTransaction}
          updateBalance={updateBalance}
        />
      </div>
      <div className={`${newTransaction ? "" : "hidden"}`}>
        <NewTransaction
          setHistoryList={setHistoryList}
          historyList={historyList}
          updateBalance={updateBalance}
        />
      </div>
    </div>
  );
}

export default Transaction;
