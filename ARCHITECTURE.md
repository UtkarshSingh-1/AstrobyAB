# AstrobyAB Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER / CLIENT                        │
│                                                               │
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │   Sign In Page   │         │  Dashboard Pages         │  │
│  │  (/signin)       │────────▶│  (/dashboard)            │  │
│  │                  │         │  (/admin/dashboard)      │  │
│  │ • Email input    │         │  (/admin/users)          │  │
│  │ • Password input │         │  (/admin/consultations)  │  │
│  │ • Demo hints     │         │                          │  │
│  └────────┬─────────┘         └────────────┬─────────────┘  │
│           │                                │                │
│           └────────────────┬───────────────┘                │
│                            │                                │
│          useSession()  ◀────┴─────▶  NextAuth/JWT Token     │
│                            │      (httpOnly cookie)         │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │
                             ▼
          ┌──────────────────────────────────────┐
          │     NextAuth Authentication Layer    │
          │                                      │
          │  ┌───────────────────────────────┐  │
          │  │  Credentials Provider         │  │
          │  │  • Receives email + password  │  │
          │  │  • Validates with bcrypt      │  │
          │  │  • Creates JWT token          │  │
          │  │  • Returns user role          │  │
          │  └────────┬──────────────────────┘  │
          │           │                         │
          │           ▼                         │
          │  ┌───────────────────────────────┐  │
          │  │  JWT Token Management         │  │
          │  │  • Signed with NEXTAUTH_SECRET│  │
          │  │  • HttpOnly cookie storage    │  │
          │  │  • Session callbacks add role │  │
          │  └───────────────────────────────┘  │
          │                                      │
          └──────────────────┬───────────────────┘
                             │
                             ▼
          ┌──────────────────────────────────────┐
          │        Prisma ORM Layer              │
          │                                      │
          │  Query builder + type safety         │
          │  Migration management                │
          │  Schema validation                   │
          │                                      │
          └──────────────────┬───────────────────┘
                             │
                             ▼
          ┌──────────────────────────────────────┐
          │        PostgreSQL Database           │
          │                                      │
          │  ┌────────────────────────────────┐ │
          │  │ Users Table                    │ │
          │  │ • id, email, name              │ │
          │  │ • passwordHash (bcrypt)        │ │
          │  │ • role (USER/ADMIN)            │ │
          │  │ • timestamps                   │ │
          │  └────────────────────────────────┘ │
          │                                      │
          │  ┌────────────────────────────────┐ │
          │  │ Consultations Table            │ │
          │  │ • id, userId, email, name      │ │
          │  │ • serviceName, price           │ │
          │  │ • paymentStatus, paymentId     │ │
          │  │ • consultationDate, notes      │ │
          │  └────────────────────────────────┘ │
          │                                      │
          │  ┌────────────────────────────────┐ │
          │  │ ServicePrice Table             │ │
          │  │ • serviceName, price           │ │
          │  │ • description, updatedAt       │ │
          │  └────────────────────────────────┘ │
          │                                      │
          └──────────────────────────────────────┘
```

## Data Flow

### Login Flow
```
1. User enters credentials on /signin
   ↓
2. Form submits to NextAuth signIn()
   ↓
3. CredentialsProvider calls authorize()
   ├─ Query database: find user by email
   ├─ Use bcrypt.compare() on password
   └─ Return user object if valid
   ↓
4. JWT token created with:
   ├─ user.id
   ├─ user.email
   ├─ user.role
   └─ user.name
   ↓
5. Token stored in httpOnly cookie
   ↓
6. User redirected based on role:
   ├─ USER → /dashboard
   └─ ADMIN → /admin/dashboard
   ↓
7. Session available to components via useSession()
```

### Dashboard Load Flow
```
1. User navigates to /dashboard
   ↓
2. Page component calls useSession()
   ├─ Returns session data from JWT cookie
   └─ Returns loading/authenticated status
   ↓
3. If not authenticated → redirect to /signin
   If wrong role → redirect to /unauthorized
   ↓
4. Component renders with session data
   ├─ User name in greeting
   ├─ User email in profile
   └─ User role in display
   ↓
5. No additional database fetch needed
   (all data comes from token)
```

### Admin Stats Load Flow
```
1. Admin navigates to /admin/dashboard
   ↓
2. Component checks session (user must be ADMIN)
   ↓
3. Component calls useEffect on mount
   ├─ Makes GET request to /api/admin/stats
   └─ Shows loading state while fetching
   ↓
4. API endpoint /api/admin/stats:
   ├─ Gets server session (verifies JWT)
   ├─ Checks role === 'ADMIN'
   ├─ Queries database:
   │  ├─ count(User where role='USER')
   │  ├─ count(Consultation)
   │  └─ count(Consultation where status='pending')
   └─ Returns JSON response
   ↓
5. Component updates state with data
   ├─ totalUsers
   ├─ totalConsultations
   └─ pendingKundlis
   ↓
6. Cards display real numbers from database
```

### User Management Load Flow
```
1. Admin navigates to /admin/users
   ↓
2. Component checks session (must be ADMIN)
   ↓
3. Component calls useEffect on mount
   ├─ Makes GET request to /api/admin/users
   └─ Shows loading state
   ↓
4. API endpoint /api/admin/users:
   ├─ Gets server session
   ├─ Checks role === 'ADMIN'
   ├─ Queries database:
   │  └─ select all users with:
   │     ├─ id, name, email, role
   │     ├─ createdAt, emailVerified
   │     └─ ordered by createdAt desc
   └─ Returns JSON array
   ↓
5. Component renders table with user data
   ├─ Name (or 'N/A')
   ├─ Email
   ├─ Role badge (colored)
   ├─ Verification status (✓ or pending)
   └─ Join date (formatted)
```

## Component Architecture

```
/app/layout.tsx
    ├─ Providers (NextAuth SessionProvider)
    ├─ Metadata
    └─ Theme setup
    
/app
├─ /signin
│   └─ SignIn component
│       ├─ Input (email)
│       ├─ Input (password)
│       ├─ signIn() from NextAuth
│       └─ GoogleButton (scaffold)
│
├─ /dashboard (protected by useSession)
│   └─ Dashboard component
│       ├─ Header
│       ├─ Welcome section
│       ├─ Service cards grid
│       ├─ Profile info section
│       └─ Footer
│
└─ /admin (protected by role check)
    ├─ /dashboard
    │   └─ AdminDashboard component
    │       ├─ Stats cards (fetched from API)
    │       ├─ Admin actions grid
    │       └─ Quick stats section
    │
    ├─ /users
    │   └─ AdminUsers component
    │       └─ Users table (fetched from API)
    │
    └─ /consultations
        └─ AdminConsultations component
            └─ Consultations table (fetched from API)

/api/admin
├─ /stats
│   └─ route.ts (GET)
│       ├─ Auth check
│       └─ Return stats from DB
│
├─ /users
│   └─ route.ts (GET)
│       ├─ Auth check
│       └─ Return users from DB
│
└─ /consultations
    └─ route.ts (GET, POST)
        ├─ Auth check
        ├─ GET: Return consultations from DB
        └─ POST: Create consultation in DB
```

## Authentication Flow Diagram

```
Browser                          NextAuth              Database
  │                                │                      │
  ├─ User enters credentials ─────▶│                      │
  │                                │                      │
  │                     CredentialsProvider.authorize()   │
  │                                │                      │
  │                                ├─ Find user ────────▶│
  │                                │                      │
  │                                │◀─ User record ──────┤
  │                                │                      │
  │                    bcrypt.compare(password, hash)     │
  │                                │                      │
  │                    JWT.sign({id, email, role})        │
  │                                │                      │
  │◀───────── httpOnly Cookie ─────┤                      │
  │ (JWT Token)                    │                      │
  │                                │                      │
  ├─ Redirected to dashboard ─────▶│                      │
  │                                │                      │
  ├─ getServerSession() ──────────▶│                      │
  │                                │                      │
  │ JWT.verify(token)              │                      │
  │                                │                      │
  │◀────── Session Object ─────────┤                      │
  │ {user: {id, email, role}}      │                      │
  │                                │                      │
  └─ useSession() returns session  │                      │
```

## Security Layers

```
Layer 1: Password Storage
  ├─ Plain text password: "Demo@123"
  ├─ Bcrypt with 10 rounds
  ├─ Salt generated per password
  └─ Stored hash: "$2b$10$..." (can't reverse)

Layer 2: Session Management
  ├─ JWT token signed with NEXTAUTH_SECRET
  ├─ Token stored in httpOnly cookie
  ├─ Cookie sent with every request
  └─ Token verified on backend

Layer 3: Role-Based Access
  ├─ USER role → can access /dashboard only
  ├─ ADMIN role → can access /admin/* pages
  └─ Automatic redirects on unauthorized access

Layer 4: Query Security
  ├─ Prisma parameterized queries
  ├─ SQL injection prevention
  └─ Type-safe database operations

Layer 5: API Security
  ├─ getServerSession() on all endpoints
  ├─ Role checks before data access
  └─ Proper HTTP status codes
```

## File Dependencies

```
/app/signin/page.tsx
  ├─ nextauth/react (signIn function)
  └─ components/ui (Input, Button, etc.)

/app/dashboard/page.tsx
  ├─ nextauth/react (useSession)
  ├─ next/navigation (redirect)
  ├─ components/header, footer
  └─ components/ui (Button, Card, etc.)

/app/admin/dashboard/page.tsx
  ├─ nextauth/react (useSession)
  ├─ /api/admin/stats (fetch)
  └─ components/ui & header, footer

/app/admin/consultations/page.tsx
  ├─ nextauth/react (useSession)
  ├─ /api/admin/consultations (fetch)
  └─ components/ui (Table, Button, Badge)

/app/api/admin/stats/route.ts
  ├─ nextauth (getServerSession)
  ├─ lib/auth (authOptions)
  ├─ lib/prisma
  └─ prisma/schema (User, Consultation)

/lib/auth.ts
  ├─ next-auth, next-auth/providers
  ├─ prisma
  └─ bcrypt

/scripts/seed.ts
  ├─ lib/prisma
  ├─ bcrypt
  └─ prisma/schema
```

## Data Models

```
User
  ├─ PK: id (string, cuid)
  ├─ email (string, unique)
  ├─ name (string, optional)
  ├─ passwordHash (string, optional)
  ├─ role (enum: USER | ADMIN)
  ├─ emailVerified (datetime, optional)
  ├─ image (string, optional)
  ├─ createdAt (datetime, default: now)
  └─ updatedAt (datetime, auto-update)
     └─ Relations: accounts, sessions, consultations

Consultation
  ├─ PK: id (string, cuid)
  ├─ FK: userId (string)
  ├─ email (string)
  ├─ name (string)
  ├─ serviceName (string)
  ├─ price (float)
  ├─ paymentId (string, unique, optional)
  ├─ paymentStatus (string: pending, completed, failed)
  ├─ consultationDate (datetime, optional)
  ├─ notes (text, optional)
  ├─ createdAt (datetime)
  └─ updatedAt (datetime)

ServicePrice
  ├─ PK: id (string, cuid)
  ├─ serviceName (string, unique)
  ├─ price (float)
  ├─ description (string, optional)
  ├─ updatedAt (datetime, auto-update)
  └─ updatedBy (string, optional)
```

## Deployment Architecture

```
Vercel Edge Functions
  ├─ /api/* endpoints (serverless)
  ├─ /admin/* pages (serverless)
  └─ /dashboard (serverless)

PostgreSQL Database
  ├─ On Supabase, Vercel Postgres, or self-hosted
  └─ Connection pooling recommended

NextAuth Configuration
  ├─ NEXTAUTH_URL = production domain
  ├─ NEXTAUTH_SECRET = secure random value
  └─ GOOGLE_CLIENT_ID/SECRET for OAuth

Environment Variables
  ├─ DATABASE_URL (production database)
  ├─ NEXTAUTH_SECRET (sign tokens)
  └─ Google OAuth credentials (optional)
```

---

This architecture is:
- ✅ Secure (bcrypt, JWT, roles)
- ✅ Scalable (serverless functions)
- ✅ Type-safe (TypeScript + Prisma)
- ✅ Maintainable (clear separation of concerns)
- ✅ Production-ready (error handling, logging)
