# EventEase 🎉

EventEase is a modern full-stack event management application built with **Next.js 15**, **Prisma**, **Tailwind CSS**, and **PostgreSQL**. It allows users to create, manage, and RSVP to events with a smooth and intuitive interface.

## 🚀 Features

- 🔐 Authentication using NextAuth
- 📅 Create and manage events
- 📨 Invite attendees with a public RSVP link
- ✅ RSVP to events without login
- 📊 Dashboard for viewing created events
- 🌗 Dark mode support
- ⚡ Fast and modern UI with Tailwind CSS

## 🧱 Tech Stack

- **Frontend:** React, Next.js 15 (App Router)
- **Styling:** Tailwind CSS, ShadCN UI
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** NextAuth.js
- **Deployment:** Vercel

## 🛠️ Installation

Clone the repo:

```bash
git clone https://github.com/Kr-dev1/eventease.git
cd eventease
```

Install dependencies:

```bash
bun install
# or
npm install
```

Set up your `.env` file (see `.env.example` for required variables):

```env
DATABASE_URL=your_postgres_connection_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

Run the development server:

```bash
bun dev
# or
npm run dev
```

Set up your database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🧪 Testing

(Currently no testing setup, but you can integrate tools like Jest or Playwright.)

## 📂 Folder Structure

```bash
app/                # App Router-based pages and layouts
components/         # Reusable UI components
lib/                # Utility functions, auth, prisma client
schema/             # Zod validation schemas
public/             # Static assets
```

## Accounts to check

```bash
- USER - user@example.com
- ADMIN - admin@example.com
- OWNER - owner@example.com
- STAFF - staff@example.com
Pass    - Test@123
```

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

## 📬 Contact

Built with ❤️ by [Kasturi Rangan](https://www.linkedin.com/in/-kasturirangan/)  
📧 kasturirangan.dev@gmail.com  
🌐 [Portfolio](https://kasturirangan.netlify.app)

---

Feel free to fork this project and customize it for your own event platform!
