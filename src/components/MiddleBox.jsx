import Analytics from "./Analytics";
import FixedTransactions from "./FixedTransactions";
import Transaction from "./Transaction";

function MiddleBox({
  pageValue,
  setHistoryList,
  historyList,
  setFinalBalance,
  finalBalance,
  setPositiveValue,
  positiveValue,
  setNegativeValue,
  negativeValue,
}) {
  function settingValue(type, valor, final) {
    if (type) {
      setPositiveValue(parseFloat(valor.toFixed(3)));
    } else {
      setNegativeValue(parseFloat(valor.toFixed(3)));
    }
    setFinalBalance(parseFloat(final.toFixed(3)));
  }
  // Função que vai permitir salvar os valores passados no balanço geral.
  function updateBalance(item) {
    if (item.transaction === "entrada") {
      let attBalance = finalBalance + item.valor;
      let positive = item.valor + positiveValue;
      settingValue(true, positive, attBalance);
    } else {
      let attBalance = finalBalance - item.valor;
      let negative = item.valor + negativeValue;
      settingValue(false, negative, attBalance);
    }
  }

  function removeValue(item) {
    let removeValue = 0;
    let type = true;
    let removeBalance = 0;
    if (item.transaction === "entrada") {
      removeValue = positiveValue - item.valor;
      removeBalance = finalBalance - item.valor;
    } else {
      removeValue = negativeValue - item.valor;
      removeBalance = finalBalance + item.valor;
      type = false;
    }
    settingValue(type, removeValue, removeBalance);
  }

  // Function que vai remover item ao clicar no X
  function removeTransaction(itemInfo) {
    console.log(itemInfo);
    const newList = historyList.filter((item) => {
      if (itemInfo.id == item.id) {
        removeValue(item);
      }
      return itemInfo.id != item.id;
    });
    setHistoryList(newList);
  }

  return (
    <>
      <div className="div-app-theme h-[52vh] z-1 overflow-x-scroll">
        {pageValue === 1 ? (
          <Transaction
            historyList={historyList}
            setHistoryList={setHistoryList}
            removeTransaction={removeTransaction}
            updateBalance={updateBalance}
          />
        ) : pageValue === 2 ? (
          <FixedTransactions
            historyList={historyList}
            removeTransaction={removeTransaction}
          />
        ) : (
          <Analytics historyList={historyList} />
        )}
      </div>
    </>
  );
}
export default MiddleBox;
