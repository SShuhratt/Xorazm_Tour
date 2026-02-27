# Xorazm Tour Frontend Refactor & Redesign
## Audit Findings
### Structural Problems
* **No footer** at all in MainLayout
* **Navbar links to missing pages**: `/{locale}/about` and `/{locale}/contacts` have no routes, controllers, or pages
* **Mixed UI libraries**: react-bootstrap (Carousel, Navbar, Nav, Container) mixed with Tailwind + Radix UI
* **Font not loaded**: `font-serif` used everywhere but no serif font imported in CSS or HTML
### UI/UX Weaknesses
* **Inconsistent color scheme**: Uses `#3498db`, `#2c3e50`, `#edc9af`, `#fdfaf3`, `#fffcf9` — no cohesive luxury palette
* **No page headers/hero** on listing pages (tours, cities, festivals have no top section)
* **Language switcher** — white text on transparent bg doesn't work after scroll
* **Each page uses different bg colors** — no visual consistency
### Localization Gaps
* **All UI strings hardcoded in English** — navbar items, buttons, section titles, etc.
* **No frontend i18n system** — no translations hook, no JSON translation files
* **Only `lang/en/` exists** for backend — no `uz/` or `ru/` translation directories
### Bugs
* `festivals/index.tsx` line 37: uses `.url` instead of `.path` for images
* `festivals/show.tsx` lines 31, 91: uses `.url` instead of `.path`
### Docker Issues
* `Dockerfile.prod` is incomplete — no COPY, no composer install, no npm build
* `docker-compose.prod.yml` missing redis, app can't function
* No `.dockerignore` file
## Color Palette
* **Primary Gold**: `#D4AF37` (luxury accents, CTAs, highlights)
* **Deep Navy**: `#0B1F3A` (navbar, footer, dark sections)
* **Light Gold**: `#F5E6C8` (warm highlights)
* **Ivory**: `#FEFCF6` (page backgrounds)
* **Muted Gold**: `#B8973A` (hover states)
* **Slate text**: `#2D3748` (body text)
## Implementation Plan
### Phase 1: Foundation
1. **Add Playfair Display serif font** — import in `app.blade.php`, register in Tailwind CSS
2. **Create i18n system** — `resources/js/hooks/use-translations.ts` hook + JSON translation files for `en`, `ru`, `uz` at `resources/js/lang/`
3. **Refactor CSS variables** — update `app.css` to use gold/navy palette in `:root` and `.dark`
4. **Remove react-bootstrap dependency** — replace Navbar/Carousel with Tailwind-based components
### Phase 2: Layout System
5. **Redesign Navbar** — luxury-themed, fixed top, gold/navy, with proper scroll behavior, mobile responsive hamburger
6. **Create Footer** — site info, quick links, contact info, multilingual
7. **Update MainLayout** — integrate new navbar + footer, consistent page background
### Phase 3: Pages
8. **Redesign Home page** — replace react-bootstrap Carousel with custom Tailwind carousel, apply gold/navy palette to all sections
9. **Add About Us page** — backend route + controller + Inertia page
10. **Add Contact page** — backend route + controller (with POST for contact form) + Inertia page
11. **Restyle all listing pages** — tours/index, cities/index, festivals/index, hotels/index, transports/index, posts/index — add page hero headers, consistent styling
12. **Restyle all detail pages** — tours/show, cities/show, festivals/show, hotels/show, transports/show, posts/show
### Phase 4: Bug Fixes & Docker
13. **Fix image path bugs** in festivals pages (`.url` → `.path`)
14. **Fix Dockerfile.prod** — complete production build steps
15. **Add `.dockerignore`**
16. **Fix docker-compose.prod.yml** — add redis, fix build context
### Phase 5: Validation
17. Run `npm run build` to verify the frontend builds
18. Run `npm run types to verify TypeScript`
