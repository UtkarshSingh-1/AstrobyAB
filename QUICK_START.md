# 🚀 Quick Start Guide

## 📋 Pre-requisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create `.env.local`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/astrology_db
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Setup Database
```bash
npx prisma migrate dev
npx ts-node scripts/seed-demo.ts
```

### 4. Run Dev Server
```bash
npm run dev
```

### 5. Test Demo Accounts

**User Account:**
- URL: http://localhost:3000/signin
- Email: `demo@user.com`
- Password: `Demo@123`
- Access: `/dashboard`

**Admin Account:**
- URL: http://localhost:3000/signin
- Email: `demo@admin.com`
- Password: `Admin@123`
- Access: `/admin/dashboard`

---

## 🗂️ Project Structure

```
astrobyabauthsetup/
├── app/
│   ├── (auth pages)
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── consultations/
│   │   ├── kundli/
│   │   └── pricing/
│   ├── services/
│   │   ├── janam-kundli/
│   │   ├── career-guidance/
│   │   ├── marriage-matching/
│   │   ├── health-wealth/
│   │   ├── gemstone-remedies/
│   │   ├── mantra-remedies/
│   │   └── complete-astrology/
│   ├── dashboard/
│   ├── book-consultation/
│   ├── api/
│   │   ├── auth/
│   │   ├── admin/
│   │   └── booking/
│   └── layout.tsx
├── components/
│   ├── ui/ (Shadcn components)
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   └── ...
├── lib/
│   ├── auth.ts (NextAuth config)
│   ├── prisma.ts
│   ├── schemas.ts (Zod validators)
│   ├── otp.ts
│   └── mail.tsx
├── prisma/
│   └── schema.prisma
├── scripts/
│   ├── seed-demo.ts
│   └── seed-demo.sql
└── public/

```

---

## 🎯 Key Features Already Built

✅ **Authentication**
- Email/Password login
- OTP-based signup
- Password reset
- Google OAuth ready

✅ **User Dashboard**
- Welcome message
- Service cards
- Profile display
- Book consultation link

✅ **Admin Dashboard**
- Statistics display
- User management
- Consultation management
- Pricing management

✅ **Pages**
- Landing page with hero, features, services
- All auth pages
- Service detail pages
- About, Contact, Privacy policy

✅ **Database**
- Users with roles (USER/ADMIN)
- Consultations tracking
- Service pricing
- OTP records

✅ **UI/UX**
- Responsive design
- Dark mode support
- Theme system
- 50+ shadcn components

---

## 🔴 What's Missing (Must Have)

1. **Payment Integration** (Stripe/Razorpay)
   - Payment gateway setup
   - Payment verification
   - Invoice generation

2. **Kundli Calculation**
   - Calculation algorithms
   - Chart visualization
   - Data storage

3. **User Profile**
   - Birth date input
   - Location/Birth place
   - Edit profile page

4. **Email Service**
   - SMTP configuration
   - OTP emails
   - Confirmation emails

5. **Consultation Workflow**
   - Status tracking
   - Approval system
   - Scheduling/Calendar

6. **File Management**
   - PDF generation
   - Report storage
   - Downloads

7. **Notifications**
   - In-app notifications
   - Email alerts
   - SMS alerts

---

## 🛠️ Common Tasks

### Add New Service
1. Create page in `/app/services/[service-name]/`
2. Add route to navigation
3. Update database service prices

### Create Admin Function
1. Add logic to `/app/api/admin/[function]/route.ts`
2. Create page in `/app/admin/[function]/`
3. Add admin role check in component

### Add New Database Model
1. Update `/prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Use in API routes

### Fix Authentication Issues
1. Check `.env.local` variables
2. Verify JWT secret is set
3. Clear browser cookies
4. Restart dev server

---

## 📊 Database Schema Quick View

**User Model:**
- id, email (unique), name, role (USER/ADMIN)
- passwordHash, emailVerified
- createdAt, updatedAt

**Consultation Model:**
- id, userId, email, name
- serviceName, price
- paymentStatus, consultationDate
- notes, createdAt

**ServicePrice Model:**
- id, serviceName (unique)
- price, description
- updatedAt, updatedBy

**Otp Model:**
- id, email, otp (hashed)
- purpose (SIGNUP/RESET_PASSWORD)
- expiresAt, createdAt

---

## 🔗 Important APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/signup/send-otp` | Send OTP for signup |
| POST | `/api/auth/signup/verify-otp` | Verify OTP & create user |
| POST | `/api/auth/signin` | Sign in with credentials |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/stats` | Get dashboard stats |
| POST | `/api/booking` | Create consultation |
| GET | `/api/admin/pricing` | Get service prices |

---

## 🎨 Customization

### Update Colors
Edit `/app/globals.css` design tokens:
```css
--primary: #color-code;
--secondary: #color-code;
```

### Add New Pages
Create new route in `/app/[page-name]/page.tsx`

### Modify Components
Edit files in `/components/`

### Database Changes
1. Modify `/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description`

---

## 🐛 Troubleshooting

**Error: "DATABASE_URL not set"**
→ Add DATABASE_URL to .env.local

**Error: "NEXTAUTH_SECRET not set"**
→ Generate: `openssl rand -base64 32`

**Error: "Connection refused"**
→ Ensure PostgreSQL is running

**Error: "PrismaClientInitializationError"**
→ Run `npx prisma generate`

**Login not working**
→ Check demo account email/password
→ Clear cookies and try again

---

## 📞 Support

For detailed information, see `DEMO_SETUP_GUIDE.md`

For implementation priority, see `DEMO_SETUP_GUIDE.md` Phase section
