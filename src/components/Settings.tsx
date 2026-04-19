import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ArrowLeft, Edit3, Mail, Lock, DownloadCloud, LogOut } from "lucide-react";

export default function Settings({ session, setPageValue, installPrompt, setInstallPrompt }: any) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone === true;
    setIsIOS(isIosDevice && !isStandalone);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || "");
      setDisplayName(session.user.user_metadata?.display_name || "");
    }
  }, [session]);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const updates: any = {};
      
      if (email && email !== session.user.email) updates.email = email;
      if (password) updates.password = password;
      if (displayName !== session.user.user_metadata?.display_name) {
        updates.data = { display_name: displayName };
      }

      if (Object.keys(updates).length === 0) {
        setMessage({ text: "Nenhuma alteração foi feita.", type: "info" });
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.updateUser(updates);

      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({ 
          text: updates.email ? "Configurações atualizadas! Verifique seu novo e-mail para confirmar a troca." : "Conta atualizada com sucesso!", 
          type: "success" 
        });
        setPassword(""); // Clear password field for security
      }
    } catch (err: any) {
      setMessage({ text: "Ocorreu um erro ao atualizar.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-2 w-full pb-20 fade-in">
      {/* HEADER BAR */}
      <div className="w-full flex justify-between items-center px-4 mb-6">
        <button 
          onClick={() => setPageValue(1)}
          className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white tracking-wide">MINHA CONTA</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="w-full max-w-[340px] px-2 flex flex-col gap-4">
        {message.text && (
          <div className={`w-full rounded-xl p-3 text-sm text-center font-medium border
            ${message.type === 'error' ? 'bg-secondary-200/20 text-secondary-200 border-secondary-200/50' : 
              message.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 
              'bg-blue-500/20 text-blue-400 border-blue-500/50'}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="flex flex-col gap-5 w-full">
          {/* DISPLAY NAME */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold tracking-wider text-text-200 mb-2 pl-1 ml-1 uppercase">Nome Exibido</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Edit3 size={18} />
              </div>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 pl-12 text-white outline-none focus:border-primary-100 transition-colors shadow-inner"
                placeholder="Ex. thiago_carv"
              />
            </div>
            <p className="text-[10px] text-white/40 ml-2 mt-1">Como você será chamado no topo do App.</p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold tracking-wider text-text-200 mb-2 pl-1 ml-1 uppercase">Email Autenticado</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 pl-12 text-white outline-none focus:border-primary-100 transition-colors shadow-inner"
                required
              />
            </div>
          </div>

          {/* SENHA */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold tracking-wider text-text-200 mb-2 pl-1 ml-1 uppercase">Nova Senha</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 pl-12 text-white outline-none focus:border-primary-100 transition-colors shadow-inner"
                placeholder="•••••••• (opcional)"
              />
            </div>
            <p className="text-[10px] text-white/40 ml-2 mt-1">Deixe em branco se não quiser alterar.</p>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`button-active w-full mt-4 h-12 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center transition-all shadow-lg ${isLoading ? "opacity-50 cursor-not-allowed saturate-50" : ""}`}
          >
            {isLoading ? "SALVANDO MUDANÇAS..." : "APLICAR MUDANÇAS"}
          </button>
        </form>

        {/* LOGOUT BUTTON */}
        <button 
          type="button"
          onClick={async () => await supabase.auth.signOut()}
          className="w-full h-12 mt-2 bg-secondary-200/5 text-secondary-200 border border-secondary-200/20 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center transition-all hover:bg-secondary-200/10"
        >
          <LogOut size={18} className="mr-2" />
          SAIR DA CONTA
        </button>

        {/* PWA INSTALL COMPONENT */}
        {installPrompt ? (
          <div className="flex flex-col mt-2 pt-6 border-t border-white/10">
            <button 
              type="button"
              onClick={handleInstallApp}
              className="w-full h-12 bg-primary-100/10 text-primary-100 border border-primary-100/30 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center transition-all shadow-lg hover:bg-primary-100/20"
            >
              <DownloadCloud size={18} className="mr-2" />
              INSTALAR APLICATIVO
            </button>
            <p className="text-[10px] text-white/40 text-center mt-2 px-4 leading-tight">
              Acesse o aplicativo diretamente pela tela de início do seu dispositivo celular.
            </p>
          </div>
        ) : isIOS ? (
          <div className="flex flex-col mt-2 pt-6 border-t border-white/10">
            <div className="w-full p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-3 shadow-inner">
               <div className="text-white/40"><DownloadCloud size={24} /></div>
               <p className="text-xs text-white/80 text-center leading-relaxed">
                 Para instalar no iPhone, toque no botão de <strong>Compartilhar</strong> (quadrado com seta pra cima) no rodapé do Safari e selecione <strong>"Adicionar à Tela de Início"</strong>.
               </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
