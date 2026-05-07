<div align="center">
  <img alt="Kindra Fashion Logo" src="public/so-black.png" width="80" height="80" style="border-radius: 50%" />

# Kindra Fashion — Full-Stack E-commerce Showcase

<p align="center">
    <strong>A stunning, modern, and production-ready fashion e-commerce application.</strong>
    <br />
    Built with Next.js App Router, TypeScript, Stripe, Drizzle ORM, and PostgreSQL.
  </p>

<p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#architecture">Architecture</a>
  </p>
</div>

## ✨ Features

- **🛍️ Comprehensive Product Catalog:** Fully implemented category pages, dynamic product variants, and inventory-aware shopping cart flows.
- **💳 Secure Payments:** Seamless checkout experience powered by Stripe integration.
- **🔐 Robust Authentication:** Secure user authentication featuring email magic links and OAuth (Google, GitHub, Facebook) built with custom session handling.
- **🛠️ Admin Dashboard:** An intuitive administrative surface for easy catalog updates, order management, and user oversight.
- **📧 Automated Workflows:** Integrated transactional emails for verification, password resets, and purchase confirmations using Resend.
- **🗄️ Type-Safe Database:** Database schema, robust queries, and safe migrations powered by Drizzle ORM and PostgreSQL.

---

## 💻 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router), React 19, TypeScript
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), Framer Motion
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/), [Drizzle ORM](https://orm.drizzle.team/)
- **Payments:** [Stripe](https://stripe.com/)
- **Authentication:** Custom OAuth + Email integration via [Arctic](https://arctic.js.org/) & [Oslo](https://oslo.js.org/)
- **Emails:** [Resend](https://resend.com/), [React Email](https://react.email/)
- **Storage:** Cloudflare R2 / Vercel Blob

---

## 🏎️ Quick Start

Follow these steps to get the project running locally on your machine.

### Prerequisites

- Node.js (>=20.0.0)
- npm or pnpm (>=9.0.0)
- A PostgreSQL instance (or use the provided `docker-compose.yml`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hamzabenarfa/kindra-fashion.git
   cd kindra-fashion
   ```
2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Environment Setup:**
   Copy the sample environment file and fill in your keys:

   ```bash
   cp .env.sample .env
   ```
4. **Database Migration & Seeding:**
   Ensure your database is running, then execute the schema push and data seed scripts:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

---

## 🏗️ Architecture & Scripts

The repository is built following domain-driven design principles combined with Next.js standard conventions:

- `src/app/`: Next.js App Router setup with route groups `(auth)`, `(main)`, and `(landing)`.
- `src/db/`: Database schema, migrations, and seeding scripts.
- `src/components/`: Reusable UI components.
- `src/use-cases/` & `src/data-access/`: Core business logic separated from the UI for optimal testability and reuse.

### Useful Commands

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `npm run dev`           | Starts the local development server         |
| `npm run build`         | Builds the application for production       |
| `npm run lint`          | Runs ESLint checks                          |
| `npm run db:push`       | Pushes the Drizzle schema to the database   |
| `npm run db:migrate`    | Runs formal database migrations             |
| `npm run db:seed`       | Populates the database with sample data     |
| `npm run db:reset`      | Clears, migrates, and re-seeds the database |
| `npm run stripe:listen` | Listens for Stripe webhooks locally         |

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/hamzabenarfa">hamzabenarfa</a>
</div>
