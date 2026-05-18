<div align="center">

# 💰 Finanças — Organizador Pessoal

**Aplicação web completa para controle financeiro pessoal**
**com múltiplos bancos, parcelamentos automáticos e relatórios visuais.**

![Version](https://img.shields.io/badge/versão-2.0-4d9fff?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-ready-4dff91?style=flat-square)
![Next.js](https://img.shields.io/badge/frontend-Next.js-000?style=flat-square)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2d3748?style=flat-square)
![Supabase](https://img.shields.io/badge/backend-Supabase-3ecf8e?style=flat-square)
![License](https://img.shields.io/badge/licença-MIT-a78bfa?style=flat-square)

<br>

[🚀 Demo ao vivo](#) · [📖 Como usar](#-como-usar) · [⚙️ Instalação](#️-instalação) · [🗄️ Banco de dados](#️-banco-de-dados)

<br>

</div>

---


## 🧱 Stack Next.js + Prisma

O projeto agora roda em **Next.js**. A aplicação legada foi preservada como assets estáticos em `public/`, enquanto o App Router fornece a rota inicial e endpoints de backend.

- `app/page.tsx` redireciona `/` para a experiência web existente em `/index.html`.
- `public/` concentra HTML, CSS, JavaScript, manifesto PWA, service worker e ícones estáticos.
- `prisma/schema.prisma` define o modelo inicial PostgreSQL para usuários, bancos, meses, pessoas e transações.
- `lib/prisma.ts` centraliza o `PrismaClient` para evitar múltiplas conexões em desenvolvimento.
- `app/api/health/route.ts` expõe um health check que valida a conexão Prisma quando `DATABASE_URL` está configurada.

### Rodando localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Para gerar o bundle estático legado e compilar o Next.js:

```bash
npm run build
npm run start
```

### Prisma

Configure `DATABASE_URL` no `.env` apontando para um PostgreSQL e rode:

```bash
npm run prisma:generate
npm run prisma:migrate
```

O endpoint `/api/health` retorna `database: "connected"` quando a conexão com o banco está saudável.

## ✨ Funcionalidades

### 📊 Dashboard Completo
- **Cards de resumo** — Total gastos, meus gastos, a receber, entradas e saldo
- **Barra de meta** — Acompanhe seus limites de gastos com indicadores visuais
- **Alertas inteligentes** — Avisos quando atingir 80% da meta ou ultrapassar o limite
- **Vencimentos próximos** — Notifica contas fixas que vencem nos próximos 3 dias

### 🏦 Múltiplos Bancos
- Crie quantos bancos quiser (Nubank, Will, Mercado Pago, etc.)
- Cada banco com **cor personalizada** (16 cores disponíveis)
- Alternância rápida entre bancos por abas
- Totais separados por banco nos relatórios

### 💳 Parcelamentos Automáticos
- Registre compras parceladas (2x a 60x)
- **Parcelas futuras são injetadas automaticamente** nos meses seguintes
- Visualize detalhes do parcelamento (parcela atual, total, valor restante)
- Cancele parcelas futuras individualmente ou todas de uma vez

### 👥 Controle de Pessoas
- Separe gastos entre **"meu"** e **"de outra pessoa"**
- Saiba exatamente quanto cada pessoa te deve
- Histórico completo de compras por pessoa em todos os meses
- Chips rápidos para selecionar pessoas já cadastradas

### 📱 Pix & Contas Fixas
- **Pix enviados** — Registre com destinatário, banco de origem e motivo
- **Contas fixas** — Aluguel, água, luz com dia de vencimento
- Contas fixas são copiadas automaticamente ao criar mês com "Copiar mês anterior"

### 💵 Entradas (Receitas)
- Registre salário, freelas, transferências
- Separe entre dinheiro seu e de outras pessoas
- Controle de quem te deve e quanto

### 📋 Assinaturas
- Cadastre Netflix, Spotify, iCloud, etc.
- Organize por banco/cartão
- Veja total mensal e projeção anual
- Marque como cancelada (com data)

### 📈 Relatórios
- **Por banco** — Barras comparativas com totais
- **Por categoria** — Mercado, Moto, Saúde, Lazer, etc.
- **Por pessoa** — Quem mais comprou no seu cartão
- **Comparativo mensal** — Este mês vs anterior
- **Resumo anual** — Todos os meses do ano em barras visuais

### 🤖 Importação com IA
- Cole texto do extrato e o parser interpreta automaticamente
- Reconhece formatos como:
  - `eu: 55 + 25 + 44` → 3 gastos meus
  - `Sogra: 13 + 44` → 2 gastos da Sogra
  - `iFood 32,00` → gasto normal
  - `Moto 195 1/12` → parcelado, parcela 1 de 12
- Selecione quais lançamentos importar
- Edite valores antes de importar

### 🔐 Autenticação & Sync
- Login/cadastro com e-mail e senha
- Dados salvos na nuvem (Supabase)
- Sincronização em tempo real
- Indicador visual de sync (bolinha verde/laranja)
- Cada usuário vê **apenas seus próprios dados** (RLS)

### 🎨 Tema Dark/Light
- Alternância com um clique
- Preferência salva localmente
- 2 temas completos com variáveis CSS

### 📲 PWA (Progressive Web App)
- Instale no celular como app nativo
- Funciona offline (cache via Service Worker)
- Ícone na tela inicial
- Tela cheia sem barra do navegador

### 💾 Backup & Export
- **Exportar JSON** — Backup completo dos dados
- **Importar JSON** — Restaure de qualquer dispositivo
- **Exportar PDF** — Relatório mensal formatado para impressão

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **Next.js** | App Router, rotas server-side e deploy Vercel |
| **Prisma** | ORM e modelagem do banco PostgreSQL |
| **HTML5 / CSS3 / JavaScript ES6+** | Interface legada preservada em `public/` |
| **Supabase** | Auth e dados atuais do app legado |
| **Service Worker** | Cache offline (PWA) |
| **DM Sans / DM Mono** | Tipografia (Google Fonts) |

---

## ⚙️ Instalação

### Pré-requisitos
- Node.js 20+
- Um banco PostgreSQL para o Prisma
- Conta no Supabase se for usar o fluxo legado de autenticação/dados
- Conta no Vercel para deploy recomendado

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/financas-site.git
cd financas-site
npm install
cp .env.example .env
```

### 2. Configure ambiente

Preencha o `.env` com `DATABASE_URL` e, se continuar usando o backend legado, com `SUPABASE_URL` e `SUPABASE_ANON_KEY`. O arquivo de configuração do app legado fica em `public/js/supabase-config.js`.

### 3. Prepare o Prisma

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Rode localmente

```bash
npm run dev
```

### 5. Deploy

O `vercel.json` já está configurado para Next.js. No Vercel, cadastre as variáveis de ambiente e use o build padrão do projeto:

```bash
npm run build
```

### 🗺️ Roadmap

 - Autenticação com Supabase
 - CRUD completo (meses, bancos, lançamentos)
 - Parcelamentos automáticos
 - Relatórios visuais
 - PWA com cache offline
 - Tema dark/light
 - Backup JSON + Export PDF
 - Gráficos com Chart.js (pizza, linha)
 - Notificações push de vencimentos
-  Compartilhar relatório por link
-  Modo offline completo com sync posterior
 - Importação de extrato OFX/CSV
 - Multi-idioma (EN/ES)


# 🤝 Contribuindo
Faça um fork do projeto
Crie uma branch (git checkout -b feature/nova-funcionalidade)
Commit suas mudanças (git commit -m 'feat: nova funcionalidade')
Push para a branch (git push origin feature/nova-funcionalidade)
Abra um Pull Request

# 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

