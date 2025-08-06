import Balance from "./components/Balance";
import AppMenu from "./components/AppMenu";
import "./css/App.css";
import MiddleBox from "./components/MiddleBox";

import { useEffect, useState } from "react";

function App() {
  const [pageValue, setPageValue] = useState(1);
  const [historyList, setHistoryList] = useState(
    JSON.parse(localStorage.getItem("historyList")) || []
  );
  const [finalBalance, setFinalBalance] = useState(0);
  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);

  // Salva a lista de transações no localStorage sempre que historyList mudar.
  useEffect(() => {
    localStorage.setItem("historyList", JSON.stringify(historyList));
    console.log(historyList);
  }, [historyList]);
  console.log(historyList);

  return (
    <>
      <div className=" w-screen h-screen overflow-hidden ">
        <div className="flex flex-col justify-center items-center ">
          <Balance
            finalBalance={finalBalance}
            positiveValue={positiveValue}
            negativeValue={negativeValue}
          />
          <MiddleBox
            pageValue={pageValue}
            setHistoryList={setHistoryList}
            historyList={historyList}
            setFinalBalance={setFinalBalance}
            setPositiveValue={setPositiveValue}
            positiveValue={positiveValue}
            negativeValue={negativeValue}
            finalBalance={finalBalance}
            setNegativeValue={setNegativeValue}
          />
          <AppMenu pageValue={pageValue} setPageValue={setPageValue} />
        </div>
      </div>
    </>
  );
}

export default App;
