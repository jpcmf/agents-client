# Web Application - NLW Agents

A modern React web application built with TypeScript, Vite, and Tailwind CSS for room management functionality.

## 🚀 Tech Stack

### Core Technologies

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.3** - Fast build tool and dev server
- **React Router DOM 7.6.3** - Client-side routing

### UI & Styling

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library (New York style)
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional className utilities

### State Management & Data Fetching

- **TanStack Query 5.82.0** - Server state management
- **React Query** - Caching, synchronization, and background updates

### Development Tools

- **ESLint 9.30.1** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React support for Vite

## 📁 Project Structure

```
web/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   │       └── button.tsx
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── pages/
│   │   ├── create-room.tsx # Room creation page
│   │   └── room.tsx       # Room details page
│   ├── app.tsx            # Main app component with routing
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite type definitions
├── components.json        # shadcn/ui configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 🛠️ Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

- `@/*` → `./src/*`
- `@/components` → `./src/components`
- `@/lib` → `./src/lib`
- `@/components/ui` → `./src/components/ui`

### shadcn/ui Setup

- **Style**: New York
- **Base Color**: Zinc
- **CSS Variables**: Enabled
- **Icon Library**: Lucide React
- **TypeScript**: Enabled

### Routing Configuration

- `/` - Home page (CreateRoom component)
- `/room/:id` - Room details page
- `/room` - Redirects to home page

## 📦 Installation

### Prerequisites

- Node.js (version 18+ recommended)
- pnpm (package manager)

### Setup

1. Clone the repository and navigate to the web directory
2. Install dependencies:
   ```bash
   pnpm install
   ```

## 🚀 Available Scripts

### Development

```bash
pnpm dev
```

Starts the development server with hot reload at `http://localhost:5173`

### Build

```bash
pnpm build
```

Creates an optimized production build in the `dist` folder

### Preview

```bash
pnpm preview
```

Previews the production build locally

### Linting

```bash
pnpm lint
```

Runs ESLint to check code quality and consistency

## 🔧 Development Features

### Hot Module Replacement (HMR)

- Fast refresh for React components
- Instant feedback during development

### TypeScript Support

- Full TypeScript integration
- Strict type checking
- Path-based imports with IntelliSense

### Code Quality

- ESLint with React and TypeScript rules
- React Hooks linting
- React Refresh linting

### Modern CSS

- Tailwind CSS v4 with Vite plugin
- CSS variables for theming
- Responsive design utilities

## 🎨 UI Components

The project uses shadcn/ui components which provide:

- Accessible, unstyled components
- Customizable with Tailwind CSS
- TypeScript support out of the box
- Consistent design system

### Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## 🔄 State Management

### TanStack Query

- Server state caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

Example usage in the project:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["rooms"],
  queryFn: fetchRooms,
});
```

## 🌐 Routing

The application uses React Router v7 with:

- Declarative routing
- Nested routes support
- Dynamic route parameters
- Programmatic navigation
- Route protection/redirection

## 📱 Features

### Room Management

- Create new rooms
- View room details
- Navigate between rooms
- Handle invalid room IDs with redirects

### User Experience

- Loading states
- Error handling
- Responsive design
- Modern UI components

## 🚀 Deployment

### Production Build

1. Create production build:

   ```bash
   pnpm build
   ```

2. The `dist` folder contains the optimized static files ready for deployment

### Deployment Platforms

This project can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Ensure ESLint passes before committing
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

This project is part of the NLW Agents event and follows the event's guidelines and licensing terms.
