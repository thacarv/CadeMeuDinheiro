import { Circle, ShoppingBag } from "lucide-react";

function History({ mockList }) {
  return (
    <>
      <div className="flex flex-col items-center ">
        {/* TITLE */}
        <h1 className="mt-4 text-2xl">HISTÓRICO</h1>
        {/* DOT MENU */}
        <div className="flex justify-around w-20 mt-3 text-gray-400">
          <Circle color="pink" fill="pink" size={10} />
          <Circle fill="#99a1af" size={10} />
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
