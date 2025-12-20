# Recodd — Freelance Marketplace Platform

Recodd is a full-stack freelance marketplace built with Next.js App Router.  
It enables users to explore freelancer and business profiles, contact them via real email delivery, and provides an admin inbox to manage incoming requests.

• Built a full-stack freelance marketplace using Next.js App Router, Supabase, and Resend, featuring real email contact flow and an admin inbox with read/unread state management.

## Features

- Freelancer & business marketplace
- Profile detail pages
- Real contact flow with email delivery
- Contact requests stored in database
- Admin inbox with read/unread state
- Responsive dark UI

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Resend (Email delivery)

## Architecture Highlights

- API routes for marketplace and contact flow
- Service layer abstraction for data fetching
- Server Components for admin pages
- Client Components for interactive UI
- Database persistence with side-effect handling

## Contact Flow

1. User submits contact form from a profile page
2. Request is saved to Supabase
3. Email is sent via Resend
4. Admin can view and manage messages in inbox

## Future Improvements

- Admin authentication
- Pagination & advanced filters
- User accounts

---

Built by Anas Sayyed
