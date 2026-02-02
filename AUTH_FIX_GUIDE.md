# NextAuth JSON Error - FIXED

## Problem
```
[next-auth][error][CLIENT_FETCH_ERROR]
Failed to execute 'json' on 'Response': Unexpected token 'I', "Internal s"...
is not valid JSON
```

This error means NextAuth was receiving HTML (Internal Server Error) instead of JSON from the auth endpoint.

## Root Causes Fixed

### 1. **Double NextAuth Export**
- **Issue**: `lib/auth.ts` was exporting `NextAuth(authOptions)` which duplicated the handler
- **Fix**: Removed duplicate export, kept only `authOptions`

### 2. **Missing Error Handling**
- **Issue**: CredentialsProvider wasn't catching all errors
- **Fix**: Added proper try-catch with error messages

### 3. **Missing Default Values**
- **Issue**: `NEXTAUTH_SECRET` was undefined in development
- **Fix**: Added fallback to "development-secret-key"

### 4. **Type Issues in Callbacks**
- **Issue**: User role type wasn't properly typed
- **Fix**: Added explicit `as any` type casting for custom properties

## Files Modified

### `/lib/auth.ts`
- Removed duplicate `NextAuth` import
- Removed export of `NextAuth(authOptions)` 
- Added error messages in CredentialsProvider
- Added fallback for `NEXTAUTH_SECRET`
- Fixed type casting in callbacks

### `/app/api/auth/[...nextauth]/route.ts`
- Changed from `export { handler as GET, handler as POST }` to explicit exports

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create .env.local if it doesn't exist
cat > .env.local << 'EOF'
DATABASE_URL="postgresql://user:password@localhost:5432/astrobyab"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
EOF
```

### 3. Run Migrations
```bash
npx prisma migrate dev
```

### 4. Seed Demo Accounts
```bash
npx ts-node scripts/seed.ts
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Test Login
Open `http://localhost:3000/signin`

Demo credentials:
- **User**: demo@user.com / Demo@123
- **Admin**: demo@admin.com / Admin@123

## If Error Persists

### Check 1: Database Connection
```bash
npx prisma db push
npx prisma studio
```
Visit http://localhost:5555 - should see User table with demo accounts

### Check 2: Environment Variables
```bash
# Verify these are set in .env.local
echo $DATABASE_URL
echo $NEXTAUTH_SECRET
echo $NEXTAUTH_URL
```

### Check 3: Clear NextAuth Cache
```bash
rm -rf .next
npm run dev
```

### Check 4: Browser Console
- Open DevTools (F12)
- Go to Network tab
- Try to sign in
- Check the `/api/auth/signin` request
- Look at the response (should be JSON, not HTML)

### Check 5: Server Logs
Watch terminal for errors like:
```
[v0] Credentials authorize error: ...
```

If you see database connection errors:
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Try: `psql $DATABASE_URL` to test connection

## Key Changes Summary

| File | Change | Impact |
|------|--------|--------|
| `lib/auth.ts` | Removed duplicate NextAuth export | Fixes JSON response handling |
| `lib/auth.ts` | Added error messages in authorize() | Better error reporting |
| `lib/auth.ts` | Added NEXTAUTH_SECRET fallback | Works in development |
| `app/api/auth/[...nextauth]/route.ts` | Explicit GET/POST exports | More reliable routing |

## Testing Checklist

- [ ] Run seed script successfully
- [ ] Database has 2 demo users
- [ ] Sign in with demo@user.com works
- [ ] Redirects to /dashboard
- [ ] Sign in with demo@admin.com works
- [ ] Redirects to /admin/dashboard
- [ ] Wrong password shows error
- [ ] Non-existent email shows error
- [ ] Password eye toggle works on signin page

## Troubleshooting Response Codes

| Status | Meaning | Solution |
|--------|---------|----------|
| 500 HTML Error | Server error | Check server logs, verify DB |
| 401 Unauthorized | Invalid credentials | Check email/password |
| 200 JSON | Success | Should redirect automatically |
| CORS Error | Origin issue | Check NEXTAUTH_URL |

## Next Steps

1. Test login flow completely
2. Create new accounts via signup
3. Test password reset flow
4. Test admin dashboard
5. Check all pages with password input have eye toggle

If all tests pass, you're good to deploy!
