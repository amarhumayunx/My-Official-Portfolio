# 📝 Where to Enter Environment Variables

This guide shows you exactly where and how to add environment variables for both **local development** and **production (Vercel)**.

---

## 🏠 Local Development Setup

### Step 1: Create `.env.local` File

1. **Open your project root folder** (`/Users/amar/Website/My-Official-Portfolio`)

2. **Create a new file** named `.env.local` in the root directory (same level as `package.json`)

3. **Add your environment variables** in this format:

```env
# Required - Contact Form
RESEND_API_KEY=re_your_actual_api_key_here

# Optional - GitHub Integration
GITHUB_TOKEN=ghp_your_github_token_here
NEXT_PUBLIC_GITHUB_USERNAME=amarhumayunx

# Optional - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional - CAPTCHA Protection
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key_here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here

# Optional - Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 2: Save the File

- Save the `.env.local` file
- **Important**: The file should be in the root directory, not in any subfolder

### Step 3: Restart Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
# or
yarn dev
```

### ✅ Verify It's Working

- The `.env.local` file is automatically loaded by Next.js
- Check your terminal - there should be no errors
- Test the contact form to verify `RESEND_API_KEY` is working

---

## ☁️ Production Setup (Vercel)

### Method 1: Vercel Dashboard (Recommended)

#### Step 1: Go to Vercel Dashboard

1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sign in with your GitHub account
3. Find your project **"My-Official-Portfolio"** and click on it

#### Step 2: Navigate to Environment Variables

1. Click on **"Settings"** tab (top navigation)
2. Click on **"Environment Variables"** in the left sidebar
3. You'll see a section to add environment variables

#### Step 3: Add Each Variable

For each environment variable:

1. **Key**: Enter the variable name (e.g., `RESEND_API_KEY`)
2. **Value**: Enter the actual value (e.g., `re_6NDc9ymU_...`)
3. **Environment**: Select where it applies:
   - ✅ **Production** - Live website
   - ✅ **Preview** - Pull request previews
   - ✅ **Development** - Local development (optional)

4. Click **"Add"** or **"Save"**

#### Step 4: Add All Variables

Add these one by one:

```
RESEND_API_KEY = [your resend key]
GITHUB_TOKEN = [your github token]
NEXT_PUBLIC_GITHUB_USERNAME = amarhumayunx
NEXT_PUBLIC_GA_MEASUREMENT_ID = [your GA ID]
NEXT_PUBLIC_HCAPTCHA_SITE_KEY = [your hcaptcha key]
```

#### Step 5: Redeploy

After adding variables:

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or simply push a new commit to trigger auto-deploy

---

### Method 2: Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not linked)
vercel link

# Add environment variables
vercel env add RESEND_API_KEY
# (It will prompt you to enter the value)

# Add more variables
vercel env add GITHUB_TOKEN
vercel env add NEXT_PUBLIC_GITHUB_USERNAME
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID

# Pull variables to local (optional)
vercel env pull .env.local
```

---

## 📍 File Locations Summary

### Local Development
```
/Users/amar/Website/My-Official-Portfolio/
├── .env.local          ← CREATE THIS FILE HERE
├── package.json
├── next.config.mjs
└── ...
```

### Production (Vercel)
```
Vercel Dashboard
└── Your Project (My-Official-Portfolio)
    └── Settings
        └── Environment Variables  ← ADD HERE
```

---

## 🔍 How to Verify Variables Are Set

### Local Development

1. **Check if file exists**:
```bash
ls -la .env.local
```

2. **Verify variables are loaded** (in your code):
```typescript
console.log(process.env.RESEND_API_KEY) // Should show your key
console.log(process.env.NEXT_PUBLIC_GITHUB_USERNAME) // Should show "amarhumayunx"
```

### Production (Vercel)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. You should see all your variables listed
3. Test your website - contact form should work if `RESEND_API_KEY` is set

---

## ⚠️ Important Notes

### ✅ DO:
- ✅ Create `.env.local` in the **root directory** (same folder as `package.json`)
- ✅ Use exact variable names (case-sensitive)
- ✅ Restart dev server after adding variables
- ✅ Add variables in Vercel for production
- ✅ Keep `.env.local` in `.gitignore` (already done)

### ❌ DON'T:
- ❌ Commit `.env.local` to Git (it's already ignored)
- ❌ Share your API keys publicly
- ❌ Use quotes around values in `.env.local` (unless the value itself contains spaces)
- ❌ Add variables with `NEXT_PUBLIC_` prefix for server-only secrets

---

## 🎯 Quick Setup Checklist

### For Local Development:
- [ ] Create `.env.local` file in project root
- [ ] Add `RESEND_API_KEY` (required)
- [ ] Add `GITHUB_TOKEN` (optional but recommended)
- [ ] Add `NEXT_PUBLIC_GITHUB_USERNAME` (optional)
- [ ] Add other optional variables as needed
- [ ] Restart dev server (`npm run dev`)

### For Production (Vercel):
- [ ] Go to Vercel Dashboard
- [ ] Select your project
- [ ] Go to Settings → Environment Variables
- [ ] Add `RESEND_API_KEY` (required)
- [ ] Add `GITHUB_TOKEN` (optional)
- [ ] Add `NEXT_PUBLIC_GITHUB_USERNAME` (optional)
- [ ] Add other optional variables
- [ ] Select environments (Production, Preview)
- [ ] Redeploy your project

---

## 🆘 Troubleshooting

### Variables Not Working Locally?

1. **Check file name**: Must be exactly `.env.local` (not `.env.local.txt`)
2. **Check location**: Must be in root directory
3. **Restart server**: Stop and restart `npm run dev`
4. **Check syntax**: No spaces around `=` sign
5. **Check quotes**: Don't use quotes unless value has spaces

### Variables Not Working in Production?

1. **Check Vercel dashboard**: Verify variables are added
2. **Check environment**: Make sure variables are set for "Production"
3. **Redeploy**: Trigger a new deployment after adding variables
4. **Check variable names**: Must match exactly (case-sensitive)
5. **Check `NEXT_PUBLIC_` prefix**: Client-side variables need this prefix

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)
- **Next.js Docs**: [nextjs.org/docs/basic-features/environment-variables](https://nextjs.org/docs/basic-features/environment-variables)
- **Project README**: See `README.md` for more info

---

**Last Updated**: Current as of project setup
**Project**: My-Official-Portfolio
