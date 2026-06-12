# MATUCHOVIC — Digitální studio

Prémiový osobní brand web s full-stack autentizací.

## Tech Stack

- **Next.js 15** — App Router
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **Framer Motion** — animace
- **GSAP** — scroll animace
- **Lenis** — smooth scroll
- **Prisma** — ORM
- **PostgreSQL** — databáze (Vercel Postgres / Neon / Supabase)
- **NextAuth v5** — autentizace
- **bcryptjs** — hashování hesel

## Lokální spuštění

### 1. Naklonuj repozitář

```bash
git clone https://github.com/tvuj-username/matuchovic.git
cd matuchovic
npm install
```

### 2. Nastav environment variables

```bash
cp .env.example .env.local
```

Vyplň hodnoty v `.env.local`:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="generuj-pomocí: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Inicializuj databázi

```bash
npx prisma generate
npx prisma db push
```

### 4. Spusť dev server

```bash
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000)

## Deploy na Vercel

### 1. Databáze

Doporučuji [Neon](https://neon.tech) nebo [Vercel Postgres](https://vercel.com/storage/postgres) — obě mají free tier.

### 2. Vercel setup

```bash
npm i -g vercel
vercel
```

### 3. Environment variables na Vercel

V Vercel dashboard → Settings → Environment Variables přidej:

- `DATABASE_URL` — connection string z Neon/Supabase
- `AUTH_SECRET` — random secret (openssl rand -base64 32)
- `NEXTAUTH_URL` — tvoje Vercel URL (https://matuchovic.vercel.app)

### 4. Po deployi spusť migrace

```bash
npx prisma db push
```

## Struktura projektu

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   └── user/register/      # Registrace API
│   ├── auth/
│   │   ├── login/              # Login stránka
│   │   └── register/           # Registrace stránka
│   ├── dashboard/              # Chráněná zóna
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Hero, Services, Projects...
│   └── ui/                     # Forms, Toaster, Providers...
├── lib/
│   ├── prisma.ts               # Prisma client
│   ├── utils.ts                # Utility funkce
│   └── validations.ts          # Zod schemas
├── styles/
│   └── globals.css             # Global styly, noise overlay
├── types/                      # TypeScript typy
├── auth.ts                     # NextAuth konfigurace
└── middleware.ts               # Route protection
```

## Funkce

- ✅ Přihlášení / Registrace s validací
- ✅ JWT session management
- ✅ Chráněné routes (middleware)
- ✅ Dashboard pro přihlášené uživatele
- ✅ Noise overlay animace (film grain)
- ✅ Glassmorphism design
- ✅ Smooth scroll (Lenis)
- ✅ Framer Motion animace
- ✅ Responzivní design
- ✅ Dark mode only
