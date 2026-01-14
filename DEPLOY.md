# 🚀 Quick Deploy Guide

## Method 1: Vercel CLI (Recommended)

### First Time Setup:
```bash
# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Future Deployments:
```bash
# Just run this command from project root
vercel --prod
```

## Method 2: Vercel Web Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import **"My-Official-Portfolio"** repository
4. Configure environment variables (see below)
5. Click **"Deploy"**

## ⚙️ Required Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

### Required:
- `RESEND_API_KEY` - Your Resend API key for contact form

### Optional (but recommended):
- `GITHUB_TOKEN` - For GitHub repos display
- `NEXT_PUBLIC_GITHUB_USERNAME` - Your GitHub username (default: amarhumayunx)
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` - For captcha verification

## 📝 Notes

- **Automatic Deployments**: Once connected, every push to `main` branch auto-deploys
- **Preview Deployments**: Every PR gets a preview URL
- **Build Command**: `next build` (auto-detected)
- **Install Command**: `pnpm install` (or `npm install`)

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Repo**: https://github.com/amarhumayunx/My-Official-Portfolio
- **Full Guide**: See `VERCEL_DEPLOYMENT.md` for detailed instructions
