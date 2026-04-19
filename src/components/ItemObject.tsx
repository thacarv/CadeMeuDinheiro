import { X } from "lucide-react";
import { categoryList } from "../assets/Files/category";
import { formatCurrency } from "../utils/formatCurrency";

function ItemObject({ item, removeTransaction }: any) {
  let itemFull = categoryList.filter((cat) => {
    if (cat.categoria == item.category) {
      return cat.icon;
    }
  });
  let itemIcon = itemFull[0].icon;
  let itemColor = itemFull[0].color;

  return (
    <div className="flex justify-between items-center mb-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors w-full">
      <div className="flex items-center flex-1 overflow-hidden">
        <div
          style={{ backgroundColor: itemColor }}
          className="flex justify-center items-center h-12 w-12 rounded-[14px] shadow-sm flex-shrink-0 bg-opacity-20 backdrop-blur-sm"
        >
          {itemIcon}
        </div>
        <div className="flex flex-col ml-4 overflow-hidden">
          <span className="font-semibold text-white tracking-wide truncate">{item.category}</span>
          <span className="text-xs text-text-200 mt-0.5">
             {item.date[2]}/{item.date[1]}/{item.date[0]}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-bold tracking-wider ${item.transaction === 'entrada' ? 'text-secondary-100' : 'text-secondary-200'}`}>
          {item.transaction === "entrada" ? "+" : "-"} {formatCurrency(item.valor)}
        </span>
        <button
          onClick={() => removeTransaction(item)}
          className="text-text-200 hover:text-white transition-colors p-1"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default ItemObject;
