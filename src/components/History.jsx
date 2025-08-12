import { Circle, ShoppingBag, X } from "lucide-react";
import ItemObject from "./ItemObject";

function History({ historyList, removeTransaction, updateBalance }) {
  return (
    <>
      <div className="flex flex-col items-center mt-3">
        {/* TITLE */}
        <h1 className="mt-2 text-2xl">HISTÓRICO</h1>
        {/* DOT MENU */}
        <div className="flex justify-around w-20 mt-3 text-gray-400">
          <Circle color="pink" fill="pink" size={10} />
          <Circle fill="#99a1af" size={10} />
        </div>
        {/* DISPLAY INFORMATION */}
        <div
          className={`slide-to-right ${
            historyList.length === 0
              ? "flex flex-col justify-center items-center h-80 p-10 text-2xl text-text-200"
              : "hidden"
          }`}
        >
          <p className="font-light">
            Parece que seu histórico está vazio, arraste para esquerda para
            adicionar nova transação.
          </p>
        </div>
        <div
          onChange={() => updateBalance()}
          className="slide-to-right no-scrollbar flex flex-col max-h-80 w-70 mt-15 overflow-scroll "
        >
          {/* MAP ARRAY OF ITEMS */}
          {historyList.reverse().map((item) => (
            <ItemObject
              key={item.id}
              item={item}
              removeTransaction={removeTransaction}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default History;
