# NLW Agents - Room Management Web Application

A modern React web application for creating and managing question rooms, built with TypeScript, Vite, Tailwind CSS, and shadcn/ui. The project is fully internationalized in English and follows best practices for scalability and maintainability.

---

## 🆕 Recent Highlights

- Custom hooks for all business logic and data fetching (`src/hooks/`)
- All user-facing texts translated to English (i18n)
- Separation of concerns: hooks for logic, components for UI
- Human-readable date formatting utility
- Node version managed via `.nvmrc` (see prerequisites)

---

## 🚀 Tech Stack

- **React 19.1.0**
- **TypeScript 5.8.3**
- **Vite 7.0.3**
- **React Router DOM 7.6.3**
- **Tailwind CSS 4.1.11**
- **shadcn/ui** (New York style)
- **Radix UI**
- **Lucide React**
- **TanStack Query (React Query) 5.82.0**
- **react-hook-form** & **zod** for forms/validation
- **ESLint** & **TypeScript ESLint**

---

## 📁 Project Structure

```
web/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── create-room-form.tsx
│   │   ├── question-form.tsx
│   │   ├── question-item.tsx
│   │   ├── question-list.tsx
│   │   ├── room-list.tsx
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/
│   │   ├── use-create-question.ts
│   │   ├── use-create-room.ts
│   │   ├── use-room-questions.ts
│   │   └── use-rooms.ts
│   ├── http/
│   │   └── types/         # API types
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── create-room.tsx
│   │   ├── record-room-audio.tsx
│   │   └── room.tsx
│   ├── utils/
│   │   └── format-date.ts # Date formatting utility
│   ├── app.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── .nvmrc                  # Node version
├── components.json         # shadcn/ui config
├── package.json            # Dependencies/scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── eslint.config.js        # ESLint config
```

---

## 🛠️ Configuration & Conventions

- **Path Aliases**: `@/*` → `./src/*`, `@/components`, `@/lib`, `@/components/ui`
- **shadcn/ui**: New York style, Zinc base color, Lucide icons, TypeScript enabled
- **Node Version**: See `.nvmrc` (recommended via nvm)

---

## 🌐 Routing

- `/` - Home page (CreateRoom)
- `/room/:id` - Room details
- `/room` - Redirects to home
- `/room/:id/audio` - Record room audio

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (see `.nvmrc`, e.g. `nvm use`)
- pnpm (package manager)

### Setup

1. Clone the repository and navigate to the web directory
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

---

## 🚀 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

---

## 🎨 UI & Features

- **Room Management**: Create, view, and navigate rooms
- **Question Management**: Ask questions, view answers
- **Audio Recording**: Record audio for rooms
- **Loading/Error States**: User feedback for async actions
- **Human-readable Dates**: via `src/utils/format-date.ts`
- **Responsive Design**: Mobile-friendly UI
- **English (i18n)**: All texts in English

---

## 🔄 State Management & Data Fetching

- **TanStack Query**: Caching, background refetching, optimistic updates
- **Custom Hooks**: All business logic in `src/hooks/`

  Example:

  ```tsx
  // src/hooks/use-rooms.ts
  export function useRooms() {
    return useQuery({
      queryKey: ["get-rooms"],
      queryFn: async () => {
        // ... fetch logic
      },
    });
  }

  // src/components/room-list.tsx
  const { data, isLoading, error } = useRooms();
  ```

---

## 🧑‍💻 Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Ensure ESLint passes before committing
4. Test your changes thoroughly
5. Update documentation as needed

---

## 📄 License

This project is part of the NLW Agents event and follows the event's guidelines and licensing terms.
