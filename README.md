# 🏰 XORAZM TOUR AND TRAVELS

> **Discover Ancient Uzbekistan & The Silk Road** — A modern, full-stack tourism platform and dynamic content management system built with Laravel 12, React, Inertia.js, and TailwindCSS.

---

## 🌟 Key Features

### 🏛️ Public Experience
- **Interactive Discover Hub**:
  - Explore historical Silk Road cities (Khiva, Urgench, Hazorasp, etc.).
  - Discover curated tour packages with day-by-day activity itineraries.
  - Explore cultural heritage festivals, craft bazaars, and traditional events.
  - Browse boutique heritage hotels and accommodations.
  - Transport fleet overview for comfortable regional travel.
  - **Uzbek National Dishes Guide**: Interactive culinary atlas covering traditional dishes across all 12 regions and Karakalpakstan.
- **Interactive Booking Requests**: Tour and gastronomy booking inquiries persisted to the database with server-side tier pricing calculation and queued confirmation emails.
- **Multilingual Support**: Seamless switching between **English (EN)**, **Russian (RU)**, and **Uzbek (UZ)**.
- **Interactive Lightbox Galleries**: Full-screen pop-up modals for high-resolution images and video playback.

### 🛡️ Admin Management Dashboard
- **Comprehensive CRUD Management**:
  - Full management of Tours, Cities, Festivals, Hotels, Transports, Travel Stories/Posts, and National Dishes.
- **Tour Itinerary & Day Activity Manager**:
  - Assign activities to any day (`Day 1`, `Day 2`, `Day 3`, etc.) with time slots.
  - Per-activity local language switcher (`EN` | `RU` | `UZ`) for effortless inline edits without scrolling.
  - Automatic smooth scrolling to newly added schedule cards.
  - Activity image/video upload with instant thumbnail preview and popup modal.
- **Media Upload Manager**:
  - Drag-and-drop or file selector for single and multi-file media uploads (images and videos).
  - Set main cover images, reorder media items, or delete files directly.
- **Stay-on-Page Editing**: Preserves scroll position and form state upon saving updates.

---

## 🛠️ Tech Stack

- **Backend**: [Laravel 12](https://laravel.com), PHP 8.4, PostgreSQL / SQLite
- **Adapter**: [Inertia.js v2](https://inertiajs.com)
- **Frontend**: [React 19](https://react.dev), TypeScript, TailwindCSS v4
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev)
- **Containerization**: Docker & Docker Compose

---

To access the administrative dashboard at `/login` or `/admin/dashboard`:
- Ensure an admin user exists (`ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`, then run `php artisan admin:ensure`).
- Configure `FILESYSTEM_DISK=public` locally (or `s3` / R2 in production with `AWS_*` variables).

---

## 🚀 Getting Started

### Prerequisites

- PHP >= 8.4
- Node.js >= 20 & npm
- Composer
- PostgreSQL or SQLite
- Docker (Optional, for containerized environment)

---

### Local Setup (Without Docker)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SShuhratt/Xorazm_Tour.git
   cd Xorazm_Tour
   ```

2. **Install PHP & Node Dependencies**:
   ```bash
   composer install
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run Database Migrations & Seeders**:
   ```bash
   php artisan migrate --seed
   ```

5. **Link Storage**:
   ```bash
   php artisan storage:link
   ```

6. **Start Development Servers**:
   ```bash
   # Terminal 1: Laravel Backend
   php artisan serve

   # Terminal 2: Vite Frontend Dev Server
   npm run dev
   ```

---

### Production & Local Docker Setup

1. **Production Stack (`docker-compose.prod.yml`)**:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```
   Includes PHP-FPM app container, Nginx reverse proxy, PostgreSQL database with healthchecks, and a Laravel queue worker for queued confirmation & contact emails.

2. **Local Development Containers**:
   ```bash
   docker compose up -d --build
   ```

3. **Run Migrations, Seeders & Ensure Admin User**:
   ```bash
   docker exec -it xorazmtour-app php artisan migrate --seed
   docker exec -it xorazmtour-app php artisan admin:ensure
   ```

4. **Compile Frontend Assets**:
   ```bash
   npm run build
   ```

### Neon + Vercel + Cloudflare Workflow

- **Database Isolation**: Keep local `.env` on local SQLite (`database/database.sqlite`), `docker-compose.dev.yml` Postgres, or a dedicated Neon **`dev` branch**. Never point local `.env` directly at the Neon production branch (local prod reference env can be kept in untracked `.env.production`).
- **Automated Production Migrations**: `.github/workflows/migrate-prod.yml` automatically runs `php artisan migrate --force` (and `php artisan admin:ensure`) when migrations change on `main`/`master` once `PROD_DATABASE_URL` (and optionally `APP_KEY`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`) are set in GitHub Actions Secrets.
- **Serverless Media & Queues**: Set `FILESYSTEM_DISK=s3` (Cloudflare R2 `AWS_*` variables) for persistent uploads and `QUEUE_CONNECTION=sync` unless a dedicated `php artisan queue:work` worker runs alongside the app.

---

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/          # Admin CRUD Controllers (Tour, City, Dish, Hotel, etc.)
│   │   └── ...             # Public Controllers
│   └── Models/             # Eloquent Models & Multilingual Translations
├── database/
│   ├── migrations/         # Database Schema Migrations
│   └── seeders/            # Seeders (Dishes, Cities, Tours, Users, etc.)
├── resources/
│   ├── js/
│   │   ├── components/     # React Components & Admin Media Managers
│   │   ├── lang/           # Multilingual JSON Dictionaries (en.json, ru.json, uz.json)
│   │   ├── layouts/        # Main Layout & Admin Layout
│   │   └── routes/         # Inertia Page Views & Admin Dashboard Routes
│   └── css/                # Global Styling & Tokens
├── public/
│   ├── XT_content/         # Assets & Animations (Intro Video, Brand Logos)
│   └── images/             # Transparent Logo & Graphics
└── routes/
    └── web.php             # Web & Admin Inertia Routes
```

---

## 📞 Contact Information

- **Brand**: XORAZM TOUR AND TRAVELS
- **Phone**: [+998 94 315 75 79](tel:+998943157579)
- **Email**: [xorazmtour@gmail.com](mailto:xorazmtour@gmail.com)
- **Telegram**: [@xorazmtourandtravels](https://t.me/xorazmtourandtravels)
- **Facebook**: [facebook.com/xorazmtourandtravels](https://www.facebook.com/xorazmtourandtravels)
- **Instagram**: [instagram.com/xorazmtour_and_travels](https://www.instagram.com/xorazmtour_and_travels)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
