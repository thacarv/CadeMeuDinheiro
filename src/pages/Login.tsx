import { useState } from "react";
import { supabase } from "../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    // XSS / Script Injection Basic Prevention
    if (/[<>]/.test(email)) {
      setError("E-mail contém caracteres inválidos ou scripts não permitidos.");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) setError("Credenciais Inválidas ou Incorretas.");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: import.meta.env.VITE_AUTH_REDIRECT_URL
          }
        });
        if (error) {
          setError(error.message);
        } else {
          setSuccessMsg("Conta criada com sucesso! Você pode fazer o Login.");
          // Switch to login tab automatically to facilitate ux
          setIsLogin(true);
          setPassword("");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 bg-transparent text-text-100">
      <div className="w-full h-[90vh] max-h-[850px] max-w-[420px] p-8 flex flex-col justify-center items-center glass-panel shadow-2xl rounded-[2.5rem]">
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide text-center">
          {isLogin ? "BEM-VINDO" : "CRIAR CONTA"}
        </h1>
        <p className="text-text-200 text-sm mb-10 text-center">
          O controle do seu dinheiro na palma da sua mão.
        </p>

        {error && <div className="w-full bg-secondary-200/20 text-secondary-200 rounded-xl p-3 mb-6 text-sm text-center font-medium border border-secondary-200/50">{error}</div>}
        {successMsg && <div className="w-full bg-emerald-500/20 text-emerald-400 rounded-xl p-3 mb-6 text-sm text-center font-medium border border-emerald-500/50">{successMsg}</div>}
        
        <form onSubmit={handleAuth} className="w-full flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium tracking-wide text-text-200 mb-2 pl-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-primary-100 transition-colors shadow-inner"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium tracking-wide text-text-200 mb-2 pl-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-primary-100 transition-colors shadow-inner"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`button-active w-full mt-4 h-14 font-bold tracking-wide text-lg flex items-center justify-center transition-all ${isLoading ? "opacity-50 cursor-not-allowed saturate-50" : ""}`}
          >
            {isLoading ? "PROCESSANDO..." : (isLogin ? "ENTRAR" : "CADASTRAR")}
          </button>
        </form>
        
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setSuccessMsg("");
          }}
          className="mt-8 text-sm font-medium text-text-200 hover:text-white transition-colors cursor-pointer"
        >
          {isLogin ? "Não possui uma conta? Criar agora." : "Já possui conta? Faça o login."}
        </button>
      </div>
    </div>
  );
}

export default Login;
