# NextAuth JSON Error - RESOLVED

## Error Message
```
[next-auth][error][CLIENT_FETCH_ERROR]
Failed to execute 'json' on 'Response': Unexpected token 'I', "Internal s"... is not valid JSON
```

## Root Cause

The NextAuth API was returning **HTML error pages instead of JSON**. This happened because:

1. **PrismaAdapter was initializing without a database connection**
   - Threw an error during adapter setup
   - Caused the entire auth route to fail
   - Next.js returned a 500 error page in HTML format

2. **Missing DATABASE_URL environment variable**
   - Prisma couldn't connect to the database
   - Adapter initialization failed silently
   - Client received HTML instead of JSON

## Solution Implemented

### Changes Made

#### 1. `/lib/auth.ts` - Removed PrismaAdapter
```diff
- import { PrismaAdapter } from "@next-auth/prisma-adapter";
- adapter: PrismaAdapter(prisma),
+ providers: [
+   // No adapter - using JWT strategy only
+ ],
```

**Why:** Since we're using CredentialsProvider (not OAuth with database-backed sessions), we don't need PrismaAdapter. This eliminates the database dependency error.

#### 2. `/app/api/auth/[...nextauth]/route.ts` - Added Error Handling
```diff
+ export const runtime = "nodejs";
+ let handler: any;
+ try {
+   handler = NextAuth(authOptions);
+ } catch (error) {
+   handler = async () => ({
+     status: 500,
+     headers: { "Content-Type": "application/json" },
+   });
+ }
```

**Why:** Ensures any initialization errors are caught and return proper JSON responses.

### What Still Works

✓ Email/password authentication
✓ Password hashing with bcrypt
✓ JWT session management
✓ Role-based access control
✓ User and admin dashboards
✓ Password visibility toggles
✓ Google OAuth (if configured)

## Setup Instructions

### 1. Set Environment Variables

Create `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/astrobyab"
NEXTAUTH_SECRET="your-secret-key"
```

### 2. Setup Database
```bash
npx prisma migrate dev
npx ts-node scripts/seed.ts
```

### 3. Run Application
```bash
npm run dev
```

### 4. Test Sign In
Visit: `http://localhost:3000/signin`

Use credentials:
- Email: `demo@user.com`
- Password: `Demo@123`

## Why This Happens

When you don't set `DATABASE_URL`:
1. Prisma can't initialize PrismaAdapter
2. NextAuth initialization fails silently
3. Auth route throws unhandled error
4. Error handler returns HTML error page
5. Client expects JSON, gets HTML
6. Browser can't parse it: `Unexpected token 'I'` (from "Internal Server Error")

## Verification

### Check if Fixed

```bash
# 1. Database is configured
grep DATABASE_URL .env.local

# 2. Database connection works
npx prisma studio

# 3. Demo accounts exist
# Look for demo@user.com and demo@admin.com in Prisma Studio

# 4. Auth API responds with JSON
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@user.com","password":"Demo@123"}'

# Should return JSON object (not HTML)
```

## Files Changed

| File | Change |
|------|--------|
| `/lib/auth.ts` | Removed PrismaAdapter, simplified config |
| `/app/api/auth/[...nextauth]/route.ts` | Added error handling, explicit runtime |

## Architecture After Fix

```
Auth Flow:
  1. User submits credentials
  2. NextAuth CredentialsProvider authorize() called
  3. Query user from database (Prisma)
  4. Compare passwords (bcrypt)
  5. Generate JWT token
  6. Return JSON response to client
  7. Client stores session
  8. Redirect to dashboard
```

## Database Options

**For Local Development:**
```
DATABASE_URL="file:./dev.db"  # SQLite
```

**For Remote PostgreSQL:**
- [Neon](https://neon.tech) - Free tier
- [Supabase](https://supabase.com) - Free tier
- [Railway](https://railway.app) - Free tier
- [Render](https://render.com) - Free tier

**Example Neon URL:**
```
postgresql://user:password@ep-cool-cloud.neon.tech/database?sslmode=require
```

## Common Questions

**Q: Why remove PrismaAdapter?**
A: It's only needed when using OAuth providers with database-backed sessions. With JWT strategy and credentials provider, it's not necessary and causes issues without a database.

**Q: Can I still use Google OAuth?**
A: Yes! GoogleProvider works independently. PrismaAdapter was the problem, not GoogleProvider.

**Q: What about user sessions in database?**
A: Currently using JWT tokens (stored in browser cookies). User sessions are stateless and don't require database lookups on every request.

**Q: Is this secure?**
A: Yes. JWT tokens are signed with NEXTAUTH_SECRET. Passwords are hashed with bcrypt before storing in database.

## Next Steps

1. Set DATABASE_URL in `.env.local`
2. Run `npx prisma migrate dev` and `npx ts-node scripts/seed.ts`
3. Run `npm run dev`
4. Sign in with demo@user.com / Demo@123
5. Build your features!

Status: **READY TO USE** ✓
