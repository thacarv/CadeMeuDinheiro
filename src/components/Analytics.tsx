import { LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import Filter from "./Filter";
import { useSwipeable } from "react-swipeable";
import { useState, useMemo, useRef } from "react";
import { categoryList } from "../assets/Files/category";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Analytics({ historyList }: any) {
  const [changeGraph, setChangeGraph] = useState(false);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [filterData, setFilterData] = useState({ transactionType: 'all', start: '', end: '' });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left") setChangeGraph(true);
      else if (eventData.dir === "Right") setChangeGraph(false);
    },
  });

  // Toggle categorias no filtro de array interativo
  const toggleCategory = (catName: string) => {
    if (filterCategories.includes(catName)) {
      setFilterCategories(filterCategories.filter(c => c !== catName));
    } else {
      setFilterCategories([...filterCategories, catName]);
    }
  };

  // Filtragem Reativa de Dados baseada nos Controles
  const filteredList = useMemo(() => {
    return historyList.filter((item: any) => {
      if (filterData.transactionType !== 'all' && item.transaction !== filterData.transactionType) return false;
      if (filterCategories.length > 0 && !filterCategories.includes(item.category)) return false;

      if (item.date && item.date.length === 3) {
        const itemDate = new Date(`${item.date[0]}-${item.date[1]}-${item.date[2]}T00:00:00`);
        if (filterData.start && itemDate < new Date(`${filterData.start}T00:00:00`)) return false;
        if (filterData.end && itemDate > new Date(`${filterData.end}T23:59:59`)) return false;
      }
      return true;
    });
  }, [historyList, filterCategories, filterData]);

  // -- Preparando os dados para PIECHART --
  const pieData = useMemo(() => {
    const pieMap: Record<string, number> = {};
    filteredList.forEach((item: any) => {
      if (!pieMap[item.category]) pieMap[item.category] = 0;
      pieMap[item.category] += item.valor;
    });
    
    let chartParams = Object.keys(pieMap).map((cat, i) => {
      const color = categoryList.find(c => c.categoria === cat)?.color || "#ffffff";
      return { id: i, label: cat, value: pieMap[cat], color };
    });

    if (chartParams.length === 0) {
      chartParams = [{ id: 0, label: "Nenhum Dado", value: 1, color: "rgba(255,255,255,0.05)" }];
    }
    return chartParams;
  }, [filteredList]);

  // -- Preparando os dados para LINECHART Anual -- (Somatório Entradas e Saidas por Mês)
  const monthlyData = useMemo(() => {
    const arrEntradas = new Array(12).fill(0);
    const arrSaidas = new Array(12).fill(0);

    filteredList.forEach((item: any) => {
      if (item.date && item.date[1]) {
         const monthIndex = parseInt(item.date[1]) - 1; 
         if (monthIndex >= 0 && monthIndex <= 11) {
            if (item.transaction === "entrada") arrEntradas[monthIndex] += parseFloat(item.valor);
            else arrSaidas[monthIndex] += parseFloat(item.valor);
         }
      }
    });
    return { entradas: arrEntradas, saidas: arrSaidas };
  }, [filteredList]);

  const xLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  function categoriaValue(categoria: string) {
    let total = 0;
    filteredList.forEach((item: any) => {
      if (item.category === categoria) {
        total = total + item.valor;
      }
    });
    return total;
  }

  return (
    <div>
      <div className="flex flex-col items-center pt-2 w-full pb-20 relative">
        <h1 className="mt-2 text-xl font-semibold text-white tracking-wide">RELATÓRIOS</h1>
        
        {/* Componente Filter */}
        <div className="flex items-start w-full max-w-[340px] mt-4 px-4 z-20">
          <Filter filterData={filterData} setFilterData={setFilterData} />
        </div>

        {/* Gráficos */}
        <div {...handlers} className="w-full max-w-[340px] flex flex-col items-center mt-4">
          <div className="w-full flex justify-between items-center px-6 mb-2">
            <button 
              onClick={() => setChangeGraph(!changeGraph)} 
              className="hidden sm:flex p-1.5 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-sm font-medium tracking-wider text-text-200">
              {changeGraph ? "VISÃO ANUAL" : "CATEGORIAS"}
            </h2>
            <button 
              onClick={() => setChangeGraph(!changeGraph)} 
              className="hidden sm:flex p-1.5 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="flex justify-center items-center h-[220px] w-full bg-white/5 rounded-3xl p-4 shadow-inner relative z-0">
            <div className={`${changeGraph ? "hidden" : "w-full flex justify-center"}`}>
              <PieChart
                series={[{ innerRadius: 40, outerRadius: 90, data: pieData, arcLabel: (item) => item.label !== "Nenhum Dado" ? `R$${item.value}` : "" }]}
                {...settings}
              />
            </div>
            {/* O LineChart recebe Entradas e Saidas */}
            <div className={`${changeGraph ? "w-full flex justify-center overflow-visible" : "hidden"}`}>
              <LineChart
                height={200}
                margin={{ left: 40, right: 10, top: 20, bottom: 20}} // Adicionado margem pra evitar erro svg
                series={[
                  { data: monthlyData.entradas, color: "#10b981", label: "Entrada" }, 
                  { data: monthlyData.saidas, color: "#ef4444", label: "Saída" }
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                yAxis={[{ width: 50, scaleType: "linear" }]}
              />
            </div>
          </div>
        </div>

        {/* Categories Botoes de Filtragem Múltipla */}
        <div className="flex flex-col w-full max-w-[340px] mt-6 z-10 relative">
          <p className="text-sm font-medium text-text-200 px-4 mb-2">Filtre as Categorias</p>
          
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
            className="absolute left-2 top-11 z-20 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white shadow-lg border border-white/10 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div ref={scrollRef} className="flex gap-4 w-full overflow-x-auto no-scrollbar px-4 py-3 scroll-smooth snap-x">
            {categoryList.map((item) => {
              const isSelected = filterCategories.includes(item.categoria);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCategory(item.categoria)}
                  className={`flex-shrink-0 snap-start flex flex-col justify-center items-center h-24 w-24 rounded-2xl cursor-pointer transition-all border
                    ${isSelected ? "border-white border-2 opacity-100 scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-white/5 opacity-60 hover:opacity-100 shadow-sm"}`}
                  style={{ backgroundColor: item.color }}
                >
                  <div className="flex flex-col justify-center items-center text-xs font-medium w-full h-full pointer-events-none">
                    {item.icon}
                    <p className="text-white mt-1 mb-1 font-bold">{item.categoria}</p>
                  </div>
                  <p className="text-white/90 font-bold text-xs pointer-events-none pb-2 tracking-wide">R$ {categoriaValue(item.categoria)}</p>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
            className="absolute right-2 top-11 z-20 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white shadow-lg border border-white/10 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
