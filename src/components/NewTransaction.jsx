import { v4 } from "uuid";

import { Circle, Shapes, Calendar, CalendarSync, Timer } from "lucide-react";
import { categoryList } from "../assets/Files/category.jsx";
import RadioInput from "./RadioInput.jsx";
import { useState } from "react";

function NewTransaction({ setHistoryList, historyList, updateBalance }) {
  const [valorNumber, setValorNumber] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [dateD, setDateD] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function que vai pegar os valores dos inputs e salvar
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const transactionObject = {
      id: v4(),
      valor: parseFloat(formData.get("valor")),
      transaction: formData.get("transaction"),
      category: formData.get("category"),
      categoryIcon: categoryList.find((cat) => {
        if (cat.categoria === formData.get("category")) {
          return cat;
        }
      }),
      date: formData.get("date").split("-"),
      recurring: formData.get("recurring"),
      frequency: formData.get("frequency"),
    };
    setHistoryList([...historyList, transactionObject]);
    setValorNumber("");
    setCategoryType("");
    setDateD("");
    updateBalance(transactionObject);
    console.log(transactionObject);
  }

  // Função de clique para iniciar a animação
  const handleButtonClick = () => {
    // Previne animações múltiplas
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  // Função para resetar o estado quando a animação termina
  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-h-[50vh] mt-3 overflow-scroll "
      >
        <div className="flex flex-col items-center ">
          {/* TITLE */}
          <h1 className="mt-4 text-2xl">ADICIONAR TRANSAÇÃO</h1>
          {/* DOT MENU */}
          <div className="flex justify-around w-20 mt-3 text-gray-400">
            <Circle fill="#99a1af" size={10} />
            <Circle color="pink" fill="pink" size={10} />
          </div>
          {/* ADD VALUE */}
          <div className="slide-to-left flex flex-col justify-center items-center">
            <div className="flex justify-center items-baseline w-80 mt-7 ">
              <h2 className="text-4xl font-bold text-text-200">R$ </h2>
              <input
                type="number"
                name="valor"
                value={valorNumber}
                onChange={(e) => setValorNumber(e.target.value)}
                placeholder="0.000,00"
                className="w-50 outline-none text-4xl ml-2 "
                step=".01"
                required
              />
            </div>
            {/* BARRA */}
            <div className="w-70 h-1.5 bg-linear-65 from-primary-100 to-primary-200 rounded-2xl"></div>

            {/* BOTÃO DE ENTRADA E SAÍDA */}
            <div className="flex justify-around items-center mt-10">
              <RadioInput tipo={"entrada"} category={"radio"} />
              <RadioInput tipo={"saída"} category={"radio"} />
            </div>
            {/* OPÇÕES */}
            <div className="div-app-content-theme">
              {/* -> Categoria */}
              <div className="div-app-content-listdisplay-theme">
                <div>
                  <Shapes />
                  <label htmlFor="category">Categoria</label>
                </div>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                  name="category"
                  id="category"
                  className=""
                >
                  {categoryList.map((item) => {
                    return (
                      <option key={item.id} value={item.categoria}>
                        {item.categoria}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* -> Data */}
              <div className="div-app-content-listdisplay-theme">
                <div>
                  <Calendar />
                  <label htmlFor="date">Data</label>
                </div>
                <input
                  value={dateD}
                  onChange={(e) => setDateD(e.target.value)}
                  type="date"
                  name="date"
                  id="date"
                  required
                />
              </div>
              {/* -> Recorrente */}
              <div className="div-app-content-listdisplay-theme">
                <div>
                  <CalendarSync />
                  <label htmlFor="recurring">Recorrente</label>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="recurring"
                    name="recurring"
                    className="sr-only peer"
                    onChange={() => {
                      setIsRecurring(!isRecurring);
                    }}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  dark:bg-text-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-200"></div>
                </label>
              </div>
              {/* FREQUENCY - SE FOR RECORRENTE - QUANTO EM QUANTO TEMPO  */}
              <div
                className={`${
                  isRecurring ? "div-app-content-listdisplay-theme" : "hidden"
                } `}
              >
                <div className="flex">
                  <Timer />
                  <label htmlFor="frequency">Frequência</label>
                </div>
                <select name="frequency" id="frequency">
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </div>
              <button
                onClick={handleButtonClick}
                onAnimationEnd={handleAnimationEnd}
                className={`button-new-transaction ${
                  isAnimating ? "animating" : ""
                }`}
                type="submit"
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewTransaction;
