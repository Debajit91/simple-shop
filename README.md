# SimpleShop

A modern, minimal storefront for premium electronics built with **Next.js 15 (App Router)**, **NextAuth v4**, **Prisma**, **MongoDB**, and **Tailwind CSS** (no TypeScript). Public pages include a landing page, product list with search/sort/pagination, and product details. Authenticated users can access a dashboard to create products. A contact page can optionally send email via Resend.

---

## Features

- **Next.js 15 (App Router)** — server components, server actions, `searchParams` handling
- **Auth** — NextAuth v4 (Google OAuth & Credentials)
- **Data** — Prisma ORM with MongoDB (Products)
- **UI** — Tailwind via `@import` + CSS variables (no `tailwind.config.js`)
- **Products** — search, category filters, server-side pagination & sorting
- **Dashboard** — add new products (server action, Toast via SweetAlert2)
- **Contact** — optional email send via Resend
- **Images** — Next/Image remote allowlist configured
- **Theming** — light/dark via CSS variables + a simple toggle

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript (no TypeScript)
- **Auth:** NextAuth v4 (Google & Credentials)
- **ORM:** Prisma
- **DB:** MongoDB (Atlas or local)
- **Styling:** Tailwind CSS via `@import "tailwindcss";` and CSS variables
- **Email:** Resend (optional)
- **Alerts:** SweetAlert2

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- A MongoDB connection string (Atlas or local)
- (Optional) Google OAuth credentials
- (Optional) Resend API key for contact form

---

## Getting Started

### 1) Clone & install
```bash
git clone https://github.com/<your-user>/simple-shop.git
cd simple-shop
npm install

---

2) Environment variables

Create a .env file in the project root:

# MongoDB (recommended: non-SRV / standard)
DATABASE_URL="mongodb://<USER>:<PASS>@host-00:27017,host-01:27017,host-02:27017/simpleshop?tls=true&authSource=admin&retryWrites=true&w=majority"

# NextAuth (required)
AUTH_SECRET="a-long-random-string"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Contact (optional)
RESEND_API_KEY="your_resend_api_key"
CONTACT_FROM="Simple Shop <no-reply@yourdomain.com>"
CONTACT_TO="owner@yourdomain.com"

Note: If SRV DNS is flaky on Windows/ISP, use the non-SRV Mongo URI (standard connection string).
Google OAuth: Add authorized redirect URL:
http://localhost:3000/api/auth/callback/google (dev) and your production domain in Google Cloud Console.

---

3) Prisma setup (MongoDB)

Update the database and generate the client:

npx prisma generate
npx prisma db push

(Optional) Seed initial data:
npm run seed

If you hit DNS timeouts with Atlas, switch to the non-SRV connection string.

---

4) Run the dev server
npm run dev


Open http://localhost:3000.

---

Project Scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push",
    "seed": "node prisma/seed.js"
  }
}

---

Folder Structure (high level)
src/
  app/
    (public pages)
    contact/
      page.jsx
      actions.js
    login/
      page.jsx
      LoginForm.jsx
    products/
      page.jsx            // list with search/sort/pagination
      [slug]/page.jsx     // product details (by slug)
    dashboard/
      products/
        page.jsx          // list (user-scoped optional)
        new/page.jsx      // add product (ManageForm)
    not-found.jsx         // global 404
  components/
    Navbar.jsx
    ThemeToggle.jsx
    SubmitButton.jsx
    Spinner.jsx
    ... (cart, etc.)
lib/
  prisma.js
  authOptions.js
prisma/
  schema.prisma
  seed.js
public/
  (assets)
next.config.js
postcss.config.mjs
globals.css

---

Styling & Theming

Tailwind is loaded via @import "tailwindcss"; in globals.css.

Design tokens are simple CSS variables (e.g., --background, --foreground, --border, --brand-gradient).

Theme toggle sets data-theme="dark" on <html> and variables in CSS handle colors.

---

Images (Next/Image)

Add remote patterns in next.config.js:

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ibb.co" }
    ]
  }
};
module.exports = nextConfig;

---

Authentication (NextAuth v4)

Credentials login (demo) and Google OAuth.

After successful login, users are redirected to /products.

Protect server pages with getServerSession(authOptions) and redirect unauthenticated users.

Callback URL (dev):

http://localhost:3000/api/auth/callback/google

---

Contact (optional)

Server action posts to Resend (RESEND_API_KEY required).

Honeypot field used to reduce bots.

On success/failure the UI shows a toast (SweetAlert2) and/or message.

---

Products

List: /products — server-side search, category filter, sorting (new, price-asc, price-desc), and pagination.

Details: /products/[slug] — details by unique slug.

Dashboard Add: /dashboard/products/new — server action form with spinner + success toast.

---

Route Summary
Route	Type	Description
/	Public	Landing page (Navbar, Hero, Highlights, etc.)
/products	Public	Product list with search/sort/pagination
/products/[slug]	Public	Product details by slug
/contact	Public	Contact page (optional email via Resend)
/login	Public/Auth	Login (Credentials or Google OAuth)
/dashboard	Protected	Dashboard home (optional)
/dashboard/products	Protected	(Optional) Manage list (user-scoped, if enabled)
/dashboard/products/new	Protected	Add product (server action + SweetAlert)
/api/auth/*	System	NextAuth routes
/not-found (auto)	System	Global 404 page

---

Deployment

Deploy to Vercel (recommended).

Configure Environment Variables in the dashboard.

Add production Google OAuth redirect URL:

https://your-domain.com/api/auth/callback/google


Add production hosts to images.remotePatterns.

---

Troubleshooting

redirect_uri_mismatch (Google OAuth): Add the exact callback URL in Google Cloud Console (dev & prod).

next/image unconfigured host: Add the host to images.remotePatterns.

Malformed ObjectID for product page: Use slug route /products/[slug], and query by slug.

searchParams error (Next 15): In server pages, use const sp = await searchParams;.

MongoDB SRV DNS timeout: Prefer non-SRV (standard) Mongo URI.

Sorting not changing: Ensure orderBy uses price and price is numeric for all docs; disable caching with export const dynamic = "force-dynamic"; export const revalidate = 0;.

---

License

MIT — do whatever, just keep the license.


If you want, I can drop this into a `README.md` file in your project and tailor any parts (e.g., screenshots, badges, or your GitHub URL).
::contentReference[oaicite:0]{index=0}

