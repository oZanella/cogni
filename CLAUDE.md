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

Continua sendo **um único app Next.js** (sem servidor separado) — mas dentro de `src/` o código é
separado por responsabilidade em `api/` (acesso a dados) e `web/` (interface). Duas pastas ficam
fora dessa divisão porque o Next.js exige essa localização exata: `src/app/` (rotas do App Router)
e `src/middleware.ts`.

```
src/
├── app/                        # Next.js App Router (rotas/layouts — local fixo do framework)
│   ├── entrar/, cadastro/      # rotas públicas de autenticação
│   ├── (app)/                  # rotas autenticadas com bottom nav (inicio, historico)
│   ├── registro/novo/          # wizard de registro, tela cheia sem navegação
│   └── api/auth/[...nextauth]/
├── middleware.ts                # local fixo do framework
│
├── api/                         # Backend: tudo que acessa o banco ou roda só no servidor
│   ├── lib/                     # prisma.ts, auth.ts (config NextAuth), next-auth.d.ts
│   ├── shared/enums/             # enums espelhando o schema Prisma (ex: emocao.ts)
│   └── features/<nome>/
│       ├── actions/              # Server Actions ('use server') — única porta de entrada ao Prisma
│       └── schemas/, types/      # Zod schemas e tipos — contrato de dados da feature
│
└── web/                         # Frontend: tudo que é UI/estado de cliente
    ├── lib/utils.ts              # cn() (shadcn)
    ├── components/                # ui/ (shadcn), layout/, business/ (ex: RegistroCard)
    ├── providers/                 # QueryProvider, SessionProvider, ThemeProvider
    ├── shared/enum-maps/          # labels de UI para os enums do api/ (ex: emocao-map.ts)
    └── features/<nome>/
        ├── ui/<tela>/{view,hooks}/  # Componente React da tela + hooks (useForm, handlers)
        └── data/hooks/, <feature>.keys.ts  # Hooks React Query (useQuery/useMutation) chamando as actions do api/
```

`registro-pensamento` concentra as telas de início (`ui/inicio`), novo registro (`ui/novo`) e
histórico (`ui/historico`) porque todas operam sobre a mesma entidade — evita import cruzado
entre features.

O `components.json` do shadcn já aponta os aliases para `@/web/components`, `@/web/lib`, etc. —
`npx shadcn add <componente>` continua funcionando normalmente.

## Regras e Convenções

- **Responder e nomear tudo em Português do Brasil (PT-BR)**, independentemente do idioma da
  mensagem do usuário.
- Nunca usar `any` explícito em TypeScript.
- Nunca usar `console.log` sem que seja solicitado.
- **App Router** do Next.js — não usar Pages Router.
- Componentes de UI genéricos ficam em `src/web/components/`, lógica de negócio em
  `src/{api,web}/features/`.
- Nunca importar de `src/{api,web}/features/X` dentro de `src/{api,web}/features/Y` — features
  são independentes.
- Prisma só é acessado dentro de `src/api/features/*/actions/` — nunca em componentes, nunca em
  `src/web/`.
- Toda comunicação com o banco passa por Server Action (`src/api/`) + hook React Query
  (`src/web/`) — nunca Prisma direto no componente, nunca fetch/axios manual.
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
