import { LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import Filter from "./filter";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { categoryList } from "../assets/Files/category";

// TODO: Informações do TODO estão no GoodNotes do ipad

function Analytics({ historyList }) {
  const [changeGraph, setChangeGraph] = useState(false);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left") {
        setChangeGraph(true);
      } else if (eventData.dir === "Right") {
        setChangeGraph(false);
      }
    },
  });

  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xData = [400, 398, 800, 908, 800, 800, 300];
  const xLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "",
    "Dez",
  ];
  const data = [
    { label: "Group A", value: 400, color: "#0088FE" },
    { label: "Group B", value: 300, color: "#00C49F" },
    { label: "Group C", value: 300, color: "#FFBB28" },
    { label: "Group D", value: 200, color: "#FF8042" },
  ];

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  // Função que vai passar os valores para as categorias, recebe a categoria do map.
  function categoriaValue(categoria) {
    let total = 0;
    historyList.forEach((item) => {
      if (item.category === categoria) {
        total = total + item.valor;
      }
    });

    return total;
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-3 ">
        {/* TÍTULO */}
        <h1 className="mt-2 text-2xl">RELATÓRIOS</h1>
        {/* Filter */}
        <div className="flex items-start w-[70vw] mt-5">
          <Filter type={"graph"} />
        </div>
        {/* Gráficos */}
        <div {...handlers}>
          <h2 className="text-[20px] text-center mb-1">
            {changeGraph ? "ANUAL" : "MENSAL"}
          </h2>
          <div className="flex justify-center items-center h-[20vh] w-[80vw] mt-2 overflow-scroll">
            <div className={`${changeGraph ? "hidden overflow-hidden" : ""}`}>
              <PieChart
                series={[
                  { innerRadius: 40, outerRadius: 90, data, arcLabel: "value" },
                ]}
                {...settings}
              />
            </div>
            <div className={`${changeGraph ? "w-[80vw] mr-2" : "hidden"}`}>
              <LineChart
                height={160}
                series={[{ data: pData }, { data: xData }]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                yAxis={[{ width: 50 }]}
              />
            </div>
          </div>
        </div>
        {/*  Categories */}
        <div className="flex flex-col">
          <p>Categorias</p>
          <div className="grid grid-cols-14 gap-20  max-w-[60vw] mt-5 overflow-x-scroll">
            {categoryList.map((item) => (
              <div
                key={item.id}
                className={
                  " flex flex-col justify-center items-center h-[9vh] w-[17.5vw] rounded-[10px] px-3 "
                }
                style={{ backgroundColor: item.color }}
              >
                <label
                  htmlFor={item.categoria}
                  className="flex flex-col justify-center items-center text-[0.7rem]"
                >
                  {item.icon}
                  <input
                    type="checkbox"
                    name={item.categoria}
                    id={item.categoria}
                  />
                  <p className="text-text-200">{item.categoria}</p>
                </label>
                <p>{categoriaValue(item.categoria)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
