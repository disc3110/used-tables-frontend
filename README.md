# Used Billiard Store

Monorepo for the public storefront, admin panel, and backend API.

## Structure

```text
used-billiard-store/
  storefront/    Public Next.js storefront
  admin-panel/   Admin Next.js app
  backend/       NestJS API and Prisma schema
```

Each app has its own `package.json` and can be installed, run, built, and
deployed from its own folder.

## Local Setup

Install dependencies per app:

```bash
npm --prefix storefront install
npm --prefix admin-panel install
npm --prefix backend install
```

Create local env files from the examples:

```bash
cp storefront/.env.example storefront/.env.local
cp admin-panel/.env.example admin-panel/.env.local
cp backend/.env.example backend/.env
```

Run locally:

```bash
npm run dev:backend
npm run dev:storefront
npm run dev:admin
```

Default local URLs:

- Storefront: `http://localhost:3000`
- Admin panel: `http://localhost:3001`
- Backend API: `http://localhost:4000/api`

## Verification Commands

```bash
npm run lint:storefront
npm run build:storefront
npm run lint:admin
npm run build:admin
npm run lint:backend
npm run build:backend
```

## Deployment

### Storefront on Vercel

- Project root directory: `storefront`
- Build command: `npm run build`
- Install command: `npm install`
- Environment variables:
  - `BACKEND_API_URL`: Railway API URL, including `/api`

### Admin Panel on Vercel

- Project root directory: `admin-panel`
- Build command: `npm run build`
- Install command: `npm install`
- Environment variables:
  - `BACKEND_API_URL`: Railway API URL, including `/api`
- Image uploads go through the admin panel route `/api/uploads/image`, which
  forwards the file to `${BACKEND_API_URL}/admin/uploads/image` with the admin
  auth token.

### Backend on Railway

- Project root directory: `backend`
- Build command: `npm run build`
- Start command: `npm run start:prod`
- Environment variables:
  - `PORT`
  - `API_PREFIX`
  - `FRONTEND_URL`
  - `ADMIN_PANEL_URL`
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLOUDINARY_FOLDER`: set to `used-billiard-store`; product images are
    uploaded to `used-billiard-store/products`

Run Prisma commands from `backend/` when needed:

```bash
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:seed
```
