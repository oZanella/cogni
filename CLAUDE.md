# Cogni — Registro de Pensamentos (TCC)

## Sobre o Projeto

Web app mobile-first de saúde mental. O paciente registra o que sentiu durante uma crise
(situação, emoções e pensamento automático) em um fluxo curto de passos, substituindo diários
de papel e planilhas. O histórico organizado pode ser compartilhado com a psicóloga.

**Design:** minimalista, cores neutras e calmas (off-white, verde sálvia, azul pastel). Evitar
qualquer elemento que gere sobrecarga visual ou ansiedade — sem vermelhos saturados, sem excesso
de informação por tela.

Este projeto reaproveita a stack e as convenções do **WindelCRM** (`web/core`), adaptadas para uma
aplicação full-stack única, sem backend GraphQL separado.

## Stack

| Tecnologia      | Versão   |
| --------------- | -------- |
| Node.js         | 20+      |
| Next.js         | 15.5.9   |
| React           | 19       |
| TypeScript      | 5        |
| Tailwind CSS    | 4        |
| shadcn/ui       | Radix    |
| TanStack Query  | 5        |
| React Hook Form | 7        |
| Zod             | 4        |
| Prisma          | 6.6.0    |
| PostgreSQL      | 15+      |
| Auth.js (NextAuth) | 5 (beta), Credentials + JWT |

Diferença chave em relação ao CRM: **não há backend GraphQL separado**. É um único app Next.js
que fala com o banco via Prisma através de Server Actions, expostas ao client por hooks do
TanStack Query — mesma regra do CRM de "toda comunicação com API passa por hooks React Query".

## Rodar Localmente

```bash
docker compose up -d postgres   # sobe o Postgres (porta 5442)
npm install
npm run psm:dev                 # aplica migrations
npm run dev                     # inicia (porta 3010)
```

**DB:** `localhost:5442` → `cogni-local`

## Estrutura de Pastas

```
src/
├── app/                      # Next.js App Router
│   ├── entrar/, cadastro/    # rotas públicas de autenticação
│   ├── (app)/                # rotas autenticadas com bottom nav (inicio, historico)
│   ├── registro/novo/        # wizard de registro, tela cheia sem navegação
│   └── api/auth/[...nextauth]/
├── features/                 # Módulos de funcionalidade
│   ├── auth/
│   └── registro-pensamento/
├── components/
│   ├── ui/                   # shadcn/ui (Radix)
│   ├── layout/                # bottom-nav, etc.
│   └── business/              # componentes de domínio reutilizáveis (RegistroCard)
├── providers/                # QueryProvider, SessionProvider, ThemeProvider
├── lib/                      # prisma.ts, auth.ts, utils.ts
└── shared/                   # enums, enum-maps, schemas globais
```

## Padrão de Feature

```
<nome>/
├── ui/
│   └── <tela>/
│       ├── view/              # Componente React da tela
│       └── hooks/              # Hooks da tela (useForm, handlers)
├── data/
│   ├── actions/                # Server Actions ('use server') — acesso ao Prisma
│   ├── hooks/                  # Hooks React Query (useQuery/useMutation) sobre as actions
│   └── <feature>.keys.ts       # Query key factory
└── shared/
    ├── types/                  # Tipos TypeScript da feature
    └── schemas/                 # Schemas Zod de validação
```

`registro-pensamento` concentra as telas de início (`ui/inicio`), novo registro (`ui/novo`) e
histórico (`ui/historico`) porque todas operam sobre a mesma entidade — evita import cruzado
entre features.

## Regras e Convenções

- **Responder e nomear tudo em Português do Brasil (PT-BR)**, independentemente do idioma da
  mensagem do usuário.
- Nunca usar `any` explícito em TypeScript.
- Nunca usar `console.log` sem que seja solicitado.
- **App Router** do Next.js — não usar Pages Router.
- Componentes de UI genéricos ficam em `src/components/`, lógica de negócio em `src/features/`.
- Nunca importar de `src/features/X` dentro de `src/features/Y` — features são independentes.
- Toda comunicação com o banco passa por Server Action + hook React Query — nunca Prisma direto
  no componente, nunca fetch/axios manual.
- Validação de formulários **sempre** com Zod schema + `react-hook-form`. Nunca `useState` para
  controlar campos de formulário.
- Estilos com Tailwind CSS — nunca CSS modules ou styled-components.
- Nomes de arquivos em kebab-case: `registro-card.tsx`, `use-historico.hook.ts`.
- Componentes exportados como named exports, nunca default export em features.
- Paleta de cores calma definida em `src/app/globals.css` (tokens `--primary` verde sálvia,
  `--secondary`/`--accent` azul pastel, `--background` off-white) — não usar cores fora dos
  tokens do tema.

## Testes

```bash
npm run test        # Jest + React Testing Library
npm run lint         # ESLint
```

## Banco de Dados

```bash
npm run psm:dev      # prisma migrate dev
npm run psm:studio   # interface visual
```

Schema em `prisma/schema/` (multi-arquivo, uma entidade por arquivo, igual ao CRM).
