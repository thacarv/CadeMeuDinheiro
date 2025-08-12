import { X } from "lucide-react";
import { categoryList } from "../assets/Files/category";

function ItemObject({ item, removeTransaction }) {
  let itemFull = categoryList.filter((cat) => {
    if (cat.categoria == item.category) {
      return cat.icon;
    }
  });
  let itemIcon = itemFull[0].icon;
  let itemColor = itemFull[0].color;

  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex justify-between  w-60 ">
        <div className="flex items-center">
          <div
            style={{ backgroundColor: itemColor }}
            className="flex justify-center items-center h-8 w-8 rounded-[5px]"
          >
            {itemIcon}
          </div>
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
        onClick={() => removeTransaction(item)}
        className="text-secondary-200"
      >
        <X />
      </button>
    </div>
  );
}

export default ItemObject;
