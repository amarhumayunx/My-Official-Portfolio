# 🚀 Deploying to Vercel - Step by Step Guide

This guide will walk you through deploying your portfolio website to Vercel.

## 📋 Prerequisites

1. ✅ Your code is pushed to GitHub (already done!)
2. ✅ GitHub account: `amarhumayunx`
3. ✅ Repository: `My-Official-Portfolio`

## 🎯 Step-by-Step Deployment

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. After signing in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"My-Official-Portfolio"** and click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js settings, but verify:

- **Framework Preset**: Next.js (should be auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `next build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `pnpm install` (or `npm install`)

### Step 4: Add Environment Variables ⚠️ IMPORTANT

Click **"Environment Variables"** and add:

#### Required:
```env
RESEND_API_KEY=your_resend_api_key_here
```

#### Optional (but recommended):
```env
GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
NEXT_PUBLIC_GITHUB_USERNAME=amarhumayunx
```

**How to get these:**

1. **RESEND_API_KEY**:
   - Go to [resend.com](https://resend.com)
   - Sign up/login
   - Go to API Keys section
   - Create a new API key
   - Copy and paste into Vercel

2. **GITHUB_TOKEN** (optional):
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Select scopes: `public_repo` (read access to public repositories)
   - Copy token

3. **NEXT_PUBLIC_HCAPTCHA_SITE_KEY** (optional):
   - Go to [hcaptcha.com](https://www.hcaptcha.com)
   - Sign up and create a site
   - Copy the Site Key

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 2-5 minutes)
3. Vercel will show you the deployment URL (e.g., `my-official-portfolio.vercel.app`)

### Step 6: Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `amarhumayun.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically configure SSL certificates

## 🔧 Post-Deployment Checklist

### ✅ Verify Deployment

1. **Check Build Logs**: Ensure no errors during build
2. **Test Live Site**: Visit your deployment URL
3. **Test Features**:
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] Search functionality (`Ctrl+K` or `/`)
   - [ ] Contact form works (test with RESEND_API_KEY)
   - [ ] Projects and blog pages load
   - [ ] Dark mode toggle works
   - [ ] Mobile responsive design

### ✅ SEO Verification

1. **Sitemap**: Visit `https://your-domain.vercel.app/sitemap.xml`
2. **Robots.txt**: Visit `https://your-domain.vercel.app/robots.txt`
3. **RSS Feed**: Visit `https://your-domain.vercel.app/feed.xml`

### ✅ Performance Check

1. Run [PageSpeed Insights](https://pagespeed.web.dev/)
2. Check [Lighthouse](https://developers.google.com/web/tools/lighthouse) scores
3. Verify PWA installation works

## 🔄 Automatic Deployments

Vercel automatically deploys:
- ✅ Every push to `main` branch → **Production**
- ✅ Every push to other branches → **Preview deployment**
- ✅ Every Pull Request → **Preview deployment**

## 🛠️ Troubleshooting

### Build Fails

1. **Check Build Logs**: Click on failed deployment → View logs
2. **Common Issues**:
   - Missing environment variables → Add them in Project Settings
   - Build errors → Check `next.config.mjs` settings
   - TypeScript errors → Check `tsconfig.json`

### Contact Form Not Working

1. Verify `RESEND_API_KEY` is set correctly
2. Check Resend dashboard for email logs
3. Verify email address in `app/actions/contact.tsx`

### GitHub Repos Not Loading

1. Add `GITHUB_TOKEN` environment variable
2. Verify token has correct permissions
3. Check API rate limits

### Service Worker Not Working

1. Ensure `public/sw.js` is deployed
2. Check browser console for errors
3. Verify HTTPS is enabled (Vercel provides this automatically)

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional)

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics (free tier available)
3. Track page views and performance

### Custom Analytics

You can add:
- Google Analytics
- Plausible Analytics
- Other analytics services

## 🔐 Security Best Practices

1. ✅ Never commit API keys to Git (already done!)
2. ✅ Use environment variables for all secrets
3. ✅ Enable Vercel's DDoS protection (automatic)
4. ✅ Use HTTPS (automatic with Vercel)
5. ✅ Regularly rotate API keys

## 📝 Quick Reference

**Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)

**Your Repository**: `https://github.com/amarhumayunx/My-Official-Portfolio`

**Deployment URL**: `https://my-official-portfolio.vercel.app` (or your custom domain)

## 🎉 Success!

Once deployed, your portfolio will be:
- ✅ Live on the internet
- ✅ Automatically updated on every push
- ✅ SSL secured (HTTPS)
- ✅ Globally distributed via CDN
- ✅ Optimized for performance

---

**Need Help?**
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
