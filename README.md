# ShebaGhor - Digital Computer Shop Bangladesh

## Tagline
"আগে চেক করবো, রিজেক্ট হতে দিবে না।"

## Problem
People get NID Correction and Land Mutation rejected because of mismatch, blurry docs, wrong fee. Govt sites have NO API. Users MUST register and submit on govt site themselves. We do preparation + guidance + auto-fill help. We do NOT submit to govt.

## Scope - MVP Only These 2 Services
1. **NID Correction** - Build FIRST, 100% complete
2. **Land Mutation / e-Namjari** - Build SECOND, basic version

DO NOT BUILD: Passport, Driving License, 100 services, blog, admin dashboard fancy features. Keep it minimal.

## Tech Stack
- Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui
- Supabase: Auth (Phone), Postgres, Storage (private bucket)
- Hosting ready for Cloudflare Pages
- Capacitor config ready for Android app build later
- Font: Hind Siliguri for Bangla + Inter for English

## Design - Mobile First
- Max width 480px centered, looks like an app, not a website
- White background, Primary Green #0E7A3D, Black text, Red #D32F2F for STOP, Yellow #FFC107 for Warning, Green for Ready
- All buttons min 48px height, big Bangla text. No hover-only UI
- Bottom sticky bar always visible with progress

## Pages

### 1. / (Home)
Hero: "NID ভুল? জমির নামজারি আটকে আছে?"
Sub: "আগে আমরা চেক করে দিবো। রিজেক্ট হলে আগেই বলে দিবো।"
2 big cards:
A) NID সংশোধন - Fee: 300 টাকা + সরকারি ফি - [শুরু করুন]
B) জমির নামজারি - Fee: 1500 টাকা + সরকারি ফি - [শুরু করুন]
Below: 3 steps: 1. ডকুমেন্ট আপলোড 2. মিলিয়ে দেখা 3. গাইডেড আবেদন
Trust: "আপনার ডকুমেন্ট নিরাপদ। আমরা বিক্রি করি না।"

### 2. /apply/nid - NID FLOW - 2 PARTS

**PART A: PREPARATION + MISMATCH CHECK (On Our Site)**
- Step 1: কি ভুল? Radio select ONE: নাম ভুল / বাবার নাম ভুল / মায়ের নাম ভুল / জন্ম তারিখ ভুল / ঠিকানা ভুল
- Step 2: Upload: NID সামনে, NID পেছনে, SSC সার্টিফিকেট, জন্ম নিবন্ধন (optional). Show preview + example image "এভাবে ছবি তুলুন". If file <30KB, warn "ছবি ঘোলা - আবার তুলুন".
- Step 3: Type: NID Name (English), SSC Name (English), NID DOB, SSC DOB, Correct Name Wanted
  - LOGIC:
    - IF NID Name != SSC Name => RED BOX: "STOP - রিজেক্ট হবে! NID: [X], SSC: [Y]. SSC কে সঠিক ধরে।"
    - IF NID DOB != SSC DOB => RED BOX similar for DOB
    - IF All match => GREEN BOX: "সব মিলেছে! আবেদনের জন্য রেডি।"
  - Save this data to localStorage key: shebaghor_nid_data + Supabase

**PART B: GUIDED MODE - 6 STEPS (Mobile Full-Screen Cards)**
- Step 0: প্রস্তুতি - Checklist docs, Fees Table
- Step 1: রেজিস্টেশন - services.nidw.gov.bd > Register > NID number + DOB + Captcha > Division/District/Upazila > Mobile 6-digit OTP
  - Warning: "আগে Play Store থেকে NID Wallet App ইনস্টল করুন।"
  - Button: [NID সাইট খুলুন]
- Step 2: ফেইস ভেরিফিকেশন - QR code > NID Wallet scan > Look straight > Head right once, left once > OK
  - Tip: Password set করুন
- Step 3: তথ্য এডিট - Profile > Edit > Tick beside wrong info > Type correct info
  - COPY BUTTONS: [সঠিক নাম কপি করুন: MD KAMAL HOSSAIN] [সঠিক জন্ম তারিখ কপি করুন] [বাবার নাম কপি করুন]
  - On copy show toast "Copied! এখন Paste করুন"
- Step 4: ফি প্রদান - bKash App > Pay Bill > Govt Fee > NID Service > NID number > Application type > PIN payment
  - Then return to NID site
- Step 5: ডকুমেন্ট আপলোড + সাবমিট - Previous docs upload > Submit > Dashboardからform download
  - Info: অনুমোদন ৭-১৫ দিনে, সর্বোচ্চ ৪৫ দিন, SMS আসবে
- Each step has: [✓ এই ধাপ শেষ] + [আমি আটকে গেছি - WhatsApp] button -> wa.me/8801616200174 with message "I am stuck on Step X, App ID: SG-xxx"
- Save progress in localStorage + Supabase. On return, show "Welcome back, Continue Step X"

### 3. /apply/namjari - BASIC VERSION
- Step 1: জমি কিভাবে পেলেন? Radio: কিনেছি / ওয়ারিশ / দান / কোর্ট
- Step 2: Upload dynamic docs: If কিনেছি: দলিল, খতিয়ান, দাখিলা, NID. If ওয়ারিশ: মৃত্যু সনদ, ওয়ারিশ সনদ, খতিয়ান, দাখিলা, NID.
- Step 3: Mismatch Check: Input Deed Dag vs Khatian Dag, Deed Amount vs Khatian Amount, Seller Name vs Khatian Owner
  - IF Dag mismatch => RED STOP
  - IF Seller != Khatian Owner => RED STOP "Chain ভাঙা"
  - IF match => GREEN Ready
- Step 4: Review + Payment (bKash/Nagad TrxID + screenshot) + Guided steps placeholder (same pattern as NID, link to land.gov.bd)
- Create Application ID: SG-LAND-1001

### 4. /my-applications - DASHBOARD
List with status badges: Draft / Checking / Ready / Submitted / Rejected / Approved. Click to see detail, documents, check result, next step.

### 5. /admin - SIMPLE ADMIN
Password: admin123. Table of applications. View docs, change status, add Bangla note.

## Auto-Fill Helper
- All copy buttons use navigator.clipboard
- Create file /public/bookmarklet.js: Reads shebaghor_nid_data from localStorage and fills inputs on services.nidw.gov.bd by placeholder/name match. Show "Fill from ShebaGhor" floating button logic
- Create /capacitor.config.ts for Android WebView wrapper. Do NOT build full native app now, just config ready.

## AUTO-FILL BOOKMARKLET
1. Go to: services.nidw.gov.bd
2. Click the bookmarklet in your browser toolbar
3. Data from ShebaGhor auto-fills the form fields
4. Review and Submit on the govt site

## Development

### npm install
```bash
cd sheba-ghor
npm install
```

### Run Development
```bash
npm run dev
```
Runs Next.js with Turbopack at http://localhost:3000

### Supabase SQL Setup
```bash
# Run the SQL from supabase.sql against your Supabase project
psql "postgresql://postgres:YOUR_PASSWORD@db.myproject.supabase.co:5432/postgres" -f supabase.sql
```
Or via Supabase Dashboard > SQL Editor

### Cloudflare Pages Deploy
1. Push to GitHub
2. Go to Cloudflare Pages > Create new project
3. Connect your GitHub repo
4. Framework preset: Next.js
5. Root Directory: apps/web
6. Build command: `npm run build`
7. Output directory: `.next`
8. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
9. Deploy!

### Capacitor Android Config
The `capacitor.config.ts` is ready in `apps/web/capacitor.config.ts`. To build Android app later:
```bash
npx cap sync
npx cap add android
npx cap open android
```
Then build in Android Studio.

## Fonts
- Hind Siliguri (Bangla) - Google Fonts
- Inter (English) - Google Fonts

## Trust & Policies
- 🔒 আপনার ডকুমেন্ট নিরাপদ। আমরা বিক্রি করি না।
- সব তথ্য Encrypted এবং_private_ থাকবে
- We guide only. We do NOT submit to any govt website.
- All progress saved in localStorage + Supabase, never lost on refresh

## Contact
WhatsApp: +8801616200174