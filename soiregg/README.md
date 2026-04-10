# SOIRAVE Website

A simple, static website for the SOIRAVE event with photo galleries, RSVP form, and admin dashboard.

## Features

- **Main Page**: Event details and photo galleries from 2023, 2024, and 2025
- **RSVP Form**: Simple form with Netlify Forms integration (no backend needed!)
- **Admin Dashboard**: View and export RSVPs with password protection
- **Fully Responsive**: Works on all devices
- **100% Free**: Hosted on Netlify free tier

## Setup Instructions

### 1. Add Your Photos

Place your photos in the appropriate directories:
```
images/
├── 2023/  (BAROQUE EGGPUNK photos)
├── 2024/  (ALTEREGGO photos)
└── 2025/  (PROEGGBITION photos)
```

Then update `js/main.js` to load your images. Look for the commented example code in the `loadGalleryImages()` function.

### 2. Change Admin Password

**IMPORTANT**: Change the admin password before deploying!

Edit `js/admin.js` line 28:
```javascript
if (password === 'admin123') { // CHANGE THIS PASSWORD!
```

Change 'admin123' to your secure password.

### 3. Deploy to Netlify

#### Option A: Drag and Drop (Easiest)
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up for free
3. Drag and drop this entire folder to Netlify
4. Your site is live!

#### Option B: Git Deployment (Recommended)
1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   gh repo create soirave --public --source=. --push
   ```

3. Connect to Netlify:
   - Go to netlify.com
   - Click "New site from Git"
   - Connect your GitHub repo
   - Deploy!

### 4. Set Up Custom Domain (Optional)

In Netlify dashboard:
1. Go to Domain Settings
2. Add custom domain
3. Follow DNS configuration instructions

## Viewing RSVPs

### Option 1: Netlify Dashboard
1. Log in to Netlify
2. Go to Forms section
3. View all RSVP submissions

### Option 2: Admin Page
1. Go to yourdomain.com/admin.html
2. Enter the password you set
3. View, search, and export RSVPs

## How It Works

- **Netlify Forms**: Automatically captures form submissions (no database needed!)
- **Static Site**: Pure HTML/CSS/JS, no build process required
- **Client-Side Auth**: Simple password protection for admin page
- **Free Forever**: Netlify free tier includes:
  - Hosting
  - SSL certificate
  - Form submissions (100/month free)
  - Global CDN

## File Structure

```
soiregg/
├── index.html          # Main page with galleries
├── rsvp.html          # RSVP form
├── success.html       # Form success page
├── admin.html         # Admin dashboard
├── css/
│   └── style.css      # All styling
├── js/
│   ├── main.js        # Gallery & lightbox logic
│   └── admin.js       # Admin dashboard logic
├── images/            # Your event photos
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
├── netlify.toml       # Netlify configuration
└── README.md          # This file
```

## Customization

### Colors
Edit the gradient colors in `css/style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Event Details
Edit `index.html` to update date, time, and location.

### Form Fields
Edit `rsvp.html` to add/remove form fields.

## Support

For issues or questions about:
- Netlify deployment: [netlify.com/support](https://www.netlify.com/support)
- This template: Create an issue on GitHub

## License

Free to use and modify for your event!
