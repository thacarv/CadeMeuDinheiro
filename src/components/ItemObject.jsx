import { X } from "lucide-react";

function ItemObject({ item, removeTransaction }) {
  return (
    <div key={item.id} className="flex justify-between items-center mb-5">
      <div className="flex justify-between  w-60 ">
        <div className="flex items-center">
          {item.categoryIcon.icon}
          <div className="flex flex-col ml-5">
            {item.category}
            <div>
              {item.date[2]}/{item.date[1]}/{item.date[0]}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {item.transaction === "entrada" ? "+ " : "- "}
          {item.valor}
        </div>
      </div>
      <button
        onClick={() => removeTransaction(item.id)}
        className="text-secondary-200"
      >
        <X />
      </button>
    </div>
  );
}

export default ItemObject;
