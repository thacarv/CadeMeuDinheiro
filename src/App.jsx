import Balance from "./components/Balance";
import AppMenu from "./components/AppMenu";
import "./css/App.css";
import MiddleBox from "./components/MiddleBox";
import { categoryList } from "./assets/Files/category";

function App() {
  const mockList = [
    {
      id: 1,
      value: 1200,
      date: "06/12/2024",
      entrada: true,
      categoria: "salario",
      icon: categoryList[0].icon,
      fixed: true,
      frequency: "mensal",
    },
    {
      id: 2,
      value: 100,
      date: "09/04/2025",
      entrada: false,
      categoria: "transporte",
      icon: categoryList[9].icon,
      fixed: false,
      frequency: "",
    },
    {
      id: 3,
      value: 50,
      date: "15/05/2025",
      entrada: false,
      categoria: "internet",
      icon: categoryList[7].icon,
      fixed: true,
      frequency: "mensal",
    },
    {
      id: 4,
      value: 200,
      date: "24/05/2025",
      entrada: false,
      categoria: "supermercado",
      icon: categoryList[8].icon,
      fixed: false,
      frequency: "",
    },
    {
      id: 5,
      value: 500,
      date: "27/05/2025",
      entrada: true,
      categoria: "deposito",
      icon: categoryList[1].icon,
      fixed: false,
      frequency: "",
    },
  ];
  return (
    <>
      <div className=" w-screen h-screen overflow-hidden ">
        <div className="flex flex-col justify-center items-center ">
          <Balance />
          <MiddleBox mockList={mockList} />
          <AppMenu />
        </div>
      </div>
    </>
  );
}

export default App;
