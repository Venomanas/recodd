# Recodd — Modern Freelance Marketplace Platform

**Recodd** is a full-stack, production-ready freelance marketplace platform built with cutting-edge web technologies. It connects freelancers and businesses through an intuitive interface, enabling seamless profile discovery, direct contact, and comprehensive admin management.

Built by **Anas Sayyed**

---

## 🚀 Tech Stack Overview

### **Core Framework & Language**

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router architecture
- **[React 19.2.1](https://react.dev/)** - Latest React version for building user interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript with ES2017 target

### **Styling & UI**

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework with PostCSS
- **[Framer Motion 12](https://www.framer.com/motion/)** - Production-ready animation library
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon packs (Twitter, LinkedIn, Instagram, GitHub)
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional className utilities

### **Backend & Database**

- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time capabilities
  - Supabase JS SDK v2.89.0
  - Service role authentication
  - Session-less server-side operations

### **Email & Communication**

- **[Resend](https://resend.com/)** - Modern email API for transactional emails
  - Contact form submissions
  - Admin notifications

### **Rate Limiting & Security**

- **[Upstash Redis](https://upstash.com/)** - Serverless Redis for rate limiting
- **[Upstash Rate Limit](https://github.com/upstash/ratelimit)** - API rate limiting middleware

### **Development Tools**

- **ESLint 9** - Code linting with Next.js config
- **PostCSS** - CSS processing for Tailwind
- **TypeScript Strict Mode** - Enhanced type safety

---

## 📐 Project Architecture

### **File Structure**

```
recodd/
├── app/                          # Next.js App Router
│   ├── components/               # Shared components
│   │   ├── Navbar.tsx           # Navigation with user auth
│   │   ├── ContactModal.tsx     # Contact form modal
│   │   ├── ProjectPreviewModal.tsx
│   │   ├── AdminInboxClient.tsx # Admin message management
│   │   └── ...
│   ├── recodd/                  # Landing page sections
│   │   ├── InspirationalHero.tsx
│   │   ├── CategorySection.tsx
│   │   ├── MarketplaceSection/
│   │   │   ├── MarketPlaceSection.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── FiltersBar.tsx
│   │   │   └── SkeletonCard.tsx
│   │   ├── SocialProofSection.tsx
│   │   └── Logo.tsx
│   ├── api/                     # API routes
│   │   ├── contact/             # Contact form endpoint
│   │   └── marketplace/         # Data fetching
│   │       ├── freelancers/
│   │       └── businesses/
│   ├── freelancer/[id]/         # Dynamic freelancer profile
│   ├── business/[id]/           # Dynamic business profile
│   ├── freelancers/             # All freelancers page
│   ├── businesses/              # All businesses page
│   ├── category/[slug]/         # Category filtering
│   ├── admin/messages/          # Admin inbox
│   ├── login/                   # Authentication
│   ├── signup/                  # Registration
│   ├── profile/                 # User profile
│   ├── dashboard/               # User dashboard
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── lib/                         # Utilities
│   ├── supabaseClient.ts       # Database client
│   └── recodd/                 # Business logic
├── public/                      # Static assets
├── .env.local                   # Environment variables
└── package.json
```

### **Rendering Strategy**

- **Server Components**: Profile pages, admin dashboard, marketplace listings
- **Client Components**: Interactive UI, forms, modals, animations
- **Server Actions**: Form submissions, data mutations
- **API Routes**: RESTful endpoints for data fetching

---

## 🔄 Complete Website Workflow

### **1. Landing Page Flow**

```
User lands on homepage (page.tsx)
    ↓
Views InspirationalHero section
    ↓
Explores CategorySection (Design, Development, Marketing, etc.)
    ↓
Browses MarketplaceSection (Featured freelancers & businesses)
    ↓
Reviews SocialProofSection (testimonials/stats)
    ↓
Navigates via Navbar or Footer links
```

### **2. Marketplace Discovery**

```
User clicks "Browse Talent" or category
    ↓
Lands on /freelancers or /businesses page
    ↓
Uses FiltersBar to filter by:
    - Category (Design, Development, Marketing, etc.)
    - Experience level
    - Availability
    ↓
Views ProfileCards with:
    - Avatar/logo
    - Name/company
    - Skills/tags
    - Rating/reviews
    - "Contact" button
    ↓
Clicks on profile card
    ↓
Navigates to dynamic route: /freelancer/[id] or /business/[id]
```

### **3. Profile Detail Page**

```
Server Component fetches profile data from Supabase
    ↓
Displays comprehensive profile:
    - Hero section with avatar/cover
    - About/bio
    - Skills & expertise
    - Portfolio/projects (with ProjectPreviewModal)
    - Experience/testimonials
    - Contact button
    ↓
User clicks "Contact" button
    ↓
ContactModal opens (Client Component)
```

### **4. Contact Flow (Core Feature)**

```
User fills ContactModal form:
    - Name
    - Email
    - Subject
    - Message
    ↓
Submits form → API route: /api/contact
    ↓
Backend process:
    ├─ Validate input data
    ├─ Check rate limit (Upstash)
    ├─ Save message to Supabase 'messages' table
    │   - Profile ID
    │   - Sender info
    │   - Message content
    │   - Timestamp
    │   - Read status (default: false)
    └─ Send email via Resend
        - To: profile owner
        - From: sender email
        - Content: formatted message
    ↓
Return success/error response
    ↓
Display confirmation to user
```

### **5. Admin Inbox Management**

```
Admin navigates to /admin/messages
    ↓
AdminInboxClient (Server Component) loads:
    - All contact requests from Supabase
    - Sorted by timestamp (newest first)
    - Shows read/unread status
    ↓
Admin views message list:
    - Sender name & email
    - Subject
    - Preview snippet
    - Timestamp
    - Badge (unread indicator)
    ↓
Admin clicks message to expand
    ↓
Message marked as "read" in database
    ↓
Full message content displayed
    ↓
Admin can:
    - Reply via email client
    - Archive/delete message
    - Mark as unread
```

### **6. Category Navigation**

```
User clicks category in CategorySection
    ↓
Navigates to /category/[slug]
    (e.g., /category/design, /category/development)
    ↓
Filtered marketplace view shows:
    - Only profiles matching category
    - Category-specific hero
    - Relevant filters active
    ↓
User can browse and contact profiles
```

### **7. Authentication Flow (Planned)**

```
User clicks "Sign Up" → /signup
    ↓
Fills registration form
    ↓
Account created in Supabase Auth
    ↓
Redirected to /dashboard
    ↓
User can:
    - Create/edit profile
    - View received messages
    - Manage projects/portfolio
    - Update settings
```

---

## 🎨 Design System

### **Color Scheme**

The app uses CSS custom properties for theming:

- `--bg`: Background color
- `--surface`: Card/surface color
- `--text`: Primary text
- `--muted`: Secondary text
- `--accent`: Brand/action color
- `--border`: Border color

### **Component Library**

- **ProfileCard**: Displays user/business preview with hover effects
- **ContactModal**: Animated modal with form validation
- **FiltersBar**: Dynamic filtering UI
- **Breadcrumbs**: Navigation trail
- **AnimatedButton**: Motion-enhanced CTAs
- **SkeletonCard**: Loading state placeholders

### **Animations**

Powered by Framer Motion:

- Page transitions
- Card hover effects
- Modal entrance/exit
- Button interactions
- Scroll-triggered animations

---

## 🔒 Security & Performance

### **Rate Limiting**

- Upstash Redis-based rate limiting on contact endpoint
- Prevents spam and abuse

### **Database Security**

- Supabase Row-Level Security (RLS) policies
- Service role for server-side operations
- No client-side database exposure

### **Type Safety**

- Full TypeScript coverage
- Strict mode enabled
- No implicit `any` types

### **Performance**

- Server Components reduce client JavaScript
- Static generation where possible
- Image optimization via Next.js
- CSS-in-JS avoided for better performance

---

## 📊 Database Schema (Supabase)

### **Tables**

```sql
-- profiles (freelancers/businesses)
profiles
├── id (uuid, primary key)
├── type (freelancer | business)
├── name (text)
├── email (text)
├── bio (text)
├── avatar_url (text)
├── skills (text[])
├── category (text)
├── rating (numeric)
├── created_at (timestamp)
└── ...

-- messages (contact requests)
messages
├── id (uuid, primary key)
├── profile_id (uuid, foreign key → profiles)
├── sender_name (text)
├── sender_email (text)
├── subject (text)
├── message (text)
├── read (boolean, default: false)
├── created_at (timestamp)
└── ...
```

---

## 🌍 Environment Variables

Required in `.env.local`:

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

---

## 🚀 Getting Started

### **Installation**

```bash
# Clone the repository
git clone <repository_url>
cd recodd

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

### **Build for Production**

```bash
npm run build
npm run start
```

### **Linting**

```bash
npm run lint
```

---

## ✨ Key Features

### **For Users**

- ✅ Browse freelancers and businesses by category
- ✅ View detailed profiles with portfolios
- ✅ Contact profiles via integrated email
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode UI
- ✅ Smooth animations and transitions

### **For Admins**

- ✅ Centralized inbox for all contact requests
- ✅ Read/unread message tracking
- ✅ Real-time message updates
- ✅ Message search and filtering (planned)

### **Technical Excellence**

- ✅ Full TypeScript type safety
- ✅ Server-side rendering for SEO
- ✅ API rate limiting
- ✅ Error boundaries and graceful error handling
- ✅ Optimistic UI updates
- ✅ Loading states and skeletons

---

## 🛣️ Roadmap & Future Improvements

### **Phase 1: Enhanced Authentication**

- [ ] Full Supabase Auth integration
- [ ] User session management
- [ ] Protected routes
- [ ] OAuth providers (Google, GitHub)

### **Phase 2: Advanced Features**

- [ ] Pagination for marketplace
- [ ] Advanced search with Algolia/Meilisearch
- [ ] Project posting system
- [ ] Proposal/bid functionality
- [ ] Real-time chat (Supabase Realtime)

### **Phase 3: Analytics & Optimization**

- [ ] Profile view tracking
- [ ] Conversion analytics
- [ ] A/B testing framework
- [ ] Performance monitoring (Vercel Analytics)

### **Phase 4: Monetization**

- [ ] Premium listings
- [ ] Featured profiles
- [ ] Verified badges
- [ ] Subscription tiers

---

## 📝 API Endpoints

### **Marketplace**

- `GET /api/marketplace/freelancers` - Fetch all freelancers
- `GET /api/marketplace/freelancers/[id]` - Get single freelancer
- `GET /api/marketplace/businesses` - Fetch all businesses
- `GET /api/marketplace/businesses/[id]` - Get single business

### **Contact**

- `POST /api/contact` - Submit contact form
  ```json
  {
    "profileId": "uuid",
    "senderName": "John Doe",
    "senderEmail": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello, I'd like to discuss..."
  }
  ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 📞 Contact

**Developer**: Iffat
**Project**: Recodd Freelance Marketplace  
**Year**: 2026

---

## 🙏 Acknowledgments

- Next.js team for the incredible framework
- Supabase for backend infrastructure
- Vercel for deployment platform
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
