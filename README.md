# Muldhon Admin Dashboard

Pixel-aligned Next.js admin UI based on the Muldhon dashboard design. Built with the App Router, TypeScript, Tailwind CSS, Lucide icons, and Recharts.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the dashboard.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, global styles)
│   ├── globals.css             # Design tokens (--muldhon-*)
│   └── (dashboard)/            # Admin routes (shared sidebar + top bar)
│       ├── layout.tsx
│       ├── page.tsx            # Dashboard home
│       ├── investors/
│       ├── entrepreneurs/
│       ├── projects/
│       ├── payments/
│       ├── notifications/
│       ├── messages/
│       ├── reports/
│       ├── activity-logs/
│       └── settings/
├── components/
│   ├── brand/                  # Logo
│   ├── layout/                 # Sidebar, TopBar
│   ├── dashboard/              # Dashboard widgets
│   └── ui/                     # Card, placeholders
├── config/
│   └── navigation.ts           # Sidebar links (single source of truth)
├── data/
│   └── mock-dashboard.ts       # Mock data — replace with API
├── types/
│   └── dashboard.ts
└── lib/
    └── create-page.ts          # Page metadata helper
```

## Customization

- **Colors / spacing:** Edit CSS variables in `src/app/globals.css`.
- **Navigation:** Update `src/config/navigation.ts`.
- **Dashboard numbers:** Update `src/data/mock-dashboard.ts` or wire to your API.
- **Secondary pages:** Replace `PagePlaceholder` in each route under `src/app/(dashboard)/`.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Development server       |
| `npm run build`| Production build         |
| `npm run start`| Run production build     |
| `npm run lint` | ESLint                   |
