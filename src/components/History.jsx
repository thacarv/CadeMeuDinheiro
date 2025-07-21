import { Circle, ShoppingBag } from "lucide-react";

function History() {
  const mockList = [
    {
      id: 1,
      value: 1200,
      date: "06/12/2024",
      entrada: true,
      categoria: "salario",
    },
    {
      id: 2,
      value: 100,
      date: "09/04/2025",
      entrada: false,
      categoria: "transporte",
    },
    {
      id: 3,
      value: 50,
      date: "15/05/2025",
      entrada: false,
      categoria: "internet",
    },
    {
      id: 4,
      value: 200,
      date: "24/05/2025",
      entrada: true,
      categoria: "deposito",
    },
    {
      id: 5,
      value: 500,
      date: "27/05/2025",
      entrada: true,
      categoria: "deposito",
    },
    {
      id: 6,
      value: 300,
      date: "28/05/2025",
      entrada: false,
      categoria: "supermercado",
    },
  ];

  return (
    <>
      <div className="div-app-theme flex flex-col items-center  h-[52vh] ">
        <div>
          {/* TITLE */}
          <h1 className="mt-4 text-2xl">HISTÓRICO</h1>
        </div>
        {/* DOT MENU */}
        <div className="flex justify-around w-20 mt-3 text-gray-400">
          <Circle color="pink" fill="pink" size={15} className="" />
          <Circle fill="#99a1af" size={15} />
          <Circle fill="#99a1af" size={15} />
        </div>
        {/* DISPLAY INFORMATION */}
        <div className="no-scrollbar flex flex-col max-h-80 w-70 mt-15 overflow-scroll ">
          {/* MAP ARRAY OF ITEMS */}
          {mockList.reverse().map((item) => (
            <div className="flex justify-between h-25 mb-3">
              <div className="flex">
                <ShoppingBag />
                <div className="flex flex-col ml-5">
                  {item.categoria}
                  <div>{item.date}</div>
                </div>
              </div>
              <div>
                {item.entrada ? "+" : "-"}
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default History;
