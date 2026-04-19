import { Circle, ShoppingBag, X } from "lucide-react";
import ItemObject from "./ItemObject";

function History({ historyList, removeTransaction }) {
  return (
    <>
      <div className="flex flex-col items-center pt-2 w-full">
        {/* TITLE */}
        <h1 className="mt-2 text-xl font-semibold tracking-wide text-white">HISTÓRICO</h1>
        {/* DOT MENU */}
        <div className="flex justify-center gap-4 mt-3">
          <Circle fill="#8b5cf6" size={8} />
          <Circle fill="#cbd5e1" size={8} className="opacity-50" />
        </div>
        {/* DISPLAY INFORMATION */}
        <div
          className={`slide-to-right ${
            historyList.length === 0
              ? "flex flex-col justify-center items-center flex-1 px-8 text-center text-lg text-text-200"
              : "hidden"
          }`}
        >
          <p className="font-light">
            Parece que seu histórico está vazio, arraste para esquerda para
            adicionar nova transação.
          </p>
        </div>
        <div
          className="slide-to-right no-scrollbar flex flex-col flex-1 w-full max-w-[340px] mt-6 overflow-y-auto pb-20"
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
