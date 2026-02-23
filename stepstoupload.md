# Steps to Deploy SOTR-APP Waiting List

This guide walks you through pushing the project to GitHub, deploying to Vercel, and setting up Supabase for storing waiting list contacts.

---

## Part 1: Push to GitHub

### 1.1 Create a New GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Name it something like `sotr-waitinglist`
4. Set it to **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (the project already has these)
6. Click **Create repository**

### 1.2 Initialize Git and Push (from the `site-waitinglist` folder)

Open your terminal and run:

```bash
cd /path/to/site-waitinglist

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: SOTR-APP waiting list"

# Add your GitHub repo as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/sotr-waitinglist.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Part 2: Set Up Supabase Database

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project** and sign in (you can use GitHub)
3. Click **New project**
4. Choose your organization
5. Fill in:
   - **Project name**: `sotr-waitinglist` (or any name)
   - **Database Password**: Create a strong password and **save it somewhere safe**
   - **Region**: Choose the closest to your users (e.g., Frankfurt for Africa/Europe)
6. Click **Create new project** and wait for it to initialize (~2 minutes)

### 2.2 Create the Waiting List Table

1. In your Supabase project dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Paste this SQL and click **Run**:

```sql
-- Create the waiting_list table
CREATE TABLE waiting_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('user', 'merchant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to INSERT (for public form submissions)
CREATE POLICY "Allow public inserts" ON waiting_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create a policy for reading (only authenticated users, e.g., admins)
-- Uncomment if you want to access data from dashboard only
-- CREATE POLICY "Allow authenticated reads" ON waiting_list
--   FOR SELECT
--   TO authenticated
--   USING (true);
```

### 2.3 Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values (you'll need them for Vercel):
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Part 3: Update the Code for Supabase

### 3.1 Install Supabase Client

In the `site-waitinglist` folder, run:

```bash
npm install @supabase/supabase-js
```

### 3.2 Create Supabase Client File

Create a new file: `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3.3 Create the `lib` folder structure

```bash
mkdir -p lib
```

### 3.4 Update the WaitingListForm Component

Replace the `handleSubmit` function in `components/WaitingListForm.tsx` with:

```tsx
// Add this import at the top of the file
import { supabase } from "@/lib/supabase";

// Replace the handleSubmit function with this:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
    const { error } = await supabase.from("waiting_list").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        user_type: formData.userType,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setSubmitStatus("error");
    } else {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", userType: "user" });
    }
  } catch (error) {
    console.error("Error:", error);
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

### 3.5 Create Environment Variables File

Create a `.env.local` file in the project root (for local development):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important:** Add `.env.local` to `.gitignore` if not already there:

```bash
echo ".env.local" >> .gitignore
```

### 3.6 Commit and Push the Changes

```bash
git add .
git commit -m "Add Supabase integration for waiting list"
git push
```

---

## Part 4: Deploy to Vercel

### 4.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Start Deploying** (or **Add New... → Project** if you have an account)
3. Sign in with GitHub
4. Click **Import** next to your `sotr-waitinglist` repository
5. Vercel will auto-detect it's a Next.js project

### 4.2 Configure Environment Variables

Before clicking Deploy:

1. Expand **Environment Variables** section
2. Add these two variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key-from-supabase` |

3. Click **Deploy**

### 4.3 Wait for Deployment

- Vercel will build and deploy your site (takes 1-2 minutes)
- Once done, you'll get a URL like `https://sotr-waitinglist.vercel.app`

### 4.4 (Optional) Add Custom Domain

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain and follow the DNS instructions

---

## Part 5: View Waiting List Signups

### Option A: Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Click **Table Editor** in the sidebar
3. Click on `waiting_list` table
4. You'll see all signups in a spreadsheet-like view

### Option B: Export to CSV

1. In Table Editor, click the three dots menu (top right)
2. Select **Export to CSV**

---

## Troubleshooting

### "Failed to insert" or form doesn't submit

1. Check that your environment variables are correct in Vercel
2. Verify RLS policies are created (Step 2.2)
3. Check Supabase logs: **Logs** → **Edge Functions** or **Postgres**

### Duplicate email error

The table has a unique constraint on email. Users can only sign up once. This is intentional.

### CORS errors

Supabase handles CORS automatically. If you see CORS errors, check that your Supabase URL is correct.

---

## Summary Checklist

- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Created Supabase project
- [ ] Created `waiting_list` table with RLS policies
- [ ] Installed `@supabase/supabase-js`
- [ ] Created `lib/supabase.ts`
- [ ] Updated `WaitingListForm.tsx` with Supabase integration
- [ ] Added environment variables to `.env.local`
- [ ] Committed and pushed changes
- [ ] Deployed to Vercel with environment variables
- [ ] Tested the form on the live site

---

## Quick Reference: Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get these from: **Supabase Dashboard** → **Settings** → **API**

---

That's it! Your waiting list is now live and collecting signups. 🚀

