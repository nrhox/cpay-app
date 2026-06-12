# Design & Architectural Standards (Single Source of Truth)

This document defines the architecture, directory structure, coding rules, and conventions for this codebase. Any AI assistant or developer working on this codebase must adhere strictly to these rules.

---

## 1. Global Rules & Philosophy

- **Simplicity Over Complexity (KISS & YAGNI)**: Do not write over-engineered solutions. Keep code clean, readable, and highly maintainable. Avoid writing speculative code for features that are not yet requested.
- **No Unapproved External Libraries**: Do not install or import any new npm packages or external libraries without explicit, written permission in the developer instructions/prompt. Leverage existing utilities and the current tech stack.
- **Strict TypeScript**:
  - All code must be strongly-typed.
  - **NO `any` types allowed**. Use proper interfaces/types or `unknown` with type-guarding if the type is dynamic.
  - Explicitly type function return values and component props.
- **Readability & Tokens-Efficiency**: Write self-documenting code. Keep files concise and modular to minimize token usage when read by AI agents.

---

## 2. Tech Stack Specification

- **Frontend Framework**: React 19 + Vite (built with React Router 7 for routing).
- **Styling & UI**:
  - **Tailwind CSS v4** via utility classes (integrated via `@tailwindcss/vite`).
  - **Headless UI** (`@headlessui/react`) for accessible, unstyled UI components.
  - **Lucide React** (`lucide-react`) for iconography.
- **State Management**:
  - **Client State**: Zustand v5. Use atomic selectors to prevent unnecessary re-renders (e.g., `const currentUser = useAuthStore(selectCurrentUser)`).
  - **Server State (API Cache)**: TanStack React Query v5. Do not use local states for API cached data.
- **Forms & Validation**: Formik + Yup.
- **API & Backend Integration**:
  - Axios client instance (`src/utils/axios.ts`) configured with automatic 401 JWT refresh token interceptor.
  - API requests must use React Query wrapper hooks from `src/feature/hooks.ts` (`useFetchData`, `useFetchInfinite`, `useMutateData`).

---

## 3. Directory Structure Map

Ensure all new files are placed in their respective directories according to this map:

```text
src/
├── app/                  # Application initialization
│   ├── layouts/          # Page layouts (e.g., AppLayout.tsx)
│   ├── providers.tsx     # Global React context/query providers
│   └── router.tsx        # React Router 7 route configuration
├── assets/               # Static assets (images, global icons, etc.)
├── components/           # Reusable UI components grouped by feature
│   ├── admin/            # Admin-only dashboard/list components
│   ├── forms/            # Formik-based inputs and form groups
│   ├── general/          # Generic layout helpers, sidebars, headers
│   ├── ui/               # Core atomic UI primitives (e.g., Badge.tsx, Button.tsx)
│   └── [feature]/        # Feature-specific components (e.g., transfer, wallet)
├── constants/            # Configuration constants and static mapping objects
├── dummy/                # Dummy mockup data for testing/development
├── feature/              # Server-state API fetch hooks
│   ├── hooks.ts          # Core React Query generic fetch & mutation wrappers
│   └── [feature].ts      # Feature-specific hooks (e.g., wallet.ts, transaction.ts)
├── pages/                # Page route components mapped to routes
│   └── [page-folder]/    # Kebab-case folders containing PascalCase *Page.tsx
├── stores/               # Zustand global store files (e.g., auth.store.ts)
├── types/                # TypeScript interfaces and type declarations
│   ├── response.ts       # API standardized response types
│   └── [model].ts        # Domain model interfaces (e.g., user.ts, wallet.ts)
└── utils/                # Utility helpers and third-party setups (e.g., axios.ts)
```

---

## 4. Coding Standards & Best Practices

### A. Component Development Standards

- **Functional Components**: Always write functional components using TypeScript and modern hooks (e.g., `const MyComponent = ({ prop1 }: IProps) => { ... }`).
- **Prop Definitions**: Use explicit TypeScript types/interfaces named `I[ComponentName]Props` for all props.
- **Tailwind CSS Structure**: Combine Tailwind classes using `clsx` or template strings when dynamic styles are needed. Avoid inline styles unless absolutely necessary for dynamic calculations.

### B. Naming Conventions

- **UI & Page Components**: PascalCase (e.g., `Button.tsx`, `EmptyState.tsx`, `DashboardPage.tsx`).
- **Zustand Stores**: camelCase, suffixed with `.store.ts` (e.g., `auth.store.ts`, `wallet.store.ts`).
- **Types & Interfaces**: camelCase filenames (e.g., `user.ts`), but naming within types should use PascalCase with prefix `I` for interfaces (e.g., `export interface IUser { ... }`).
- **Custom Hooks / Utilities**: camelCase filenames and camelCase function names (e.g., `hooks.ts`, `useFetchData`, `axios.ts`).
- **Page Directories**: lowercase kebab-case folders under `src/pages` (e.g., `payment-codes`, `wallets/create`).

### C. API & Error Handling Standard

- **Requesting Data**: Always use the React Query hooks from `src/feature/hooks.ts`:
  - Use `useFetchData` for `GET` requests.
  - Use `useFetchInfinite` for paginated list/scroll endpoints.
  - Use `useMutateData` for mutating operations (`POST`, `PUT`, `PATCH`, `DELETE`).
- **Error Responses**:
  - Axios errors are automatically caught. The standard error payload conforms to `AxiosError<ErrorResponseDefault>`.
  - Handle display of server/validation errors gracefully inside forms using Formik's `setErrors` or user toast notifications. Avoid standard browser alert boxes.
