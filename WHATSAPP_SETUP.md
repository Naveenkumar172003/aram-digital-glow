# WhatsApp Messaging Setup Guide

## ✅ What's Been Set Up

You now have a complete WhatsApp messaging system integrated into your Branches page using Twilio!

## 📁 Files Created/Modified

### Backend
- **`server/index.js`** - Express server with Twilio WhatsApp endpoint

### Frontend
- **`src/hooks/useTwilioWhatsApp.ts`** - React hook for sending messages
- **`src/pages/Branches.tsx`** - Updated with WhatsApp button on branch cards
- **`package.json`** - Added development scripts

## 🚀 How to Run

### Option 1: Run Both Frontend & Backend Together
```bash
npm run dev:all
```
This will start:
- ✅ Vite dev server on `http://localhost:5173`
- ✅ Express server on `http://localhost:5000`

### Option 2: Run Separately (in 2 terminals)
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

## ⚙️ Configuration

Your `.env.local` file should contain:
```
VITE_TWILIO_ACCOUNT_SID=your_account_sid_here
VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
VITE_TWILIO_PHONE_NUMBER=whatsapp:+your_twilio_number
```

**Note:** Never commit `.env.local` to Git. Make sure it's in `.gitignore`

## 🧪 Testing

1. Start the servers: `npm run dev:all`
2. Open `http://localhost:5173` in your browser
3. Navigate to the Branches page
4. Click the green **"Message"** button on any branch card
5. A toast notification will show if the message was sent successfully

## ✨ Features

- ✅ Send pre-formatted WhatsApp messages to branches
- ✅ Error handling with user-friendly notifications
- ✅ Secure backend API (credentials never exposed to frontend)
- ✅ Toast notifications for success/failure
- ✅ Responsive button design that fits the branch cards

## 📱 Message Format

When users click "Message", they'll send:
```
"Hi! 👋 I'm interested in learning more about your [Branch Name] branch. Could you share more details about your services and timings?"
```

## 🔐 Security Notes

- ✅ API key and auth token are **NOT** exposed on the frontend
- ✅ All requests go through your backend server
- ✅ Twilio credentials stored securely in `.env.local`

## 📞 Next Steps (Optional)

To customize the message template:
1. Edit `src/hooks/useTwilioWhatsApp.ts`
2. Modify the `defaultMessage` variable
3. Restart the server

To store message history, you can add Firebase Firestore logging to the backend endpoint.

## ⚠️ Important Notes

- This is using Twilio's trial account (`+17248355261`)
- Trial accounts can only send to verified phone numbers
- For production, you'll need to approve your WhatsApp Business account via Twilio
- Upgrade your Twilio account when ready for full production use

---

**Everything is ready! Run `npm run dev:all` to test it out!** 🎉
