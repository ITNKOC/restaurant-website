# Di Menna Restaurant Website

![Di Menna Restaurant](public/assets/images/logo2.svg)

A modern, responsive website for Di Menna, an authentic Italian restaurant established in 1971. The site showcases the restaurant's rich heritage, menu offerings, and serves as a central hub for reservations and customer engagement.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Development](#development)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Styling and Responsiveness](#styling-and-responsiveness)
- [Performance Optimizations](#performance-optimizations)
- [Contributors](#contributors)
- [License](#license)

## ✨ Features

- **Elegant Home Page** with hero section and quick navigation
- **About Section** highlighting the restaurant's history and values
- **Menu Display** with downloadable PDF options
- **Online Reservation System** integrating with OpenTable
- **Photo Gallery** showcasing the restaurant's ambiance and dishes
- **Chef Profiles** introducing the culinary team
- **Special Events** section for private dining and celebrations
- **Customer Testimonials** with ratings and reviews
- **Contact Information** with integrated map and contact form
- **Mobile-First Responsive Design** ensuring optimal viewing across all devices
- **Multi-language Support** with language selection options
- **Optimized Performance** with lazy loading images and animations

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS with some Bootstrap utilities
- **Animation Libraries**:
  - [AOS](https://michalsnik.github.io/aos/) for scroll animations
  - [Framer Motion](https://www.framer.com/motion/) for UI animations
  - [Swiper](https://swiperjs.com/) for carousels and sliders
- **Lightbox**: [GLightbox](https://biati-digital.github.io/glightbox/) for image displays
- **Icons**: 
  - [Bootstrap Icons](https://icons.getbootstrap.com/)
  - [Boxicons](https://boxicons.com/)
- **Fonts**: 
  - [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (headings)
  - [Open Sans](https://fonts.google.com/specimen/Open+Sans) (body text)

## 📂 Project Structure

```
restaurant-website/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── menu/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes for menu, booking, etc.
│   │   ├── components/          # Reusable UI components
│   │   ├── data/                # Mock data and content
│   │   ├── sections/            # Page sections (About, Menu, etc.)
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout with common elements
│   │   └── page.tsx             # Home page component
│   └── types/                   # TypeScript type definitions
├── .eslintrc.json               # ESLint configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js 18.17.0 or newer
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/restaurant-website.git
   cd restaurant-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_OPEN_TABLE_ID=your_opentable_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🚀 Deployment

This project can be deployed on various platforms, including:

### Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com/)
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy with a single click

### Traditional Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

3. Or export as static HTML (optional for static hosting):
   ```bash
   next export
   ```

## 🔄 API Endpoints

The website includes several API endpoints for dynamic content:

- `/api/menu` - Get all menu items
- `/api/menu/[id]` - Get details for a specific menu item
- `/api/booking` - POST endpoint for table reservations
- `/api/chefs` - Get information about the restaurant's chefs
- `/api/events` - Get special events and private dining options
- `/api/gallery` - Get gallery images
- `/api/testimonials` - Get customer reviews and testimonials
- `/api/specials` - Get chef's special menu items

## 📱 Styling and Responsiveness

The website follows a mobile-first approach with responsive design principles:

- Fluid layouts that adapt to different screen sizes
- Optimized images with appropriate sizing for mobile devices
- Touch-friendly navigation and interactive elements
- Conditional rendering for optimal experiences on different devices
- CSS media queries for targeted styling at specific breakpoints

## ⚡ Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for below-the-fold content
- Component-level code splitting
- Efficient animations with hardware acceleration
- Minimized CSS with scoped styles
- Optimized font loading with next/font

## 👥 Contributors

- Koceila djaballah (https://github.com/ITNKOC) - Lead Developer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

© 2025 ITNKOC. All Rights Reserved.
