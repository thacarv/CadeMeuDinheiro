import { ArrowRightLeft, TableProperties, ChartLine } from "lucide-react";

function AppMenu() {
  const menuList = [
    <ArrowRightLeft size={40} />,
    <TableProperties size={40} />,
    <ChartLine size={40} />,
  ];

  return (
    <>
      <div className="div-app-theme flex justify-around items-center h-[8vh] my-15 ">
        {menuList.map((item) => {
          return (
            <div className="h-[40px] w-[40px] text-[#A7A7A7] size-4">
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AppMenu;
