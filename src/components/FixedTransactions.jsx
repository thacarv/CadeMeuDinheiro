function FixedTransactions({ mockList }) {
  return (
    <>
      <div className="flex flex-col items-center ">
        {/* TÍTULO */}
        <h1 className="mt-4 text-2xl">TRANSAÇÕES FIXAS</h1>
        {/* BOTÕES */}
        <div>
          <button>ENTRADA</button>
          <button>SAÍDA</button>
        </div>
        {/* LISTA */}
        <div className="div-app-content-theme">
          {mockList
            .filter((item) => item.fixed === true)
            .map((item) => {
              return (
                <div className="div-app-content-listdisplay-theme">
                  <div>
                    <div className="flex items-center">{item.icon}</div>
                    <div className="flex flex-col">
                      <p className="font-bold">{item.categoria}</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                  <p>
                    {item.entrada ? "+" : "-"} R$ {item.value}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default FixedTransactions;
