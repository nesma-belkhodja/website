# SOIRAVE Website - Quick Start

## Preview Locally (Right Now!)

Open `index.html` in your browser:

```bash
open index.html
```

Or simply double-click `index.html` in Finder.

You can test the entire site locally:
- Main page: `index.html`
- RSVP form: `rsvp.html` (won't submit locally - needs Netlify)
- Admin page: `admin.html` (password: `admin123`)

## Deploy in 3 Steps

### 1. Change Admin Password (IMPORTANT!)
```bash
# Edit this file:
open -a TextEdit js/admin.js

# Line 28: Change 'admin123' to your password
```

### 2. Deploy to Netlify
```bash
# Option A: Drag & drop
# Go to app.netlify.com and drag the 'soiregg' folder

# Option B: Use GitHub (if you have gh CLI)
git init
git add .
git commit -m "Initial commit"
gh repo create soirave --public --source=. --push
# Then connect to Netlify via dashboard
```

### 3. Share Your Link!
Once deployed, share: `https://your-site.netlify.app/rsvp.html`

## Add Photos Later

```bash
# 1. Add photos to folders
cp ~/my-photos/*.jpg images/2023/

# 2. Run helper script
./add-photos.sh

# 3. Push changes
git add .
git commit -m "Add photos"
git push
```

## What You Get

- 📸 **Photo Galleries**: Three separate galleries (2023, 2024, 2025)
- 📝 **RSVP Form**: Automatic submission handling
- 👨‍💼 **Admin Dashboard**: View and export RSVPs
- 📱 **Fully Responsive**: Works on all devices
- 🔒 **Password Protected**: Admin page secured
- 💰 **100% FREE**: No costs (Netlify free tier)

## Files Overview

```
soiregg/
├── index.html              # Main page (photos + event info)
├── rsvp.html              # RSVP form
├── success.html           # Confirmation page
├── admin.html             # Admin dashboard
├── css/style.css          # All styling
├── js/
│   ├── main.js            # Gallery & lightbox
│   └── admin.js           # Admin logic
├── images/                # Your event photos
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
├── netlify/
│   └── functions/         # Serverless functions
├── netlify.toml           # Netlify config
├── add-photos.sh          # Photo helper script
├── README.md              # Full documentation
├── DEPLOYMENT.md          # Detailed deployment guide
└── QUICKSTART.md          # This file
```

## Default Password

**Admin page password:** `admin123`

⚠️ **CHANGE THIS BEFORE DEPLOYING!** Edit `js/admin.js` line 28.

## Need Help?

- Full documentation: See `README.md`
- Deployment guide: See `DEPLOYMENT.md`
- Netlify docs: [docs.netlify.com](https://docs.netlify.com)

## Customization Checklist

Before deploying, customize:

- [ ] Change admin password in `js/admin.js`
- [ ] Update event details in `index.html` (date, time, location)
- [ ] Add your photos to `images/` folders
- [ ] Customize colors in `css/style.css` (optional)
- [ ] Replace flier placeholder (optional)

After deploying:

- [ ] Test RSVP form
- [ ] Test admin page
- [ ] Set up custom domain (optional)
- [ ] Enable email notifications (optional)

## Common Questions

**Q: How do I see RSVPs?**
A: Go to `your-site.netlify.app/admin.html` or check Netlify dashboard → Forms

**Q: Forms not working?**
A: Forms only work when deployed to Netlify (not locally)

**Q: How do I add more photos?**
A: Copy to `images/YEAR/` folder, run `./add-photos.sh`, then redeploy

**Q: Can I customize the design?**
A: Yes! Edit `css/style.css` to change colors, fonts, layout

**Q: How much does this cost?**
A: $0 for hosting. Optional: custom domain ~$12/year

## What's Next?

1. Preview the site locally (open `index.html`)
2. Make any customizations
3. Deploy to Netlify
4. Share your RSVP link!

Enjoy your event! 🎉
