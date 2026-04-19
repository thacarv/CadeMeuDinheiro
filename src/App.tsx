import Balance from "./components/Balance";
import AppMenu from "./components/AppMenu";
import "./css/App.css";
import MiddleBox from "./components/MiddleBox";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "./lib/supabase";
import Login from "./pages/Login";
import { Session } from "@supabase/supabase-js";

// Definição da tipagem das Transações do banco
export type TransactionType = {
  id: string;
  valor: number;
  transaction: string;
  category: string;
  date: string[];
  recurring: string | null;
  frequency: string | null;
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [pageValue, setPageValue] = useState(1);
  const [historyList, setHistoryList] = useState<TransactionType[]>([]);
  const [finalBalance, setFinalBalance] = useState(0);
  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const daysInMonth = new Date(currentYear, parseInt(currentMonth), 0).getDate();
  
  const [filterData, setFilterData] = useState({ 
    transactionType: 'all', 
    start: `${currentYear}-${currentMonth}-01`, 
    end: `${currentYear}-${currentMonth}-${daysInMonth}` 
  });

  const filteredHistoryList = useMemo(() => {
    return historyList.filter((item: any) => {
      if (filterData.transactionType !== 'all' && item.transaction !== filterData.transactionType) return false;
      if (item.date && item.date.length === 3) {
        const itemDate = new Date(`${item.date[0]}-${item.date[1]}-${item.date[2]}T12:00:00`);
        if (filterData.start && itemDate < new Date(`${filterData.start}T00:00:00`)) return false;
        if (filterData.end && itemDate > new Date(`${filterData.end}T23:59:59`)) return false;
      }
      return true;
    });
  }, [historyList, filterData]);

  // Escuta o evento oficial do Navegador que avisa que o App está pronto para ser instalado
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Monitora Autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Buscar dados após login
  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: true });

      if (data && !error) {
        // Mapeia do banco (transaction_type) para o objeto esperado (transaction)
        const formatted = data.map((item) => ({
          id: item.id,
          valor: item.valor,
          transaction: item.transaction_type,
          category: item.category,
          date: item.date_array,
          recurring: item.recurring,
          frequency: item.frequency
        }));
        setHistoryList(formatted);
      }
    }

    fetchData();
  }, [session]);

  useEffect(() => {
    let pos = 0;
    let neg = 0;
    filteredHistoryList.forEach((item) => {
      if (item.transaction === "entrada") pos += item.valor;
      else neg += item.valor;
    });
    setPositiveValue(pos);
    setNegativeValue(neg);
    setFinalBalance(pos - neg);
  }, [filteredHistoryList]);

  // Se não estiver logado, exibe apenas a tela de Login
  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-0 sm:p-4 md:p-8 bg-transparent text-text-100">
      <div className="w-full h-screen sm:h-[90vh] sm:max-h-[850px] max-w-[420px] flex flex-col justify-between relative sm:rounded-[2.5rem] glass-panel shadow-2xl overflow-hidden">
        
        <div className="flex-1 overflow-x-hidden overflow-y-auto no-scrollbar pb-32 px-4 sm:px-6">
          <Balance
            finalBalance={finalBalance}
            positiveValue={positiveValue}
            negativeValue={negativeValue}
            session={session}
            setPageValue={setPageValue}
            filterData={filterData}
            setFilterData={setFilterData}
          />
          <MiddleBox
            pageValue={pageValue}
            setHistoryList={setHistoryList}
            historyList={filteredHistoryList}
            rawHistoryList={historyList}
            session={session}
            setPageValue={setPageValue}
            installPrompt={installPrompt}
            setInstallPrompt={setInstallPrompt}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 pt-16 pb-6 px-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent pointer-events-none">
          <div className="pointer-events-auto">
            <AppMenu pageValue={pageValue} setPageValue={setPageValue} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
