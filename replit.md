# Sigma Earth Mobile App

## Overview

This is a React-based mobile application for Sigma Earth, a sustainability hub platform. The app provides access to environmental courses, green jobs, eco-friendly listings, and sustainability events. It's built as a Progressive Web App (PWA) with a mobile-first design approach, intended to mirror the functionality of the Sigma Earth website (https://sigmaearth.com/).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: Radix UI components with shadcn/ui styling
- **State Management**: TanStack Query for server state management
- **PWA Features**: Service worker for offline caching and app manifest

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution
- **Build Process**: esbuild for production bundling
- **API Structure**: RESTful endpoints with proper error handling

### Mobile-First Design
- **Navigation**: Bottom navigation bar for mobile-optimized UX
- **UI Components**: Mobile-responsive design with touch-friendly interactions
- **Progressive Web App**: Installable with offline capabilities

## Key Components

### Client-Side Components
1. **Layout System**
   - Main layout with header and bottom navigation
   - Search overlay for content discovery
   - Responsive design optimized for mobile devices

2. **Content Components**
   - CourseCard: Displays environmental courses with enrollment options
   - JobCard: Shows sustainability job listings with application functionality
   - EcoListingCard: Presents eco-friendly products and services
   - EventCard: Features sustainability events with registration
   - NewsCard: Displays WordPress news content

3. **Navigation**
   - Bottom navigation with 5 main sections (Home, Courses, Jobs, Eco Listing, Events)
   - Search functionality with category filtering
   - Mobile-optimized touch interactions

### Server-Side Architecture
1. **API Routes** (`server/routes.ts`)
   - GET `/api/courses` - Fetch all courses
   - GET `/api/courses/:id` - Fetch specific course
   - GET `/api/jobs` - Fetch all jobs
   - GET `/api/jobs/:id` - Fetch specific job
   - Similar patterns for eco-listings and events

2. **Storage Layer** (`server/storage.ts`)
   - Interface-based storage abstraction
   - In-memory storage implementation for development
   - Methods for CRUD operations on all content types

3. **WordPress Integration** (`client/src/lib/api.ts`)
   - WordPress REST API integration for news content
   - Content fetching from https://sigmaearth.com/wp-json/wp/v2

## Data Flow

### Content Management
1. **Local Data**: Courses, jobs, eco-listings, and events stored in application database
2. **WordPress Integration**: News and blog content fetched from Sigma Earth WordPress site
3. **Real-time Sync**: API endpoints provide fresh content with caching strategies
4. **Offline Support**: Service worker caches critical content for offline access

### User Interactions
1. **Navigation**: Bottom nav provides quick access to main sections
2. **Search**: Global search across all content types with category filtering
3. **Content Discovery**: Category-based filtering within each section
4. **Actions**: Enrollment, application, and registration flows for interactive content

## External Dependencies

### WordPress Integration
- **Source**: https://sigmaearth.com/wp-json/wp/v2
- **Purpose**: Fetch news articles and blog content
- **Implementation**: REST API calls with embedded media and author data

### Database System
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured but not yet implemented)
- **Schema**: Defined in `shared/schema.ts` with tables for users, courses, jobs, eco-listings, events, and news

### UI Component Library
- **Primary**: Radix UI primitives for accessible components
- **Styling**: shadcn/ui design system with Tailwind CSS
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Type Safety**: TypeScript throughout the application
- **Code Quality**: ESLint and Prettier configurations
- **Build Optimization**: Vite for fast builds and HMR
- **Deployment**: Prepared for Replit hosting with dev banner integration

## Deployment Strategy

### Progressive Web App Features
1. **Manifest**: Configured for app installation with icons and shortcuts
2. **Service Worker**: Implements caching strategies for offline functionality
3. **Mobile Optimization**: Responsive design with touch-friendly interactions

### Build Process
1. **Development**: `npm run dev` - Runs with tsx and Vite dev server
2. **Production Build**: `npm run build` - Vite build + esbuild for server
3. **Database**: `npm run db:push` - Drizzle schema deployment

### Environment Configuration
- **Development**: Local development with Vite HMR
- **Production**: Node.js server with static file serving
- **Database**: PostgreSQL with connection string from environment

## Changelog

Changelog:
- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.