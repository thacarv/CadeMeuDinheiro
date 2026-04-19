# Documentação Completa: Cadê Meu Dinheiro?

Este documento descreve detalhadamente o funcionamento de ponta a ponta da aplicação **"Cadê Meu Dinheiro?"**, desenvolvida originalmente em React/JavaScript e posteriormente modernizada e convertida para React com **TypeScript** e **Supabase** (Banco de dados de nuvem moderno). 

Se você for um leigo ou estudante iniciante embarcando neste projeto, este material servirá de guia definitivo e explica detalhadamente os principais arquivos da aplicação, como eles se conectam, como as linguagens funcionam juntas e como operamos a arquitetura do banco de dados na nuvem com um alto nível de maturidade e segurança.

---

## Índice
1. [Stack e Tecnologias Base](#1-stack-e-tecnologias-base)
2. [Estrutura do Projeto e Arquitetura UI](#2-estrutura-do-projeto-e-arquitetura-ui)
3. [Entendendo o Banco de Dados Nuvem e Autenticação](#3-entendendo-o-banco-de-dados-nuvem-e-autenticação)
4. [Lógica de Cadastro e Login na Aplicação (Auth)](#4-lógica-de-cadastro-e-login-na-aplicação-auth)
5. [O Ciclo de Vida dos Dados (CRUD)](#5-o-ciclo-de-vida-dos-dados-crud)
6. [O Coração da Aplicação (React Context & State)](#6-o-coração-da-aplicação-react-context--state)

---

## 1. Stack e Tecnologias Base

Para compreender o projeto por completo precisamos entender com o que estamos trabalhando:

* **React + Vite / TypeScript:** É o motor por trás do nosso front-end (site interface). O *React* cuida de desenhar componentes modulares na tela (botões, janelas, textos), e o *TypeScript* garante que as informações fluam sem erros estúpidos e cheios de auto-completar pelo computador, exigindo tipos exatos de dados nas transações. O *Vite* é a ferramenta incrivelmente veloz que organiza tudo isso em um site para ser consumido pelo navageador.
* **Tailwind CSS (v4):** Um framework ultra poderoso para estilo local. Entregue via CSS utilitário, eliminando arquivos infinitos de ".css". Criamos o visual de "Desktop Mobile App" todo feito em **Glassmorphism** (Design moderno via classes puras simulando vidro opaco no topo das imagens de fundo).
* **Supabase:** É um "Backend as a Service". Fazer o que ele faz levaria meses (autenticação de usuário com envio de emails, servidores e escalabilidade em bancos SQL), permitindo salvar os lucros e despesas e acessá-los de qualquer aparelho via integração online.

---

## 2. Estrutura do Projeto e Arquitetura UI

A nossa aplicação vive dentro da pasta `/src`. 

* **`main.tsx` // `index.html`**: Estes não tomam muita atenção, eles apenas formam o tubo de cano inicial que puxa e instacia a nossa aplicação React por cima do vazio HTML.
* **`App.tsx`**: É O controle do avião (O *Componente Raiz* da aplicação). Tudo mora aqui, gerência a entrada dos usuários (se tem sessão ou não), armazena a lista total de gastos/entradas localmente e atualiza cálculos matemáticos espalhando o ganho ou perda de verba globalmente (Balanço).
* **`components/`**: Peças legos que são montadas pelo `App.tsx`.
   * **`Balance.tsx`**: A caixa retangular no topo que exibe saldo final, perdas e ganhos de tudo calculado.
   * **`MiddleBox.tsx`**: Uma grande caixa central e dinâmica da interface, ela quem carrega a transição entre telas (`Analytics`, `Transaction`, `FixedTransaction`).
   * **`Transaction.tsx` e `NewTransaction.tsx`**: Menus de rolagem que listam o histórico de conta e os formulários de inserção.
   * **`AppMenu.tsx`**: O Menu Fixado inferior no rodapé.
* **`pages/Login.tsx`**: Tela exclusiva isolada servida quando o usuário não é detectado com uma sessão autêntica local no banco de dados.
* **`css/App.css`**: Configurações profundas de estilo que os utilitários do Tailwind não cobrem nativamente, como a formação dos blocos translúcidos e animações chaves (Keyframes) deslizantes das páginas.

---

## 3. Entendendo o Banco de Dados Nuvem e Autenticação

### Por que não precisamos criar uma Tabela de Usuários?

A maioria dos iniciantes de Backend acredita que a primeira etapa é criar e gerir uma tabela em Banco SQL chamada **Usuários** (tendo colunas como *email*, *senha secretacriptografada*, *data criação*, *código de verificação*). Porém o Supabase quebra este conceito utilizando um serviço global chamado **GoTrue**.

Quando você cadastra algum novo utilizador, toda a logística de "banco de senhas super-restritas" fica oculta aos seus olhos, num esquema separado chamado `auth`. Dentro do Supabase existe o banco secreto `auth.users`. Nós nunca interagimos manualmente lá para criar login de senhas. Apenas disparamos um script "Sign Up" lá no nosso Front-end e o Supabase se encarrega dos cálculos pesados para garantir que esses usuários estão blindados.

### A Criação de Tabelas da Aplicação (`transactions`)

Apesar da autenticação não ser nosso problema, o **armazenamento dos dados** é! Nós criamos e operamos o banco público com a *Modelagem SQL Inicial*.

Foi criada uma Tabela no PostgreSQL (Banco do Supabase) chamada de `transactions`. Seu intuito é organizar em tabelas cada conta financeira adiconada pelo cliente com essas linhas essenciais:

```sql
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL DEFAULT auth.uid(),
  valor NUMERIC NOT NULL,
  transaction_type TEXT NOT NULL,
  category TEXT NOT NULL,
  date_array TEXT[] NOT NULL
);
```

**Análise dos Termos (Dicionário de Trânsito no SQL):**
- `id`: O identificador Universal Único "ID" exclusivo para não haverem duplicações. (Se repedisse um ID geraria um crash irreversível ao alterar uma conta).
- `user_id`: **ESTE É O SEGREDO**. Ele é uma variável da nossa própria tabela que é linkada *(Foreign Key / FK)* à ID única do banco restrito `auth.users` do Supabase. Como existe esse elo, toda vez que uma despesa é lançada ela é presa com super-cola ao pescoço do e-mail autor/originador ativo na hora da transação.
- `valor NUMERIC NOT NULL`: Declarando que vai ser sempre números de dinheiro. `NOT NULL` exige literalmente que o valor **Nunca Seja Nulo**, se estiver nulo o banco chuta a requisição bloqueando erros na aplicação sem perder tempo do servidor.

### Protegendo as Invasões (A Política RLS - Row Level Security)
Se você enviasse uma chamada à `transactions`, traria as operações do planeta Terra inteiro. RLS significa "Políticas Em Nível-De-Linha". Basicamente criamos paredes no servidor indicando: 
*O usuário Fulano (Com seu token `user_id == fulano`), não importa quais engenharias reversas ele tente construir em códigos de hack front-end, o banco só vai conceder à ele as Linhas na Tabela (`Rows`) no qual ele for categorizado o criador.* Isso livrou e simplificou horas do Backend de ter que filtrar senhas e permissões para buscas.

---

## 4. Lógica de Cadastro e Login na Aplicação (Auth)

A aplicação blinda o carregamento dos arquivos inteiramente no `App.tsx`:
```typescript
  // Se a Constante "Session" estiver falsificada / vazia
  if (!session) {
    return <Login />;
  }

  // Só chega o resto (MiddleBox e Dashboard) caso passar pelo portão acima!  
  return <div className="min-h-screen...
```

### O que acontece quando se preenche `Login.tsx`?

Quando o usuário insere a Senha e E-mail no campo Front-end:
```typescript
    if (isLogin) {
      // Usando API oficial pré-embutida para LOGIN:
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
    } else {
      // Usando API oficial pré-embutida para CADASTRAR NOVA CONTA:
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      // Ele já registra, pre-valida sintaxe email. Criptografa usando 
      // Bcrypt e envia Tokens automáticos!
    }
```

**O Fluxo Perfeito do Login:**
1. Em fração de segundos, e requisição HTTPS vai pro Servidor EUA bater as chaves.
2. É retornado um dado chamado de `Access Token` e de um `Refresh Token`. (A "Coleira VIP").
3. Essa "Coleira VIP" seria normal se a esquecêssemos no instante do refresh de página (perdendo o log-in). Mas não perdemos! O pacote `supabase-js` intercepta, e embute tudo em segredo no cérebro do Web Browser do usuário sem mostrar as chaves, gravando o login permanente.

---

## 5. O Ciclo de Vida dos Dados (CRUD)
*(Create, Read, Update, Delete)*

Não dependemos mais do `localStorage` provisório que some se o aparelho limpar os cookies. Tudo roda na base global de dados real.

### Create (Adicionando a Venda a Vista / Despesa)
Quando clicar em **Salvar** na aba de `NewTransaction.tsx`:

Nós disparamos o fluxo:
```typescript
    const { error } = await supabase.from("transactions").insert([
      {
        id: transactionObject.id, // Um UUID Randomico Gerado agora
        valor: transactionObject.valor, // O Input de texto puxado da Interface visual
        transaction_type: transactionObject.transaction, // Radios do input (ENTRADA/SAIDA)
        category: transactionObject.category, // Categoria Dropdown escolhida do Menu
        date_array: transactionObject.date, // Formatamos string pra lista Data pra ir limpo
      }
    ]);
```
É literalemente assimétrico e idêntico a dizer à uma tabela Excel: *Procure lá na aba 'transactions', se enfie na próxima linha, e preencha as colunas com esses valores.* Nada mais! O Banco recebe, adiciona data temporal de Criação nele, vincula o Dono, e acabou.

### Read (Lendo da Tela de Extrato)
Como a Aba "HISTÓRICO" desenha suas perdas e ganhos magicamente?
No componente global mestre em `App.tsx` temos a função automática chamada "Efeito".

```typescript
  useEffect(() => {
    // Escuta pra ver se alguem logou. Se logou roda tudo para buscar.
    async function fetchData() {
      // Faça contato com Supabase, tente SELECIONAR TODAS AS INFORMAÇÕES e Ordene por criação.
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: true });

      if (data && !error) {
        // Enfeite, modifique para formato Local dos Arrays caso precise e jogue a BOMBA de 
        // dados na Constante de Estado Global do React
        setHistoryList(dataMapeada);
      }
    }
    fetchData();
  }, [session]);
```
Aqui o App pega as colunas e transforma devolta em arrays de objetos Typescript e desenha no Historico usando a repetição (`map` iterador de Array) os `<ItemObject />`.

### Delete (Removendo e Destruindo Lançamentos Errados)
Na Central no componente `MiddleBox.tsx`. Para manter o usuário sem lentidão e tempo de espera (UX Perfeita):

O botão foi clicado. `removeTransaction("ID-Daquele-Cubo_Clicado")` 
```typescript
  async function removeTransaction(itemInfo: any) {
    // 1 - Ação Imediata Visual (Optimistic UI):
    // Cortamos ele da interface do app agora e forçamos fingir q 
    // ja apagou instantaneamente pra a visao desaparecer.
    const newList = historyList.filter((item: any) => itemInfo.id !== item.id);
    setHistoryList(newList);

    // 2 - Nos fundos, assincronamente pedimos ao banco de forma garantida a destruicao:
    await supabase.from("transactions").delete().eq("id", itemInfo.id);
  }
```

---

## 6. O Coração da Aplicação (React Context & State)

Porquê a matemática bate as casas decimais de Saldos positivos sem que nós mandemos o banco enviar esses cálculos prontos no servidor?

O Poder do Motor do **ReactJS** de Renderização Reativa.

No `App.tsx`, há um simples e solitário Efeito (um bloco lógico).

Temos as variáves guardando memórias `historyList`. 
Se inserimos visualmente algo em `historyList`, sem sequer precisarmos dizer ao código pra *"Atualizar Dinheiro Positvo"*. O React aciona como se fosse um alarme de segurança: *Oh Meu Deus!! Mexeram no "historyList", atualizem o Saldo correndo antes que exploda!!*

E este bloco desperta e roda um recálculo total em Micro-Segundos do O e plota na tela sem sequer piscar os resultados nos quadradinhos.

```typescript
  useEffect(() => {
    let pos = 0;
    let neg = 0;
    historyList.forEach((item) => {
      // Loop por tudo já gerado no Banco
      if (item.transaction === "entrada") pos += item.valor;
      else neg += item.valor;
    });
    // Define os estados independentes visuo-físicos na Tela do "Balance.jsx"
    setPositiveValue(pos);
    setNegativeValue(neg);
    setFinalBalance(pos - neg);
  }, [historyList]);
```

Trata-se de uma aplicação de controle e inteligência de base inteiramente "Serverless" e Orientada por Reativos Independentes no DOM com o luxo de ser performática da base do servidor central da Europa ou do Brasil sem interrupções!
