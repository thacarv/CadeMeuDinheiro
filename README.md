<p align="center">
  <img src="public/pwa-icon.png" width="150" alt="Logo Cadê Meu Dinheiro">
</p>

<h1 align="center">Cadê Meu Dinheiro? 💸</h1>

<p align="center">
  <strong>🌐 Acesse o aplicativo ao vivo: <a href="https://cybernow.com.br/cademeudinheiro/" target="_blank">cybernow.com.br/cademeudinheiro</a></strong>
</p>

Uma aplicação robusta, PWA-ready e moderna de controle financeiro desenvolvida em React e TypeScript para ajudar você a visualizar e cuidar do seu dinheiro de forma limpa e segura.

## O que ela faz

- **Registro Ágil:** Lançamento rápido do valor, categoria (Lazer, Casa, Contas, etc) e data. Dá para configurar para despesas normais ou saídas recorrentes na aba de Transações Fixas.
- **Gráficos e Relatórios:** Você vai enxergar para onde o seu dinheiro está vazando. Inclui um gráfico anual de montante (ganhos contra perdas nos meses), e separações por categorias. O sistema filtra com clique múltiplo o que você quiser ver ao vivo.
- **Autenticação:** O sistema salva tudo direto na nuvem usando o Supabase. Ninguém além de você vê seus dados de gasto, bloqueado através da tela inicial de login e arquitetura RLS.
- **Mobile/Web First:** Interface escura baseada em Glassmorphism responsivo. Suave ao mouse do PC e programada para interações de arrastar pelo dedo no celular.

## Como Rodar Localmente

Certifique-se de ter o `Node.js` e o `npm` na sua máquina.

1. Baixe o repositório/pasta e, no terminal, baixe as dependências:
   ```bash
   npm install
   ```

2. Crie e preencha as variáveis de ambiente:
   Na raiz da pasta, crie um arquivo chamado `.env` com o link e chave que o painel do seu Supabase te der. Exemplo:
   ```env
   VITE_SUPABASE_URL=seu_url_aqui
   VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
   ```
   *(Atenção: Não se esqueça de rodar o script SQL de criação da tabela de despesas detalhado no seu painel do Supabase Editor como ensinado na `DOCUMENTACAO.md` do projeto).*

3. Suba o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

A página vai estar te esperando na porta rodando pelo localhost no seu navegador!

---
**Tecnologias envolvidas:** ⚙️ React, Vite, TypeScript, TailwindCSS v4, Supabase (GoTrue Auth Serverless) e MUI-X Charts.
