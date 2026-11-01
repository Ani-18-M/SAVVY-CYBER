# CyberSafe — Cyber Awareness & Digital Safety Portal

CyberSafe is a modern, responsive Cyber Awareness and Digital Safety web platform designed to help users identify online threats, recognize scams, protect privacy, and build safer digital habits through interactive tools, guides, and safety checkups.

---

## 🛠️ Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (Full-stack SSR) + [TanStack Router](https://tanstack.com/router) (File-based routing)
- **UI & Styling:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **State & Data:** [TanStack Query](https://tanstack.com/query), [Sonner](https://sonner.emilkowal.ski/)
- **Authentication:** Client-Side Site Storage Architecture (`localStorage`) with SHA-256 salted password hashing
- **Deployment:** [Vercel](https://vercel.com/) (Build Output API v3 via Nitro)

---

## 📁 Project Structure

```text
├── public/                 # Static assets (favicons, manifest)
├── src/
│   ├── assets/             # Cybersecurity images, logos, and threat banners
│   ├── components/
│   │   ├── site/           # Layout & site features (AppSidebar, Footer, Checklists)
│   │   └── ui/             # Reusable UI component library (Button, Dialog, Cards, etc.)
│   ├── hooks/              # Custom React hooks (e.g. use-mobile)
│   ├── lib/
│   │   ├── auth.tsx        # Site Storage authentication context & methods
│   │   ├── i18n.tsx        # Multi-language internationalization
│   │   ├── site-data.ts    # Threat database, guides, and security checklists
│   │   ├── theme.tsx       # Theme provider
│   │   └── utils.ts        # Tailwind merge & utility helpers
│   ├── routes/             # File-based routing
│   │   ├── __root.tsx      # App shell layout (Sidebar + Header + Providers)
│   │   ├── index.tsx       # Home dashboard
│   │   ├── threats/        # Threat categories and deep-dive detail pages
│   │   ├── learn.tsx       # Interactive learning hub
│   │   ├── checkup.tsx     # Digital safety score checkup
│   │   ├── incident.tsx    # Cyber incident reporting & recovery guidance
│   │   ├── login.tsx       # Authentication (Sign In & Sign Up in Site Storage)
│   │   └── ...             # Safety, privacy, scams, resources, about
│   ├── router.tsx          # Router configuration
│   ├── server.ts           # Server entry point
│   ├── start.ts            # TanStack Start configuration
│   └── styles.css          # Global Tailwind CSS styles
├── vercel.json             # Vercel deployment configuration
├── vite.config.ts          # Vite build & Nitro server configuration
└── package.json            # Project dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later
- **npm** (or pnpm / yarn)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be running at [http://localhost:5173](http://localhost:5173).

### 3. Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deploy to Vercel

This project is pre-configured for seamless zero-config deployment on **Vercel**:

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Vercel will automatically detect `vercel.json` and build using:
   - **Build Command:** `npm run build`
   - **Output Directory:** `.vercel/output`
5. Click **Deploy**. Your site will be live in seconds!
