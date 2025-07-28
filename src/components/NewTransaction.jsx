import { Circle, Shapes, Calendar, CalendarSync, Timer } from "lucide-react";
import { categoryList } from "../assets/Files/category.jsx";
import RadioInput from "./RadioInput.jsx";

function NewTransaction() {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const valor = formData.get("valor");
    const transaction = formData.get("transaction");
    const category = formData.get("category");
    const date = formData.get("date");
    const recurring = formData.get("recurring");
    const frequency = formData.get("frequency");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-h-[50vh] mt-3 overflow-scroll"
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
          <div className="flex justify-center items-baseline w-80 mt-7">
            <h2 className="text-4xl font-bold text-text-200">R$ </h2>
            <input
              type="number"
              name="valor"
              placeholder="0.000,00"
              className="w-50 outline-none text-4xl ml-2 "
              step=".01"
              required
            />
          </div>
          {/* BARRA */}
          <div className="w-70 h-1.5 bg-linear-65 from-primary-100 to-primary-200 rounded-2xl"></div>
        </div>
        {/* BOTÃO DE ENTRADA E SAÍDA */}
        <div className="flex justify-around items-center mt-10">
          <RadioInput tipo={"entrada"} />
          <RadioInput tipo={"saída"} />
        </div>
        {/* OPÇÕES */}
        <div className="div-app-content-theme">
          {/* -> Categoria */}
          <div className="div-app-content-listdisplay-theme">
            <div>
              <Shapes />
              <label htmlFor="category">Categoria</label>
            </div>
            <select name="category" id="category" className="">
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
            <input type="date" name="date" id="date" required />
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
                value="sim"
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  dark:bg-text-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-200"></div>
            </label>
          </div>
          {/* FREQUENCY - SE FOR RECORRENTE - QUANTO EM QUANTO TEMPO  */}
          <div className=" div-app-content-listdisplay-theme ">
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
            className="h-[5vh] w-[30vw] rounded-2xl bg-primary-200 text-primary"
            type="submit"
          >
            SALVAR
          </button>
        </div>
      </form>
    </>
  );
}

export default NewTransaction;
