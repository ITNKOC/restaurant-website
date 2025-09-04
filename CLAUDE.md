# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 14 restaurant website for Di Menna, an Italian restaurant established in 1971. The project uses TypeScript and follows a component-based architecture.

### Core Structure

- **Next.js App Router**: Uses the new app directory structure (`src/app/`)
- **API Routes**: RESTful endpoints in `src/app/api/` for menu, bookings, chefs, events, gallery, testimonials, and specials
- **Section-based UI**: Main page composed of reusable sections (`src/app/sections/`)
- **Component Library**: Shared UI components in `src/app/components/`
- **Data Layer**: Static data definitions in `src/app/data/data.ts`

### Key Features

- **Multi-language Support**: French (default) and English using next-i18next
- **Admin Dashboard**: Basic admin interface at `/admin/dashboard` with login at `/admin/login`
- **Dynamic Menu System**: Menu items with categories (starters, salads, specialty) and individual detail pages
- **Image Management**: Uses Vercel Blob and Cloudinary for image storage
- **Animation Libraries**: AOS for scroll animations, Framer Motion for UI animations, Swiper for carousels

### Styling Architecture

- **CSS Modules**: Component-specific styles (e.g., `header.css`, `menu.module.css`)
- **Global Styles**: Main styling in `src/app/globals.css`
- **Bootstrap Integration**: Uses Bootstrap 5.3.2 for utility classes
- **Icons**: Bootstrap Icons and Boxicons

### Data Management

- **Static Data**: All content (menus, testimonials, chefs, etc.) stored in `src/app/data/data.ts`
- **Custom Hook**: `useMenus.ts` for menu state management
- **API Integration**: REST endpoints serve data from the static data file

### Admin System

The admin system includes:
- Login page with authentication
- Dashboard for content management
- API endpoints for CRUD operations on menu items, gallery, and other content

### Configuration

- **next-i18next**: Multi-language support with French as default
- **TypeScript**: Full type coverage with custom type definitions
- **ESLint**: Code quality enforcement
- **Vercel Deployment**: Optimized for Vercel hosting

### Development Notes

- Some sections are commented out in the main page (Specials, Events, Testimonials, Gallery)
- The project includes a special LobsterFestHero component (currently commented out)
- Uses modern React patterns with functional components and hooks