# 🗺️ Implementation Roadmap - Astro By Ab

## 📍 Current State: 45% Framework Complete

The app has a solid authentication and UI foundation. Core missing piece is the **business logic** (payments, kundli calculations, consultation management).

---

## Phase 1: MVP (Week 1-2) 🔴 CRITICAL

### Must Complete for Basic Functionality

#### 1.1 Payment Gateway ⚠️
**Priority:** CRITICAL - Blocks entire booking system

```
Objective: Enable users to pay for consultations

Tasks:
- [ ] Add Stripe/Razorpay integration
- [ ] Create payment form in /book-consultation
- [ ] Implement payment verification
- [ ] Store payment ID in Consultation model
- [ ] Show payment status on dashboard
- [ ] Send payment confirmation email

Files to Create/Modify:
- /app/api/payments/route.ts (new)
- /app/book-consultation/page.tsx (modify)
- /prisma/schema.prisma (add paymentDetails)
- /lib/stripe.ts or /lib/razorpay.ts (new)

Estimated: 3-4 days
```

#### 1.2 User Birth Profile ⚠️
**Priority:** CRITICAL - Needed for kundli

```
Objective: Collect user birth details

Tasks:
- [ ] Add profile edit page
- [ ] Create/update User model fields:
  - dateOfBirth
  - birthTime (HH:MM format)
  - birthPlace
  - birthCountry
- [ ] Create form with date/time inputs
- [ ] Validate and store data
- [ ] Display on dashboard

Files to Create/Modify:
- /app/profile/edit/page.tsx (new)
- /prisma/schema.prisma (modify User model)
- /app/api/user/profile/route.ts (new)
- /components/profile-form.tsx (new)

Estimated: 2-3 days
```

#### 1.3 Kundli Calculation ⚠️
**Priority:** CRITICAL - Core feature

```
Objective: Generate birth charts

Options:
A. Use existing API (Easiest)
   - VedicAstro API
   - Astro API
   - Cost: $5-50/month

B. Build custom (Complex)
   - Use librarycalc library
   - Requires astronomical calculations
   - Time: 2-3 weeks

Recommendation: Use API for MVP

Tasks:
- [ ] Choose & integrate API
- [ ] Create kundli generation endpoint
- [ ] Store kundli data in database
- [ ] Create kundli display component
- [ ] Add kundli to dashboard

Files to Create/Modify:
- /app/api/kundli/generate/route.ts (new)
- /lib/kundli-service.ts (new)
- /components/kundli-display.tsx (new)
- /app/dashboard/page.tsx (modify)
- /prisma/schema.prisma (add Kundli model)

API to Integrate:
- Endpoint: API_URL/kundli/basic
- Required: birthDate, birthTime, birthPlace

Estimated: 3-4 days (with API), 2-3 weeks (custom)
```

#### 1.4 Consultation Status Workflow ⚠️
**Priority:** HIGH - User expectations

```
Objective: Track consultation lifecycle

Status Flow:
pending → confirmed → completed → archived

Tasks:
- [ ] Add status field to Consultation model
- [ ] Create status update API
- [ ] Add status display on consultation card
- [ ] Create consultation detail page
- [ ] Add admin approval workflow
- [ ] Send notifications on status change

Files to Create/Modify:
- /app/dashboard/page.tsx (show consultations)
- /app/consultations/[id]/page.tsx (new)
- /app/admin/consultations/page.tsx (modify)
- /app/api/consultations/[id]/route.ts (new)
- /lib/email-service.ts (modify)
- /prisma/schema.prisma (modify Consultation)

Estimated: 2-3 days
```

**Phase 1 Timeline: 10-15 days**

---

## Phase 2: Enhanced Features (Week 3-4) 🟡 IMPORTANT

### Make App Functional & User-Friendly

#### 2.1 Email Notifications
```
- Consultation confirmation
- Payment receipts
- Appointment reminders
- Status updates

Files: /lib/email-service.ts (enhance)
Estimated: 2 days
```

#### 2.2 Admin Features
```
- User management (edit/delete roles)
- Consultation approval system
- Pricing management UI
- Analytics dashboard
- Activity logs

Files: /app/admin/** (enhance)
Estimated: 3-4 days
```

#### 2.3 Consultation Calendar
```
- Calendar widget
- Available time slots
- Booking confirmation
- Timezone support

Files: 
- /components/consultation-calendar.tsx (new)
- /app/api/slots/route.ts (new)
Estimated: 3-4 days
```

#### 2.4 File Management
```
- PDF generation for kundli
- Report storage
- Downloads

Files:
- /lib/pdf-service.ts (new)
- /app/api/reports/route.ts (new)
Estimated: 2-3 days
```

**Phase 2 Timeline: 10-14 days**

---

## Phase 3: Polish & Scale (Week 5-6) 🟢 NICE TO HAVE

### Make App Production-Ready

#### 3.1 Analytics & Reporting
```
- Dashboard charts
- Revenue tracking
- User metrics
- Export reports

Technologies:
- Recharts (already installed)
- PDF Export
Estimated: 3-4 days
```

#### 3.2 Advanced Features
```
- Search & filtering
- Pagination
- User review system
- Recommendations
- Advanced kundli details

Estimated: 4-5 days
```

#### 3.3 Performance & Security
```
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting on APIs

Estimated: 2-3 days
```

#### 3.4 Testing & QA
```
- Unit tests
- Integration tests
- Manual testing
- Bug fixes

Estimated: 3-4 days
```

**Phase 3 Timeline: 12-16 days**

---

## 🎯 Quick Start Implementation Guide

### Week 1 - Priority Order

**Day 1-2: Payment Integration**
```typescript
// 1. Add to .env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

// 2. Install Stripe
npm install stripe @stripe/react-stripe-js

// 3. Create /app/api/payments/create/route.ts
// 4. Update /app/book-consultation/page.tsx
```

**Day 3-4: User Profile**
```typescript
// 1. Update schema.prisma
model User {
  // ... existing fields
  dateOfBirth DateTime?
  birthTime String?
  birthPlace String?
}

// 2. Create /app/profile/edit/page.tsx
// 3. Create profile form component
// 4. Add API endpoint
```

**Day 5-6: Kundli API**
```typescript
// 1. Sign up for VedicAstro/Astro API
// 2. Add API key to .env.local
// 3. Create /lib/kundli-service.ts
// 4. Create /app/api/kundli/generate/route.ts
// 5. Add to dashboard
```

**Day 7: Status Workflow**
```typescript
// 1. Update Consultation model
// 2. Create status update API
// 3. Add to consultation page
// 4. Update admin view
```

---

## 📊 Tech Stack & Libraries

### Already Installed ✅
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- NextAuth.js
- React Hook Form
- Zod validation
- Sonner (notifications)

### Need to Install 🔧
```bash
# Payment
npm install stripe @stripe/react-stripe-js

# OR Razorpay
npm install razorpay @razorpay/razorpay

# PDF Generation
npm install jspdf html2canvas

# Calendar
npm install react-big-calendar

# Charts (already have Recharts)
# Already installed: recharts

# Utilities
npm install date-fns dayjs lodash
```

---

## 🔐 Security Checklist

- [ ] Rate limit API endpoints
- [ ] Validate all inputs with Zod
- [ ] Use parameterized queries (Prisma handles this)
- [ ] Hash sensitive data
- [ ] HTTPS only in production
- [ ] CORS properly configured
- [ ] SQL injection prevention (use ORM)
- [ ] XSS prevention (React handles this)
- [ ] CSRF tokens on forms
- [ ] Secure session cookies
- [ ] Environment variables never exposed
- [ ] User role checks on admin APIs

---

## 💾 Database Additions

### Phase 1 Changes to schema.prisma

```prisma
// Add to User model
dateOfBirth DateTime?
birthTime String?
birthPlace String?
birthCountry String?

// Add new model
model Kundli {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id])
  
  birthChart String @db.Json
  sunSign String
  moonSign String
  ascendant String
  
  generatedAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Update Consultation model
status String @default("pending") // pending, confirmed, completed
consultationNotes String? @db.Text
reportUrl String?
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] Error handling complete
- [ ] Logging implemented
- [ ] Backups configured
- [ ] SSL certificate
- [ ] Domain configured
- [ ] Email service tested
- [ ] Payment gateway in production mode
- [ ] Monitoring set up

---

## 📱 Key Endpoints to Build

### Priority Order

1. **POST /api/payments/create** - Create payment intent
2. **POST /api/payments/verify** - Verify payment
3. **GET /api/user/profile** - Get user details
4. **PUT /api/user/profile** - Update profile
5. **POST /api/kundli/generate** - Generate birth chart
6. **GET /api/consultations** - List user consultations
7. **GET /api/consultations/[id]** - Get detail
8. **PATCH /api/consultations/[id]** - Update status
9. **GET /api/admin/users** - Admin user list (already done)
10. **GET /api/admin/analytics** - Dashboard data

---

## ✨ User Journey After MVP

### User Path
1. Sign Up → Get OTP → Verify Email
2. Login → Add Birth Details
3. Browse Services → Select Service
4. Add Birth Info (auto-filled) → Review Kundli Preview
5. Make Payment → Confirmation
6. Book Consultation → Schedule Time
7. Wait for Admin Approval → Get Confirmation
8. Attend Consultation → Download Report
9. Rate Experience → Recommend to Friends

### Admin Path
1. Login → See Dashboard Stats
2. Review New Consultations
3. Approve/Reject Consultations
4. Manage Pricing & Services
5. View User Details
6. Generate Reports
7. Update Kundli Records

---

## 🎯 Success Metrics

- [ ] Users can complete full booking flow
- [ ] Payment processing works
- [ ] Kundli generation functional
- [ ] Admin can manage consultations
- [ ] Email notifications sent
- [ ] 99.9% API uptime
- [ ] < 2s page load time
- [ ] Mobile responsive
- [ ] Zero critical bugs
- [ ] User engagement > 80%

---

## 📞 Questions Before Starting?

1. **Payment Gateway:** Stripe or Razorpay?
2. **Kundli:** API or custom calculation?
3. **Email Service:** SendGrid, Gmail, or other?
4. **File Storage:** Vercel Blob, AWS S3, or Cloudinary?
5. **Timeline:** MVP in 2 weeks or full build?

---

**Next Steps:**
1. Review this roadmap
2. Choose payment gateway
3. Start Phase 1 implementation
4. Create issues for each task
5. Set sprint schedule

🚀 Ready to build!
