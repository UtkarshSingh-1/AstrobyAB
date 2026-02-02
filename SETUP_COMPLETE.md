# Complete Setup Guide - AstrobyAB Authentication System

## What Was Fixed

### NextAuth JSON Error Resolution
The "Unexpected token 'I', Internal s..." error was caused by:
1. **PrismaAdapter initialization failing** - Database connection not available
2. **Missing DATABASE_URL** - Prisma couldn't connect to the database
3. **Unhandled errors** returning HTML instead of JSON

### Solutions Implemented

1. **Removed PrismaAdapter** - Not needed for credentials-only auth
2. **Added error handling** - Route handler now catches and returns JSON
3. **Simplified auth config** - Removed unnecessary adapters
4. **Added runtime specification** - Explicit Node.js runtime for auth route

### Files Modified
- `/lib/auth.ts` - Removed PrismaAdapter, simplified config
- `/app/api/auth/[...nextauth]/route.ts` - Added error handling

## Prerequisites

Before running the application, you need:

1. **PostgreSQL Database** (or compatible)
2. **DATABASE_URL** environment variable
3. **NEXTAUTH_SECRET** (or development default used)

## Quick Setup (3 Steps)

### Step 1: Set Environment Variables

Create a `.env.local` file in your project root:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/astrobyab"

# NextAuth Secret (optional - has development default)
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**For Development/Testing:**
- Use SQLite: `DATABASE_URL="file:./dev.db"`
- Or use a free PostgreSQL: Neon, Supabase, or Railway

### Step 2: Setup Database

```bash
# Install dependencies
npm install

# Create/migrate database
npx prisma migrate dev --name init

# Seed demo accounts
npx ts-node scripts/seed.ts
```

### Step 3: Run Application

```bash
npm run dev
```

Open: `http://localhost:3000/signin`

## Demo Credentials

Once seeded, use these to sign in:

```
User Account:
  Email: demo@user.com
  Password: Demo@123

Admin Account:
  Email: demo@admin.com
  Password: Admin@123
```

## Features Now Working

✓ Email/password authentication with bcrypt
✓ Google OAuth (if configured)
✓ Role-based access (USER, ADMIN)
✓ JWT session management
✓ Password visibility toggle on all password fields
✓ User dashboard
✓ Admin dashboard with real database stats
✓ Proper error handling with JSON responses

## Troubleshooting

### Still Getting JSON Error?

1. **Check DATABASE_URL is set:**
   ```bash
   echo $DATABASE_URL
   ```

2. **Verify database connection:**
   ```bash
   npx prisma db push
   ```

3. **Check seed was successful:**
   ```bash
   npx prisma studio
   ```
   Look for demo@user.com and demo@admin.com users

4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Database URL Examples

**PostgreSQL (Neon):**
```
postgresql://user:password@host/database?sslmode=require
```

**PostgreSQL (Supabase):**
```
postgresql://postgres:password@db.host/postgres
```

**SQLite (Local Development):**
```
file:./dev.db
```

### Common Issues

| Error | Solution |
|-------|----------|
| "Unexpected token 'I'" | Set DATABASE_URL in .env.local |
| "User not found" | Run seed script: `npx ts-node scripts/seed.ts` |
| "NEXTAUTH_SECRET" warning | Set NEXTAUTH_SECRET in .env.local |
| "Cannot find module 'bcrypt'" | Run: `npm install` |

## Architecture

```
Authentication Flow:
  Client Form → /api/auth/signin → CredentialsProvider
    ↓
  Query User from Database (Prisma)
    ↓
  Compare Password (bcrypt)
    ↓
  Generate JWT Token
    ↓
  Return Session to Client
```

## Next Steps

1. Add Stripe payment integration
2. Build kundli calculation engine
3. Add consultation booking system
4. Setup email notifications
5. Deploy to production

## Documentation Files

- `FINAL_SETUP.md` - Previous setup guide
- `AUTH_FIX_GUIDE.md` - Authentication details
- `FIX_SUMMARY.txt` - Technical summary

For complete implementation details, see the documentation files in the root directory.
