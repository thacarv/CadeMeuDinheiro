import { categoryList } from "../assets/Files/category";

import { ArrowDownWideNarrowIcon } from "lucide-react";
import { useState } from "react";

function Filter() {
  const [filterDown, setFilterDown] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setFilterDown(!filterDown)}>
          <ArrowDownWideNarrowIcon />
        </button>
        {/*  MAIN DIV */}
        <div
          className={`${
            filterDown == true
              ? "flex flex-col h-50vh pb-2 border-b-1 border-black"
              : "hidden"
          }`}
        >
          {/*  Transaction */}
          <div className="flex justify-around mt-5">
            <button>ENTRADA</button>
            <button>SAÍDA</button>
          </div>
          {/*  Date */}
          <div className="flex justify-around mt-5">
            <input type="date" name="dateStart" id="dateStart" />
            <input type="date" name="dateEnd" id="dateEnd" />
          </div>
          {/*  Categories */}
          <div className="grid grid-cols-14 gap-20  max-w-[78vw] mt-5 overflow-x-scroll">
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
                <p>R$ 10</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
