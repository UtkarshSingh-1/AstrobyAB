# 🎯 Quick Reference Card

## 🔑 Demo Accounts
```
USER:  demo@user.com / Demo@123       → /dashboard
ADMIN: demo@admin.com / Admin@123     → /admin/dashboard
```

## 📊 Current Status
```
✅ Authentication (100%)
✅ UI/Pages (100%)
✅ Database (100%)
❌ Payments (0%)
❌ Kundli (0%)
⚠️  Consultations (30%)
```

## 🚀 Setup (3 Commands)
```bash
npx prisma migrate dev
npx ts-node scripts/seed-demo.ts
npm run dev
```

## 🛠️ Key Files
| Purpose | File |
|---------|------|
| Auth Config | `/lib/auth.ts` |
| Database | `/prisma/schema.prisma` |
| User Dashboard | `/app/dashboard/page.tsx` |
| Admin Dashboard | `/app/admin/dashboard/page.tsx` |
| APIs | `/app/api/` |
| Components | `/components/` |

## 📝 Environment Variables
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=random-key
NEXTAUTH_URL=http://localhost:3000
```

## 🔄 Database Models
```
User (id, email, role, passwordHash, ...)
Consultation (id, userId, serviceName, status, ...)
ServicePrice (id, serviceName, price)
Otp (id, email, otp, purpose)
Account, Session, VerificationToken
```

## 📄 Routes (Protected)
```
/dashboard          → User only
/admin/dashboard    → Admin only
/admin/users        → Admin only
/admin/consultations → Admin only
/admin/kundli       → Admin only
/admin/pricing      → Admin only
```

## 🔓 Public Routes
```
/                   → Home
/signin, /signup
/about, /contact
/privacy-policy
/services/*
/unauthorized
```

## 🔴 What's Missing (MVP)
1. **Payments** - Stripe/Razorpay integration
2. **Kundli** - Birth chart calculation
3. **Profiles** - User birth details form
4. **Email** - SMTP configuration
5. **Workflow** - Consultation approval system

## ⏱️ Timeline
```
Phase 1: 10-15 days (Payments, Kundli, Profiles)
Phase 2: 10-14 days (Admin, Notifications, Calendar)
Phase 3: 12-16 days (Analytics, Polish, Deploy)
Total MVP: ~3 weeks
```

## 📚 Docs
```
QUICK_START.md         → Start here (5 min)
FEATURE_CHECKLIST.md   → What's built (10 min)
ROADMAP.md             → Plan (20 min)
TEST_SCENARIOS.md      → Test (15 min)
```

## 🆘 Common Commands
```bash
npm install              # Install deps
npm run dev              # Start dev server
npm run build            # Build for prod
npm run lint             # Check code

npx prisma studio       # Database UI
npx prisma migrate dev  # Run migrations
npx ts-node <script>    # Run TypeScript
```

## 🎨 Components Available
- Form inputs
- Buttons (primary, outline, ghost)
- Cards
- Modals/Dialogs
- Tables
- Tabs
- Dropdowns
- And 40+ more (shadcn/ui)

## 🔐 API Endpoints
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/signup/send-otp` | ❌ |
| POST | `/api/auth/signup/verify-otp` | ❌ |
| GET | `/api/admin/users` | ✅ ADMIN |
| GET | `/api/admin/stats` | ✅ ADMIN |
| POST | `/api/booking` | ✅ USER |

## 🎯 First Tasks
- [ ] Run `npm install`
- [ ] Create `.env.local`
- [ ] Setup database
- [ ] Run `npx ts-node scripts/seed-demo.ts`
- [ ] Start dev server
- [ ] Login with demo accounts
- [ ] Choose payment provider
- [ ] Choose kundli source

## 📊 Useful Stats
```
Total Files: 150+
UI Components: 50+
API Routes: 10+
Pages Built: 20+
DB Models: 6
Authentication: ✅
Authorization: ✅
Styling: ✅
Responsive: ✅
Dark Mode: ✅
```

## 🔗 Important Links
- Next.js: https://nextjs.org
- NextAuth: https://next-auth.js.org
- Prisma: https://prisma.io
- Shadcn/ui: https://ui.shadcn.com
- Tailwind: https://tailwindcss.com

## ⚙️ Configuration
```
Language: TypeScript
Framework: Next.js 16
Database: PostgreSQL
ORM: Prisma
Auth: NextAuth.js
UI: Tailwind + Shadcn
Forms: React Hook Form
Validation: Zod
```

## 🌐 Color Scheme
```
Primary: Mars Gradient (Red/Orange)
Secondary: Cosmic Accents
Background: Dark with warm tones
Text: Foreground/Muted-Foreground
```

## 📱 Responsive
```
Desktop: 1920px+
Tablet: 768px - 1024px
Mobile: 375px - 767px
```

---

**Print this and keep handy while developing!**

Last Updated: February 2, 2026
