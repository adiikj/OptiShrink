# OptiShrink

A small compression studio for PDFs and images. Three tuned levels, batch runs, and a history built on real before-and-after byte counts.

- **Frontend** — Next.js 15 App Router, TypeScript, Tailwind CSS
- **API** — Express 4, TypeScript, Zod
- **Data** — PostgreSQL with Drizzle ORM
- **Compression** — Cloudinary (images) and pdf.co (PDFs)

## Layout

```
apps/
  frontend/   Next.js app (marketing site + studio)
  backend/    Express API, Drizzle schema and migrations
```

## Local setup

Requirements: Node.js 20+, pnpm 10+, and a PostgreSQL database.

```bash
pnpm install
```

### 1. Database

Use any PostgreSQL 14+ instance. With Docker:

```bash
docker run -d --name optishrink-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=optishrink \
  -p 5432:5432 postgres:16-alpine
```

### 2. API

```bash
cp apps/backend/.env.example apps/backend/.env
```

Fill in `DATABASE_URL` and both token secrets (use `openssl rand -hex 32`). For a managed PostgreSQL provider, append `?sslmode=require` to the URL. Cloudinary and pdf.co keys are optional for the rest of the studio; compression endpoints return `503` until they are present.

```bash
pnpm --filter @optishrink/backend db:migrate
pnpm dev:api
```

The API listens on `http://localhost:5000`. Health check: `GET /health`.

### 3. Frontend

```bash
cp apps/frontend/.env.example apps/frontend/.env
pnpm dev:web
```

The site is available at `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run frontend and API together |
| `pnpm dev:web` | Frontend only |
| `pnpm dev:api` | API only |
| `pnpm build` | Build both apps |
| `pnpm lint` | Type-check the API and lint the frontend |
| `pnpm --filter @optishrink/backend db:generate` | Generate a migration from the Drizzle schema |
| `pnpm --filter @optishrink/backend db:migrate` | Apply migrations |
| `pnpm --filter @optishrink/backend db:studio` | Open Drizzle Studio |

## API

All responses use `{ success, status, message, data }`. Authentication is held in httpOnly cookies: a 15-minute access token and a 30-day rotating refresh token.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/user/register` | — | Create an account |
| `POST` | `/user/login` | — | Sign in |
| `POST` | `/user/refresh` | refresh cookie | Rotate the session |
| `POST` | `/user/logout` | optional | Clear the session |
| `GET` | `/user/profile` | yes | Current user |
| `GET` | `/user/stats` | yes | Totals, per-kind bytes, 14-day series |
| `GET` | `/user/files` | yes | History (`?kind=image\|pdf`) |
| `DELETE` | `/user/files/:id` | yes | Remove a history entry |
| `POST` | `/image/optimize-img` | optional | Multipart `images` (max 20), `compressionLevel` |
| `POST` | `/pdf/compress-pdf` | optional | Multipart `file`, `compressionLevel` |

Compression levels are `low`, `medium`, and `high`. Uploads are limited to 20 MB per file; temporary files are removed after each request.

## Deployment notes

The API ships with a Dockerfile that applies Drizzle migrations before starting. Set the variables from `apps/backend/.env.example` in your host. `render.yaml` at the repository root is a ready Render blueprint for that image. In production, cookies use `SameSite=None; Secure`, so `FRONTEND_URL` must be the exact HTTPS origin of the frontend (comma-separate multiple origins if needed).

The frontend only needs `NEXT_PUBLIC_API_URL`.
