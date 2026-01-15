# Email Setup Guide for Contact Form

## Quick Setup (5 minutes)

Your contact form is now configured to send emails using Web3Forms (free service).

### Step 1: Get Your Access Key

1. Go to https://web3forms.com
2. Enter your email address where you want to receive messages
3. Click "Create Access Key"
4. Copy the access key you receive

### Step 2: Add Access Key to Your Website

1. Open `index.html`
2. Find this line (around line 363):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
4. Save the file

### Step 3: Deploy

Push your changes to GitHub:
```bash
git add .
git commit -m "Add email functionality to contact form"
git push origin master:main
```

## How It Works

- When someone fills out your contact form and clicks "Send Message"
- The form data is sent to Web3Forms API
- Web3Forms forwards the message to your email inbox
- User sees a success/error message
- Form resets automatically on success

## Features

✅ No backend required
✅ Spam protection included
✅ Works with static sites
✅ Free for up to 250 submissions/month
✅ Shows success/error messages
✅ Form validation

## Testing

After deploying, test your form by:
1. Opening your website
2. Scrolling to the Contact section
3. Filling out the form with test data
4. Clicking "Send Message"
5. Check your email inbox for the message

## Alternative Services (if needed)

- **Formspree**: https://formspree.io
- **EmailJS**: https://www.emailjs.com
- **Getform**: https://getform.io

All work similarly - just need to replace the API endpoint and add their access key.
