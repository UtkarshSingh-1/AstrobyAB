# Verify Your Setup Works

## Checklist

### 1. Environment Variables
```bash
# Check if .env.local exists and has DATABASE_URL
ls -la .env.local
cat .env.local | grep DATABASE_URL
```

### 2. Database Connection
```bash
# Test database connection
npx prisma db execute --stdin < /dev/null
# Or open Prisma Studio
npx prisma studio
```

### 3. Demo Accounts
```bash
# Check if users exist in database
npx prisma studio

# Or query directly
npx prisma client --interactive
# Then run: db.user.findMany()
```

### 4. NextAuth Configuration
```bash
# Check auth route
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@user.com","password":"Demo@123"}'

# Should return JSON (not HTML error)
```

## Step-by-Step Fix if Still Getting Error

### Issue: "Unexpected token 'I', Internal s..."

**Root Cause:** DATABASE_URL not set or database unreachable

**Fix:**

1. **Open .env.local:**
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/astrobyab"
   NEXTAUTH_SECRET="dev-secret"
   ```

2. **Save and restart server:**
   ```bash
   npm run dev
   ```

3. **If still failing, check database:**
   ```bash
   npx prisma migrate status
   npx prisma migrate dev
   ```

4. **Seed demo accounts:**
   ```bash
   npx ts-node scripts/seed.ts
   ```

5. **Try login again:**
   - Email: demo@user.com
   - Password: Demo@123

## Expected Behavior

### When Everything Works:

1. **Sign in page loads** - No console errors
2. **Enter demo credentials** - Submits without error
3. **Redirects to dashboard** - Shows "Welcome, User"
4. **Admin login** - Shows admin stats with real database counts

### When DATABASE_URL is Missing:

1. Sign in page loads OK
2. Submit credentials
3. Get "Unexpected token 'I'..." error
4. **Fix:** Add DATABASE_URL to .env.local

## Commands Reference

```bash
# Check database status
npx prisma migrate status

# Push schema to database
npx prisma db push

# Create/update migration
npx prisma migrate dev --name init

# Seed demo data
npx ts-node scripts/seed.ts

# Open database GUI
npx prisma studio

# Check environment
grep DATABASE_URL .env.local
```

## If Everything Fails

1. **Clear cache:**
   ```bash
   rm -rf .next node_modules
   npm install
   ```

2. **Recreate database:**
   ```bash
   npx prisma migrate reset
   npx ts-node scripts/seed.ts
   ```

3. **Check console logs:**
   ```bash
   npm run dev 2>&1 | grep -i error
   ```

## What Should Be Seeded

After running seed script, your database should have:

- **User Account:**
  - Email: demo@user.com
  - Password: Demo@123 (hashed with bcrypt)
  - Role: USER

- **Admin Account:**
  - Email: demo@admin.com
  - Password: Admin@123 (hashed with bcrypt)
  - Role: ADMIN

Verify in Prisma Studio: `npx prisma studio`

## Next: Test Features

Once signed in:

1. **User Dashboard** - Shows personal data
2. **Admin Dashboard** - Shows stats: total users, consultations
3. **Password Fields** - Have eye icon to toggle visibility
4. **Logout** - Redirects to signin

All working = Setup Complete!
