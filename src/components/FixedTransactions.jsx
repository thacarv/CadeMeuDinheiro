import Filter from "./filter";
import ItemObject from "./ItemObject";

function FixedTransactions({ historyList, removeTransaction }) {
  return (
    <>
      <div className="flex flex-col items-center mt-3">
        {/* TÍTULO */}
        <h1 className="mt-2 text-2xl">TRANSAÇÕES FIXAS</h1>
        {/* Filter */}
        <div className="flex items-start w-[70vw] mt-5">
          <Filter />
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
