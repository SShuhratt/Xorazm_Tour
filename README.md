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
- **Multilingual Support**: Seamless switching between **English (EN)**, **Russian (RU)**, and **Uzbek (UZ)**.
- **Interactive Lightbox Galleries**: Full-screen pop-up modals for high-resolution images and video playback.
- **Intro Video Preloader**: Elegant intro video animation (`XTATintroanimation.mp4`) with skip and mute controls.

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
- **Username / Login**: Value set in `ADMIN_EMAIL` in `.env`
- **Password**: Value set in `ADMIN_PASSWORD` in `.env`

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

### Docker Setup

1. **Build and Start Containers**:
   ```bash
   docker-compose up -d --build
   ```

2. **Run Migrations & Seeders inside App Container**:
   ```bash
   docker exec -it xorazmtour-app php artisan migrate --seed
   ```

3. **Compile Frontend Assets**:
   ```bash
   docker exec -it xorazmtour-node npm run build
   ```

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
