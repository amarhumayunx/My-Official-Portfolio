# 🔐 Environment Variables Guide

This document lists all environment variables used in the project and their associated services/websites.

## 📋 Required Environment Variables

### 1. **RESEND_API_KEY**
- **Service**: [Resend](https://resend.com)
- **Purpose**: Email delivery service for contact form submissions
- **Where Used**: `app/actions/contact.tsx`
- **How to Get**:
  1. Go to [resend.com](https://resend.com)
  2. Sign up/Login
  3. Navigate to API Keys section
  4. Create a new API key
  5. Copy and add to `.env.local` or Vercel environment variables
- **Required**: ✅ Yes (for contact form to work)

---

## 🔧 Optional Environment Variables

### 2. **GITHUB_TOKEN**
- **Service**: [GitHub](https://github.com)
- **Purpose**: Personal Access Token for GitHub API to fetch repository data
- **Where Used**: 
  - `app/api/github/repos/route.ts`
  - `app/api/github/repo/[owner]/[repo]/route.ts`
  - `lib/project-utils.ts`
- **How to Get**:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Click "Generate new token (classic)"
  3. Select scopes: `public_repo` (read access to public repositories)
  4. Generate and copy the token
  5. Add to `.env.local` or Vercel environment variables
- **Required**: ❌ No (but recommended for better GitHub API rate limits)
- **Note**: Without this, GitHub API calls will use unauthenticated requests (60 requests/hour limit)

---

### 3. **NEXT_PUBLIC_GITHUB_USERNAME**
- **Service**: [GitHub](https://github.com)
- **Purpose**: Your GitHub username to fetch repositories from
- **Where Used**: 
  - `components/sections/github-repos.tsx`
  - `app/api/github/repos/route.ts`
  - `lib/project-utils.ts`
- **Default Value**: `"amarhumayunx"` (hardcoded fallback)
- **Required**: ❌ No (has default)
- **Note**: If not set, defaults to `"amarhumayunx"`

---

### 4. **NEXT_PUBLIC_GA_MEASUREMENT_ID**
- **Service**: [Google Analytics](https://analytics.google.com)
- **Purpose**: Google Analytics 4 (GA4) tracking ID for website analytics
- **Where Used**: `components/ui/GoogleAnalytics.tsx`
- **How to Get**:
  1. Go to [Google Analytics](https://analytics.google.com)
  2. Create a new GA4 property
  3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
  4. Add to `.env.local` or Vercel environment variables
- **Required**: ❌ No (Google Analytics won't track if not set)
- **Note**: Must start with `NEXT_PUBLIC_` to be accessible in the browser

---

### 5. **NEXT_PUBLIC_HCAPTCHA_SITE_KEY**
- **Service**: [hCaptcha](https://www.hcaptcha.com)
- **Purpose**: hCaptcha site key for bot protection on forms
- **Where Used**: Contact forms (if implemented)
- **How to Get**:
  1. Go to [hcaptcha.com](https://www.hcaptcha.com)
  2. Sign up and create a site
  3. Copy the Site Key
  4. Add to `.env.local` or Vercel environment variables
- **Required**: ❌ No (optional CAPTCHA protection)
- **Note**: Must start with `NEXT_PUBLIC_` to be accessible in the browser

---

### 6. **NEXT_PUBLIC_RECAPTCHA_SITE_KEY**
- **Service**: [Google reCAPTCHA](https://www.google.com/recaptcha)
- **Purpose**: Google reCAPTCHA site key for bot protection (alternative to hCaptcha)
- **Where Used**: Contact forms (if implemented)
- **How to Get**:
  1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
  2. Register a new site
  3. Choose reCAPTCHA v2 or v3
  4. Copy the Site Key
  5. Add to `.env.local` or Vercel environment variables
- **Required**: ❌ No (optional CAPTCHA protection)
- **Note**: Must start with `NEXT_PUBLIC_` to be accessible in the browser

---

### 7. **NEXT_PUBLIC_SUPABASE_URL**
- **Service**: [Supabase](https://supabase.com)
- **Purpose**: Supabase project URL for database connection
- **Where Used**: Database operations (if Supabase is implemented)
- **How to Get**:
  1. Go to [supabase.com](https://supabase.com)
  2. Create a new project
  3. Go to Project Settings → API
  4. Copy the Project URL
  5. Add to `.env.local` or Vercel environment variables
- **Required**: ❌ No (only if using Supabase features)
- **Note**: Must start with `NEXT_PUBLIC_` to be accessible in the browser

---

### 8. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
- **Service**: [Supabase](https://supabase.com)
- **Purpose**: Supabase anonymous/public API key for client-side database access
- **Where Used**: Database operations (if Supabase is implemented)
- **How to Get**:
  1. Go to [supabase.com](https://supabase.com)
  2. Open your project
  3. Go to Project Settings → API
  4. Copy the `anon` `public` key
  5. Add to `.env.local` or Vercel environment variables
- **Required**: ❌ No (only if using Supabase features)
- **Note**: Must start with `NEXT_PUBLIC_` to be accessible in the browser

---

## 🔒 Security Notes

### Public vs Private Variables

**Variables starting with `NEXT_PUBLIC_`:**
- ✅ Safe to expose in the browser
- ✅ Accessible in client-side code
- ✅ Can be seen in browser DevTools
- ⚠️ Only use for public keys/IDs, never secrets

**Variables without `NEXT_PUBLIC_`:**
- 🔒 Server-side only
- 🔒 Never exposed to the browser
- 🔒 Use for API keys, tokens, secrets

### Best Practices

1. ✅ **Never commit** `.env.local` to Git (already in `.gitignore`)
2. ✅ **Use environment variables** for all API keys and secrets
3. ✅ **Rotate keys regularly** for security
4. ✅ **Use different keys** for development and production
5. ✅ **Set variables in Vercel** for production deployments

---

## 📝 Setup Instructions

### Local Development

1. Create `.env.local` file in the project root:
```env
# Required
RESEND_API_KEY=your_resend_api_key_here

# Optional but recommended
GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_USERNAME=amarhumayunx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Restart your development server after adding variables

### Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable with appropriate values
3. Select environment (Production, Preview, Development)
4. Redeploy if needed

---

## 🌐 Service Links Summary

| Variable | Service | Website |
|----------|---------|---------|
| `RESEND_API_KEY` | Resend | https://resend.com |
| `GITHUB_TOKEN` | GitHub | https://github.com |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub | https://github.com |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | https://analytics.google.com |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha | https://www.hcaptcha.com |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA | https://www.google.com/recaptcha |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | https://supabase.com |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | https://supabase.com |

---

## ✅ Quick Checklist

- [ ] `RESEND_API_KEY` - Required for contact form
- [ ] `GITHUB_TOKEN` - Recommended for GitHub API
- [ ] `NEXT_PUBLIC_GITHUB_USERNAME` - Optional (has default)
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Optional (for analytics)
- [ ] `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` - Optional (for CAPTCHA)
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Optional (alternative CAPTCHA)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Optional (if using Supabase)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Optional (if using Supabase)

---

**Last Updated**: Based on current codebase analysis
**Project**: My-Official-Portfolio
