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
        </div>
      </div>
    </>
  );
}

export default Filter;
