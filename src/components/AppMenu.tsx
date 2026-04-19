import { ArrowRightLeft, TableProperties, ChartLine, LogOut } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function AppMenu({ setPageValue }: any) {
  const [buttonCSS, setButtonCSS] = useState(1);

  const menuList = [
    { id: 1, path: <ArrowRightLeft size={24} />, name: "Histórico" },
    { id: 2, path: <TableProperties size={24} />, name: "Fixos" },
    { id: 3, path: <ChartLine size={24} />, name: "Gráficos" },
  ];

  const handleLogout = async () => {
    localStorage.clear();
    await supabase.auth.signOut();
  };

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
      
      {/* Logout Menu */}
      <div
        onClick={handleLogout}
        className="button-inactive cursor-pointer flex justify-center py-2 px-3 rounded-2xl hover:bg-secondary-200/20 hover:text-secondary-200 transition-all"
        title="Sair"
      >
        <LogOut size={24} />
      </div>
    </div>
  );
}

export default AppMenu;
