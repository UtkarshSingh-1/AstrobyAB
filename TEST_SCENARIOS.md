# 🧪 Test Scenarios - Demo Account Walkthrough

## 👤 User Account Test Path

**Credentials:**
- Email: `demo@user.com`
- Password: `Demo@123`

### Test Flow 1: User Login & Dashboard

```
1. Navigate to http://localhost:3000/signin
   ✓ Sign In form displays
   ✓ Email/Password fields visible

2. Enter Credentials
   Email: demo@user.com
   Password: Demo@123
   
3. Click "Sign In"
   ✓ Authentication succeeds
   ✓ Redirected to /dashboard
   ✓ Loading state shows then resolves

4. On Dashboard
   ✓ Welcome message shows: "Welcome, Demo User!"
   ✓ User profile section displays
   ✓ Name: Demo User
   ✓ Email: demo@user.com
   ✓ Role: User
   
5. Services Grid
   ✓ 6 service cards visible:
     - Janam Kundli
     - Career Guidance
     - Relationship Matching
     - Gemstone Remedies
     - Mantra Remedies
     - Book Consultation
   ✓ Each card has icon and "Explore" button
   
6. Profile Information Section
   ✓ Name displayed
   ✓ Email displayed
   ✓ Role shows: "User"
   ✓ Member Since shows today's date
   ✓ "Back to Home" button visible
```

### Test Flow 2: Navigation from User Dashboard

```
1. From /dashboard, test navigation:

   a) Click "Explore" on any service
      ✓ Navigates to service detail page
      ✓ Service name in heading
      ✓ Service description visible
      
   b) Click "Book Consultation"
      ✓ Navigates to /book-consultation
      ✓ Booking form displays (currently basic)
      ✓ Service selection available
      
   c) Click "Back to Home"
      ✓ Navigates to home page /
      ✓ Header with services
      ✓ Footer visible
```

### Test Flow 3: User Logout

```
1. Locate header/logout button
   ✓ Click logout/sign out
   
2. Verify redirect
   ✓ Redirected to /signin or /
   ✓ Session cleared
   
3. Try accessing /dashboard
   ✓ Redirected to /signin
   ✓ Cannot access protected route
```

### Test Flow 4: Book Consultation Flow (Partial - Payment Missing)

```
1. From dashboard, click "Book Consultation"
   ✓ Navigate to /book-consultation
   
2. On booking page
   ✓ Service selector shows
   ✓ Can select service
   ⚠️ Payment form NOT YET implemented
   
3. Currently Missing:
   ❌ Price display
   ❌ Payment form
   ❌ Booking submission
   ❌ Confirmation
```

---

## 👑 Admin Account Test Path

**Credentials:**
- Email: `demo@admin.com`
- Password: `Admin@123`

### Test Flow 1: Admin Login & Dashboard

```
1. Navigate to http://localhost:3000/signin
   ✓ Sign In form displays

2. Enter Admin Credentials
   Email: demo@admin.com
   Password: Admin@123
   
3. Click "Sign In"
   ✓ Authentication succeeds
   ✓ Redirected to /admin/dashboard
   ✓ (or /dashboard, then can access /admin/dashboard)

4. On Admin Dashboard
   ✓ Header: "Admin Dashboard"
   ✓ Subheader: "Welcome back, Demo Admin!"
   ✓ Dashboard background: Mars gradient (red/orange)

5. Stats Cards Display
   ✓ Three stat cards visible:
     - 👥 Total Users (shows number)
     - 📞 Consultations (shows number)
     - 📋 Pending Kundlis (shows number)
   ✓ Values load from API
   ✓ No "..." loading indicator after load
```

### Test Flow 2: Admin Management Buttons

```
On Admin Dashboard, 4 Management Buttons:

1. Click "👥 Manage Users"
   ✓ Navigate to /admin/users
   ✓ Users list/table displays
   ✓ User data shown
   
2. Click "📞 Consultations"
   ✓ Navigate to /admin/consultations
   ✓ Consultations list displays
   ✓ Consultation data shown
   
3. Click "📋 Kundli Records"
   ✓ Navigate to /admin/kundli
   ✓ Kundli records list displays
   
4. Click "🏠 Back to Home"
   ✓ Navigate to /dashboard
   ✓ Shows user dashboard (not admin)
```

### Test Flow 3: User Management Page

```
1. Click "Manage Users" from admin dashboard
   ✓ Navigate to /admin/users
   
2. On Users Page
   ✓ Page title visible
   ✓ Table or list displays users:
     - Columns: ID, Name, Email, Role, Joined Date
     - At least Demo User row visible
     - Data populated from database
   
3. User Actions (if implemented)
   ❌ Edit user role (NOT YET)
   ❌ Delete user (NOT YET)
   ❌ View user details (NOT YET)
```

### Test Flow 4: Consultations Management

```
1. Click "Consultations" from admin dashboard
   ✓ Navigate to /admin/consultations
   
2. On Consultations Page
   ✓ Page title visible
   ✓ List displays consultations:
     - Shows demo user's consultation if exists
     - Columns: ID, Service, User, Status, Date
   
3. Consultation Actions (if implemented)
   ⚠️ Approve/Reject (NOT YET)
   ⚠️ Update status (NOT YET)
   ⚠️ View details (NOT YET)
```

### Test Flow 5: Pricing Management

```
1. Navigate to /admin/pricing
   ✓ Page displays
   
2. On Pricing Page
   ✓ Service list visible with current prices:
     - Janam Kundli: ₹501
     - Career Guidance: ₹1001
     - Marriage Matching: ₹1501
     - Health & Wealth: ₹801
     - Gemstone Remedies: ₹601
     - Mantra Remedies: ₹401
   
3. Edit Pricing (if implemented)
   ⚠️ Price edit form (NOT YET)
   ⚠️ Save changes (NOT YET)
   ⚠️ Update confirmation (NOT YET)
```

### Test Flow 6: Admin Role Protection

```
1. Login as Demo User (demo@user.com)

2. Try to access admin routes:
   a) Go to /admin/dashboard
      ✓ Redirected to /unauthorized
      ✓ Error message displays
      
   b) Go to /admin/users
      ✓ Redirected to /unauthorized
      
   c) Go to /admin/consultations
      ✓ Redirected to /unauthorized
      
3. Cannot access admin APIs:
   a) Fetch GET /api/admin/stats
      ✓ Returns 401 or access denied
      
   b) Fetch GET /api/admin/users
      ✓ Returns 401 or access denied
```

---

## 🔐 Authentication Test Cases

### Test Case 1: Valid Login
```
Email: demo@user.com
Password: Demo@123
Expected: ✅ Login success, redirect to /dashboard
```

### Test Case 2: Invalid Email
```
Email: nonexistent@email.com
Password: Demo@123
Expected: ❌ Error message: "No user found with this email"
```

### Test Case 3: Invalid Password
```
Email: demo@user.com
Password: WrongPassword
Expected: ❌ Error message: "Invalid password"
```

### Test Case 4: Empty Fields
```
Email: (empty)
Password: (empty)
Expected: ❌ Validation error or form error
```

### Test Case 5: Session Persistence
```
1. Login with demo@user.com
2. Navigate to different pages
3. Refresh page
Expected: ✅ User still logged in, session persists
```

### Test Case 6: Logout
```
1. Login with demo@user.com
2. Click logout button
3. Try accessing /dashboard
Expected: ✅ Redirected to /signin, access denied
```

---

## 🌐 Page Navigation Tests

### All Pages Should Load

- ✅ `/` - Home
- ✅ `/signin` - Sign In
- ✅ `/signup` - Sign Up
- ✅ `/forgot-password` - Forgot Password
- ✅ `/dashboard` - User Dashboard (protected)
- ✅ `/admin/dashboard` - Admin Dashboard (protected)
- ✅ `/admin/users` - User Management (protected)
- ✅ `/admin/consultations` - Consultation Management (protected)
- ✅ `/admin/kundli` - Kundli Records (protected)
- ✅ `/admin/pricing` - Pricing Management (protected)
- ✅ `/services/janam-kundli` - Service Page
- ✅ `/services/career-guidance` - Service Page
- ✅ `/services/marriage-matching` - Service Page
- ✅ `/services/health-wealth` - Service Page
- ✅ `/services/gemstone-remedies` - Service Page
- ✅ `/services/mantra-remedies` - Service Page
- ✅ `/services/complete-astrology` - Service Page
- ✅ `/book-consultation` - Booking (protected)
- ✅ `/about` - About Page
- ✅ `/contact` - Contact Page
- ✅ `/privacy-policy` - Privacy Policy
- ✅ `/unauthorized` - Unauthorized Page
- ✅ `/error` - Error Page

---

## 📊 Data Flow Tests

### Test: User Data Persistence

```
1. Login as demo@user.com
2. Go to /dashboard
3. Check profile section shows:
   ✓ Name: Demo User
   ✓ Email: demo@user.com
   ✓ Role: User

4. Refresh page
5. Data still shows correctly
```

### Test: Admin Stats API

```
1. Login as demo@admin.com
2. Go to /admin/dashboard
3. Check stats load:
   ✓ GET /api/admin/stats called
   ✓ Returns JSON with stats
   ✓ UI displays stats

4. Stats should include:
   - totalUsers: (number)
   - totalConsultations: (number)
   - pendingKundlis: (number)
```

### Test: Consultation Data

```
1. In database, demo user has 1 consultation
2. Admin views /admin/consultations
3. Consultation displays:
   ✓ Service: Janam Kundli
   ✓ User: Demo User
   ✓ Status: pending
   ✓ Price: 501
```

---

## 🎨 UI/UX Tests

### Responsive Design
```
✓ Desktop (1920px) - All content visible
✓ Tablet (768px) - Grid adjusts to 2 cols
✓ Mobile (375px) - Stack to 1 col, hamburger menu
```

### Dark Mode
```
✓ Theme toggle works (if implemented)
✓ Colors adjust properly
✓ Text contrast maintained
```

### Loading States
```
✓ Dashboard shows loader while fetching stats
✓ Forms show loading state on submit
✓ Buttons disable during submission
```

### Error Handling
```
✓ Invalid credentials show error
✓ API errors show user-friendly messages
✓ 404 pages display correctly
✓ 500 error page displays
```

---

## 🔴 Known Issues / Missing Features

### Currently Not Working
- ❌ Payment processing
- ❌ OTP email delivery (needs SMTP setup)
- ❌ Kundli calculation
- ❌ Consultation calendar
- ❌ File uploads/downloads
- ❌ Advanced filtering
- ❌ User profile editing
- ❌ Admin user deletion

### Show as Loading/Incomplete
- ⚠️ Admin stats may show "..."
- ⚠️ Booking form incomplete
- ⚠️ No edit functionality in admin
- ⚠️ Pricing page shows prices but no edit

---

## ✅ Passing Tests

```
✓ Database connection works
✓ User authentication successful
✓ Role-based access control works
✓ Admin protected routes work
✓ All pages render without errors
✓ Navigation works
✓ Header/Footer display correctly
✓ Responsive design functions
✓ Theme system works
✓ Session persistence works
```

---

## 🚀 Next Testing Phase

Once you implement:

1. **Payments** → Test payment flow
2. **Kundli** → Test chart generation
3. **Profile Edit** → Test birth details
4. **Email** → Test OTP delivery
5. **Calendar** → Test booking
6. **Admin Actions** → Test approvals

Re-run all tests with updated features.

---

## 📝 Test Report Template

```
Date: __________
Tester: __________
Build: __________

✓ Passed: ___/___
✗ Failed: ___/___
⚠️ Blocked: ___/___

Critical Issues:
- 
- 

Known Issues:
- 

Notes:
```

---

**Last Updated:** February 2, 2026
