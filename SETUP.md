# AstrobyAB Setup Guide

## Quick Start (3 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/astrodb

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (optional, for production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Setup Database
```bash
# Create database tables
npx prisma migrate dev --name init

# Seed demo data
npx ts-node scripts/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/signin`

---

## Demo Credentials

### User Account
- **Email:** `demo@user.com`
- **Password:** `Demo@123`
- **Access:** `/dashboard`

### Admin Account
- **Email:** `demo@admin.com`
- **Password:** `Admin@123`
- **Access:** `/admin/dashboard`

---

## Troubleshooting

### "Invalid email or password" Error
This means the demo users haven't been seeded yet. Run:
```bash
npx ts-node scripts/seed.ts
```

### Database Connection Error
Ensure PostgreSQL is running and your `DATABASE_URL` is correct.

### Session Issues
Clear browser cookies and try again:
1. Open DevTools (F12)
2. Go to Application > Cookies
3. Delete all cookies for localhost:3000
4. Refresh the page

---

## Project Structure

```
├── /app
│   ├── /api                 # Backend APIs
│   ├── /admin               # Admin pages
│   ├── /dashboard           # User dashboard
│   ├── /signin              # Sign in page
│   ├── /signup              # Sign up page
│   └── layout.tsx           # Root layout
│
├── /components
│   ├── /ui                  # UI components (50+)
│   ├── header.tsx           # Header component
│   ├── footer.tsx           # Footer component
│   └── ...                  # Other components
│
├── /lib
│   ├── auth.ts              # NextAuth configuration
│   ├── prisma.ts            # Prisma client
│   └── ...                  # Utilities
│
├── /prisma
│   └── schema.prisma        # Database schema
│
└── /scripts
    └── seed.ts              # Demo data seeding
```

---

## Key Features

✅ NextAuth for authentication  
✅ PostgreSQL with Prisma ORM  
✅ 50+ UI components (shadcn/ui)  
✅ Dark mode support  
✅ Responsive design  
✅ Role-based access (USER/ADMIN)  
✅ Dashboard system  

---

## Next Steps

1. Test both demo accounts to verify dashboards work
2. Explore the admin dashboard features
3. Review the database schema in `/prisma/schema.prisma`
4. Add payment integration (Stripe/Razorpay)
5. Implement kundli calculation service

---

## Support

For issues or questions:
1. Check the `/DEMO_SETUP_GUIDE.md` for comprehensive docs
2. Review logs in the console
3. Check environment variables are set correctly
