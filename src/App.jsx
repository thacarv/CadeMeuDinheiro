import Balance from "./components/Balance";
import History from "./components/History";
import AppMenu from "./components/AppMenu";
import "./css/App.css";

function App() {
  return (
    <>
      <div className="bg-bg-100 w-screen h-screen">
        <div className="flex flex-col justify-center items-center ">
          <Balance />
          <History />
          <AppMenu />
        </div>
      </div>
    </>
  );
}

export default App;
