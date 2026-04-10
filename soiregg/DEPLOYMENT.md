# Deployment Guide

## Quick Start (3 Steps to Deploy)

### Step 1: Prepare Your Site

1. **Change the admin password** (IMPORTANT!)
   - Open `js/admin.js`
   - Line 28: Change `'admin123'` to your secure password

2. **Add your photos** (Optional - can be done later)
   - Copy photos to `images/2023/`, `images/2024/`, `images/2025/`
   - Run `./add-photos.sh` to auto-generate gallery code
   - Or manually update `js/main.js` (see comments in file)

3. **Customize event details** (Optional)
   - Edit `index.html` to update date, time, location
   - Edit colors in `css/style.css` if desired

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Fastest - 2 minutes)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up/login (free account)
3. Drag the entire `soiregg` folder onto Netlify
4. Done! Your site is live at `https://random-name.netlify.app`

#### Option B: GitHub Deployment (Recommended)

1. **Initialize Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial SOIRAVE website"
   ```

2. **Create GitHub repository:**
   ```bash
   # If you have GitHub CLI installed:
   gh repo create soirave --public --source=. --push

   # Or manually:
   # - Go to github.com/new
   # - Create repository
   # - Follow the push instructions
   ```

3. **Deploy on Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your `soirave` repository
   - Click "Deploy site"

### Step 3: View RSVPs

Once deployed, you can view RSVPs in two ways:

#### Method 1: Netlify Dashboard (Easiest)
1. Log in to Netlify
2. Click on your site
3. Go to "Forms" tab
4. See all RSVP submissions

#### Method 2: Admin Page
1. Go to `https://your-site.netlify.app/admin.html`
2. Enter your password
3. View, search, and export RSVPs

## Advanced Configuration

### Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `soirave.com`)
4. Follow DNS configuration instructions
5. SSL certificate will be automatically provisioned

### Enable Live RSVP Updates (Optional)

To make the admin page fetch live RSVPs from Netlify:

1. **Get Netlify Personal Access Token:**
   - Go to Netlify User Settings → Applications
   - Create new access token
   - Copy the token

2. **Add Environment Variables:**
   - In Netlify dashboard → Site settings → Environment variables
   - Add:
     - `NETLIFY_TOKEN` = your access token
     - `ADMIN_PASSWORD` = your admin password (same as in admin.js)

3. **Update admin.js to use the serverless function:**
   - Uncomment lines 46-48 in `js/admin.js`
   - Comment out lines 51-52 (localStorage demo code)

4. **Deploy changes:**
   ```bash
   git add .
   git commit -m "Enable live RSVP updates"
   git push
   ```

### Email Notifications (Optional)

To receive email notifications when someone RSVPs:

1. In Netlify dashboard, go to Forms → Form notifications
2. Click "Add notification"
3. Select "Email notification"
4. Enter your email address
5. Choose "New form submission" as trigger

## Troubleshooting

### Forms not working?
- Make sure you deployed via Netlify (forms don't work locally)
- Check that `data-netlify="true"` is in the form tag (rsvp.html line 17)
- Forms must be in HTML files at deploy time (not dynamically added)

### Admin page showing demo data?
- This is normal for local testing
- Once deployed with environment variables, it will show real submissions
- Or simply check the Netlify dashboard Forms section

### Photos not loading?
- Make sure images are in correct folders
- Run `./add-photos.sh` to verify
- Check browser console for 404 errors
- Verify image paths in `js/main.js`

### Can't access admin page?
- Password is set in `js/admin.js` line 28
- This is client-side protection (sufficient for private events)
- For stronger security, use Netlify Identity (see below)

## Enhanced Security (Optional)

For stronger admin authentication, use Netlify Identity:

1. Enable Identity in Netlify dashboard
2. Add this to `admin.html` in the `<head>`:
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```
3. Replace password check in `admin.js` with Identity authentication
4. See [Netlify Identity docs](https://docs.netlify.com/visitor-access/identity/)

## Costs

**Everything is FREE with these limits:**
- Hosting: Unlimited
- Bandwidth: 100GB/month (plenty for photo galleries)
- Form submissions: 100/month (upgrade to 1000/month for $19/mo if needed)
- Build minutes: 300/month
- SSL: Free forever
- Custom domain: ~$12/year (optional, buy from any registrar)

**Estimated costs for typical event:**
- Small event (<100 RSVPs): $0/month
- Medium event (>100 RSVPs): $0-19/month
- Custom domain: $12/year (optional)

## Support

- Netlify docs: [docs.netlify.com](https://docs.netlify.com)
- Netlify support: [netlify.com/support](https://www.netlify.com/support)
- Forms help: [docs.netlify.com/forms](https://docs.netlify.com/forms/setup/)

## Next Steps

After deployment:

1. **Share the RSVP link**: `https://your-site.netlify.app/rsvp.html`
2. **Monitor submissions**: Check Netlify dashboard or admin page
3. **Add photos**: Upload to image folders and redeploy
4. **Update event details**: Edit HTML and push changes

Your site will auto-deploy whenever you push to GitHub!
