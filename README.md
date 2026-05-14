# Enterprise Admin Dashboard

Enterprise Admin Dashboard is a portfolio React SPA that demonstrates a clean frontend architecture for a business admin application. The project includes protected routing, a demo authentication flow, Redux Toolkit state management, reusable UI components, and a dashboard overview with KPI cards, business statistics, and chart placeholders.

## Live Demo

[View deployed project](https://enterprise-admin-dashboard.vercel.app/dashboard)

Demo credentials:

```txt
Email: admin@example.com
Password: password
```

## Features

- React SPA built with Vite and TypeScript
- Protected routes with redirect logic
- Demo login flow with a fake JWT token
- Auth persistence with `localStorage`
- Redux Toolkit architecture with typed hooks
- Async Redux flows with loading and error states
- Dashboard overview with KPI cards and statistics
- Responsive layout with sidebar navigation
- SCSS Modules and global design variables
- Axios instance prepared for future API integration

## Tech Stack

- React
- Vite
- TypeScript
- React Router
- Redux Toolkit
- React Redux
- Axios
- SCSS Modules
- ESLint
- Prettier

## Project Structure

```txt
src/
  app/
    hooks.ts
    store.ts
  components/
    layout/
    ui/
  features/
    auth/
    dashboard/
    users/
    settings/
  pages/
    LoginPage/
    DashboardPage/
    UsersPage/
    SettingsPage/
    NotFoundPage/
  routes/
    AppRouter.tsx
    ProtectedRoute.tsx
  services/
    api/
  styles/
  types/
```

## Architecture Notes

The application follows a feature-oriented structure. Global application setup lives in `src/app`, routing lives in `src/routes`, reusable UI lives in `src/components`, and business domains live in `src/features`.

Authentication is intentionally implemented as a demo flow. It uses a fake JWT token and `localStorage` to simulate a real authenticated session while keeping the project frontend-only.

The dashboard uses Redux Toolkit async thunks to model loading and error states. The current data is static, but the structure is prepared for a future mock backend or API layer.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/anastasia2022be1/enterprise-admin-dashboard.git
cd enterprise-admin-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```txt
http://localhost:5173
```

For Windows PowerShell users, if `npm` is blocked by execution policy, use `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
```

## Roadmap

- Add a users table with filtering and pagination
- Add MSW for mock backend responses
- Add real chart components
- Add settings forms
- Add Husky and pre-commit checks
- Add UI tests

## Repository

[GitHub Repository](https://github.com/anastasia2022be1/enterprise-admin-dashboard)
