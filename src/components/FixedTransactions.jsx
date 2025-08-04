import ItemObject from "./ItemObject";
import RadioInput from "./RadioInput";
import { useState } from "react";

function FixedTransactions({ historyList, removeTransaction }) {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <>
      <div className="flex flex-col items-center mt-3">
        {/* TÍTULO */}
        <h1 className="mt-4 text-2xl">TRANSAÇÕES FIXAS</h1>
        {/* BOTÕES */}
        <div className="flex justify-around items-center mt-5">
          <RadioInput
            tipo={"entrada"}
            category={"checkbox"}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          <RadioInput
            tipo={"saída"}
            category={"checkbox"}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        {/* LISTA */}
        <div className="div-app-content-theme">
          {historyList
            .filter((item) => item.recurring === "on")
            .map((item) => {
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
