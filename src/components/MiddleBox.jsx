import Analytics from "./Analytics";
import FixedTransactions from "./FixedTransactions";
import Transaction from "./Transaction";

function MiddleBox({ mockList }) {
  return (
    <>
      <div className="div-app-theme h-[52vh] z-1">
        <div className="">
          <Transaction mockList={mockList} />
        </div>
        {/* <FixedTransactions mockList={mockList} /> */}
        {/* <Analytics /> */}
      </div>
    </>
  );
}
export default MiddleBox;
