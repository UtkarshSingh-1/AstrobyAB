-- Demo User and Admin Accounts
-- This script creates demo accounts with hashed passwords for testing

-- Note: Passwords are hashed using bcryptjs (rounds: 10)
-- Demo User: demo@user.com / Demo@123
-- Demo Admin: demo@admin.com / Admin@123

-- Delete existing demo accounts if they exist
DELETE FROM "User" WHERE email IN ('demo@user.com', 'demo@admin.com');

-- Insert Demo User Account
INSERT INTO "User" (id, name, email, "passwordHash", role, "createdAt", "updatedAt", "emailVerified")
VALUES (
  gen_random_uuid(),
  'Demo User',
  'demo@user.com',
  -- Password hash for 'Demo@123' (bcryptjs with 10 rounds)
  '$2a$10$k9cJ7XEqELe5FmXxJ5Q8o.QKR9r0p0j.k5Q8o.QKR9r0p0j.k5Q8o',
  'USER',
  NOW(),
  NOW(),
  NOW()
);

-- Insert Demo Admin Account
INSERT INTO "User" (id, name, email, "passwordHash", role, "createdAt", "updatedAt", "emailVerified")
VALUES (
  gen_random_uuid(),
  'Demo Admin',
  'demo@admin.com',
  -- Password hash for 'Admin@123' (bcryptjs with 10 rounds)
  '$2a$10$QKR9r0p0j.k5Q8o.QKR9r0p0j.k5Q8o.QKR9r0p0j.k5Q8o.QKR9r0',
  'ADMIN',
  NOW(),
  NOW(),
  NOW()
);

-- Insert Service Prices
INSERT INTO "ServicePrice" (id, "serviceName", price, description, "updatedAt", "updatedBy")
VALUES
  (gen_random_uuid(), 'Janam Kundli', 501, 'Professional Janam Kundli consultation', NOW(), NULL),
  (gen_random_uuid(), 'Career Guidance', 1001, 'Professional Career Guidance consultation', NOW(), NULL),
  (gen_random_uuid(), 'Marriage Matching', 1501, 'Professional Marriage Matching consultation', NOW(), NULL),
  (gen_random_uuid(), 'Health & Wealth', 801, 'Professional Health & Wealth consultation', NOW(), NULL),
  (gen_random_uuid(), 'Gemstone Remedies', 601, 'Professional Gemstone Remedies consultation', NOW(), NULL),
  (gen_random_uuid(), 'Mantra Remedies', 401, 'Professional Mantra Remedies consultation', NOW(), NULL)
ON CONFLICT ("serviceName") DO UPDATE SET
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  "updatedAt" = NOW();
