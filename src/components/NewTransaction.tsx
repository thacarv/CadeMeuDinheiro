import { v4 } from "uuid";
import { Circle, Shapes, Calendar, CalendarSync, Timer } from "lucide-react";
import { categoryList } from "../assets/Files/category"; // was .jsx, assume works natively
import RadioInput from "./RadioInput";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function NewTransaction({ setHistoryList, historyList }: any) {
  const [valorNumber, setValorNumber] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [dateD, setDateD] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function que vai pegar os valores dos inputs e salvar
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Objeto tipado pro frontend
    const transactionObject = {
      id: v4(),
      valor: parseFloat(formData.get("valor") as string),
      transaction: formData.get("transaction") as string,
      category: formData.get("category") as string,
      date: (formData.get("date") as string).split("-"),
      recurring: formData.get("recurring") as string | null,
      frequency: formData.get("frequency") as string | null,
    };

    // 1. Otimisticamente atualizar UI (Front-end rápido)
    setHistoryList([...historyList, transactionObject]);
    
    // Limpar formulário
    setValorNumber("");
    setCategoryType("");
    setDateD("");

    // 2. Inserir no Banco de Dados Backend (Supabase Postgres)
    const { error } = await supabase.from("transactions").insert([
      {
        id: transactionObject.id,
        valor: transactionObject.valor,
        transaction_type: transactionObject.transaction,
        category: transactionObject.category,
        date_array: transactionObject.date,
        recurring: transactionObject.recurring,
        frequency: transactionObject.frequency
      }
    ]);

    if(error){
      console.error("Erro ao salvar transação no Supabase: ", error);
      // Aqui em um app real poderiamos reverter a UI no caso de fail.
    }
  }

  const handleButtonClick = () => {
    if (!isAnimating) setIsAnimating(true);
  };

  const handleAnimationEnd = () => setIsAnimating(false);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full pb-4"
      >
        <div className="flex flex-col items-center pt-2">
          {/* TITLE */}
          <h1 className="mt-2 text-xl font-semibold tracking-wide text-white">ADICIONAR TRANSAÇÃO</h1>
          {/* DOT MENU */}
          <div className="flex justify-center gap-4 mt-3">
            <Circle fill="#cbd5e1" size={8} className="opacity-50" />
            <Circle fill="#8b5cf6" size={8} />
          </div>
          {/* ADD VALUE */}
          <div className="slide-to-left flex flex-col justify-center items-center w-full">
            <div className="flex justify-center items-baseline w-full max-w-[280px] mt-6 mb-4">
              <h2 className="text-3xl font-bold text-primary-100">R$ </h2>
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
              <RadioInput tipo={"entrada"} />
              <RadioInput tipo={"saída"} />
            </div>
            {/* OPÇÕES */}
            <div className="div-app-content-theme">
              {/* -> Categoria */}
              <label htmlFor="category" className="div-app-content-listdisplay-theme cursor-pointer group">
                <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                  <Shapes />
                  <span>Categoria</span>
                </div>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                  name="category"
                  id="category"
                  className="cursor-pointer outline-none bg-transparent"
                >
                  {categoryList.map((item) => {
                    return (
                      <option key={item.id} value={item.categoria} className="text-black">
                        {item.categoria}
                      </option>
                    );
                  })}
                </select>
              </label>
              {/* -> Data */}
              <label htmlFor="date" className="div-app-content-listdisplay-theme cursor-pointer group">
                <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                  <Calendar />
                  <span>Data</span>
                </div>
                <input
                  value={dateD}
                  onChange={(e) => setDateD(e.target.value)}
                  type="date"
                  name="date"
                  id="date"
                  className="cursor-pointer bg-transparent outline-none"
                  required
                />
              </label>
              {/* -> Recorrente */}
              <label htmlFor="recurring" className="div-app-content-listdisplay-theme cursor-pointer group">
                <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                  <CalendarSync />
                  <span>Recorrente</span>
                </div>
                <div className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="recurring"
                    name="recurring"
                    className="sr-only peer"
                    onChange={() => setIsRecurring(!isRecurring)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-text-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-200"></div>
                </div>
              </label>
              {/* FREQUENCY - SE FOR RECORRENTE - QUANTO EM QUANTO TEMPO  */}
              <label
                htmlFor="frequency"
                className={`${isRecurring ? "div-app-content-listdisplay-theme cursor-pointer group" : "hidden"}`}
              >
                <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                  <Timer />
                  <span>Frequência</span>
                </div>
                <select name="frequency" id="frequency" className="cursor-pointer outline-none bg-transparent">
                  <option value="diario" className="text-black">Diário</option>
                  <option value="semanal" className="text-black">Semanal</option>
                  <option value="quinzenal" className="text-black">Quinzenal</option>
                  <option value="mensal" className="text-black">Mensal</option>
                </select>
              </label>
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
