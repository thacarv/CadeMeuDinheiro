import { LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";

function Analytics() {
  const margin = { right: 24 };
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
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
  return (
    <>
      <div className="div-app-content-theme">
        {/* Título */}
        <div className="">RELATÓRIOS</div>
        {/* Botões */}
        <div>
          <button>ENTRADA</button>
          <button>SAÍDA</button>
        </div>
        {/* Gráficos */}
        <div className="max-h-[40vh] overflow-scroll">
          <LineChart
            height={150}
            series={[{ data: pData, label: "pv" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ width: 50 }]}
            margin={margin}
          />
          <PieChart
            series={[
              { innerRadius: 50, outerRadius: 100, data, arcLabel: "value" },
            ]}
            {...settings}
          />
        </div>
        {/* Categorias */}
        <div>
          <p>Categorias</p>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
