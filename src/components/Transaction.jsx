import { useState } from "react";
import History from "./History";
import NewTransaction from "./NewTransaction";
import { useSwipeable } from "react-swipeable";

function Transaction({ mockList }) {
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
    <div {...handlers}>
      <div className={`${newTransaction ? "hidden" : ".slide-to-right"}`}>
        <History mockList={mockList} />
      </div>
      <div className={`${newTransaction ? "slide-to-left" : "hidden"}`}>
        <NewTransaction />
      </div>
    </div>
  );
}

export default Transaction;
