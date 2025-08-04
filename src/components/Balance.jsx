import { ArrowDown, ArrowUp } from "lucide-react";

function Balance({ finalBalance, positiveValue, negativeValue }) {
  return (
    <>
      <div className="div-app-theme flex flex-col justify-center items-center h-[12vh] mt-20 mb-15  z-1">
        <p className="text-text-200 ">MEU SALDO</p>
        {/* Receber o valor do saldo */}
        <div className="flex items-end max-w-[65vw] max-h-[4.5vh] overflow-y-auto no-scrollbar ">
          <p className="text-lg text-text-200 mr-1">R$ </p>
          <p className="text-4xl text-text-100  font-bold ">{finalBalance}</p>
        </div>
        {/* Receber os valores de entrada e saída */}
        <div className="flex justify-between items-center w-[60vw] py-2 text-xl">
          <div className="flex text-secondary-100">
            <ArrowUp />
            <p>R$ {positiveValue}</p>
          </div>
          <div className="flex text-secondary-200">
            <ArrowDown />
            <p>R$ {negativeValue}</p>
          </div>
        </div>
      </div>
      <div className="bg-image-theme absolute top-0 left-0 h-74.5 w-full  mix-blend-multiply z-0"></div>
    </>
  );
}

export default Balance;
