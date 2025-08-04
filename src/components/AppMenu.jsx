import { ArrowRightLeft, TableProperties, ChartLine } from "lucide-react";
import { useState } from "react";

function AppMenu({ setPageValue }) {
  const [buttonCSS, setButtonCSS] = useState(1);

  const menuList = [
    { id: 1, path: <ArrowRightLeft size={40} />, name: "Histórico" },
    { id: 2, path: <TableProperties size={40} />, name: "Fixos" },
    { id: 3, path: <ChartLine size={40} />, name: "Gráficos" },
  ];

  return (
    <>
      <div className="div-app-theme flex justify-around items-center h-[8vh] my-15 overflow-hidden">
        {menuList.map((item) => {
          return (
            <div
              key={item.id}
              className={`${
                buttonCSS === item.id ? "button-active text-primary" : ""
              } w-[40px]`}
            >
              <button
                key={item.id}
                onClick={() => {
                  setPageValue(item.id);
                  setButtonCSS(item.id);
                }}
                className={` h-[40px] w-[40px] text-[#A7A7A7] size-4`}
              >
                {item.path}
              </button>
              <p
                className={`${
                  buttonCSS === item.id ? "button-active" : "w-0 h-0 opacity-0"
                }`}
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AppMenu;
