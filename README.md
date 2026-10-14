# Apex Technology

Official website for Apex Technology, a Philippine software development company. The public site is a Next.js application. Portfolio copy and screenshots ship with the codebase. Inquiries, admin editing, and authentication connect to Supabase when credentials are provided.

## Stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Motion for React
- React Hook Form and Zod
- Supabase for inquiries, content overrides, and admin auth

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs without Supabase. Portfolio, services, and pages render from `src/data`. The inquiry form validates, then explains that storage is not connected and gives the public email.

## Brand assets

The Apex logo was not inside this workspace. It was taken from the existing company project at `Desktop/apex technology/public/logo-apex.png` and prepared into `public/brand` by `npm run optimize-images`.

Client screenshots stay in their original folders. Optimized WebP copies used by the site live in `public/projects`.

These client folders were not in the workspace, so they are not in the portfolio:

- Francy Events
- Glordo Plants
- San Shen Furniture
- Dynamech Engineering

No testimonials are published. None were supplied.

## Contact details that still need confirmation

Published from the previous Apex Technology site configuration:

- Email: `hello@apextechnology.ph`
- Support: `support@apextechnology.ph`
- Region: Metro Manila, Philippines

The phone number in that older configuration was a placeholder (`+63 900 000 0000`) and is **not** shown. Add a verified number in Admin → Settings, or in `src/lib/config/site.ts`, before launch. Social profile URLs were not verified, so none are linked.

Budget choices on the quote form are intake categories, not a price list. Historical package prices are not published.

## Supabase

1. Create a project.
2. Run `supabase/migrations/001_initial.sql` in the SQL editor.
3. In Authentication, create an administrator user. Do not enable public sign-up.
4. Insert that user:

```sql
insert into public.admin_users (user_id) values ('USER_UUID');
```

5. Copy the project URL and anon key into `.env.local`.
6. Add `SUPABASE_SERVICE_ROLE_KEY` only on the server if you later need privileged scripts. The public form does not use it. Never expose it as `NEXT_PUBLIC_`.

Row level security:

- Anyone can read published projects, services, settings, and approved testimonials.
- Anyone can insert an inquiry. Nobody public can read inquiries.
- Only rows in `admin_users` can manage content and read inquiries.

Until a published database row exists for a slug, the site keeps the local version of that project or service.

Email notifications are not wired. `RESEND_API_KEY` is reserved in `.env.example` and does nothing until an integration is added and tested.

## Admin

- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/services`
- `/admin/inquiries`
- `/admin/settings`

Inquiry statuses: New, Contacted, Qualified, Proposal Sent, Won, Lost.

## Deploy on Vercel

1. Import this directory.
2. Set the environment variables from `.env.example`.
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin, for example `https://apextechnology.ph`.
4. Deploy. `npm run build` must pass first.

Admin routes are disallowed in `robots.txt`.

## Checks

```bash
npm run type-check
npm run lint
npm run build
```
