# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, build today's lifting plan, save lifts for later, and track your session's total minutes and calories — all in one place.

## Technologies Used

- **Next.js (App Router)** — routing, server & client components
- **TypeScript** — type safety across components and data
- **Tailwind CSS** — styling and responsive layout
- **React Context API** — global state for Today's Plan / Saved / Done workouts
- **react-toastify** — toast notifications for user actions
- **lucide-react** — icon set
- **localStorage** — persists plan/saved/done data across page reloads

## Features

1. **Workout Library** — 12 workouts fetched from a live API, displayed in a responsive card grid with category tags, equipment, and stats (duration, calories, rating).
2. **Workout Detail Pages** — dynamic routes (`/workout/[id]`) with full instructions, key specs, and action buttons.
3. **Today's Plan & Saved Lists** — add workouts to a 5-lift daily plan or save them for later, with live badge counters in the navbar.
4. **My Plan Dashboard** (`/my-plan`) — tabbed view of Plan/Saved, live metrics (exercises, minutes, calories), mark-as-done, and remove actions.
5. **Sort & Search** — sort the library by duration, calories, or rating, and search by workout name or muscle tag.
6. **Persistent State** — plan, saved, and done data survive page reloads via localStorage.
7. **Fully Responsive** — mobile hamburger menu, stacked hero on small screens, adaptive grid.
8. **Custom 404 Page** — friendly not-found page for invalid routes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API

Data is fetched from:
`https://api.abcz.workers.dev/api/fitlog`