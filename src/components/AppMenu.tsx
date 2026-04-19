import { ArrowRightLeft, TableProperties, ChartLine } from "lucide-react";
import { useState } from "react";

function AppMenu({ setPageValue }: any) {
  const [buttonCSS, setButtonCSS] = useState(1);

  const menuList = [
    { id: 1, path: <ArrowRightLeft size={24} />, name: "Histórico" },
    { id: 2, path: <TableProperties size={24} />, name: "Fixos" },
    { id: 3, path: <ChartLine size={24} />, name: "Gráficos" },
  ];

  return (
    <div className="glass-card flex justify-between items-center px-4 py-2 w-full mx-auto gap-2">
      {menuList.map((item) => {
        const isActive = buttonCSS === item.id;
        return (
          <div
            key={item.id}
            onClick={() => {
              setPageValue(item.id);
              setButtonCSS(item.id);
            }}
            className={`${
              isActive ? "button-active" : "button-inactive"
            } cursor-pointer flex-1 flex justify-center py-2 rounded-2xl transition-all`}
          >
            {item.path}
            {isActive && <p className="ml-2 font-medium">{item.name}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default AppMenu;
