import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config({ path: './.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio client
const client = twilio(
  process.env.VITE_TWILIO_ACCOUNT_SID,
  process.env.VITE_TWILIO_AUTH_TOKEN
);

console.log('📋 Twilio Configuration:');
console.log('   Account SID:', process.env.VITE_TWILIO_ACCOUNT_SID);
console.log('   Phone Number (FROM):', process.env.VITE_TWILIO_PHONE_NUMBER);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Send WhatsApp message endpoint
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { to, message, branchName } = req.body;

    // Validate inputs
    if (!to || !message) {
      return res.status(400).json({ error: 'Missing "to" or "message"' });
    }

    // Send message via Twilio
    const whatsappMessage = await client.messages.create({
      from: process.env.VITE_TWILIO_PHONE_NUMBER,
      to: `whatsapp:${to.startsWith('+') ? to : '+' + to}`, // Ensure it has + prefix
      body: message,
    });

    console.log(`✓ Message sent to ${to} for ${branchName}`);

    res.json({
      success: true,
      messageSid: whatsappMessage.sid,
      message: 'WhatsApp message sent successfully!',
    });
  } catch (error) {
    console.error('Twilio Error:', error.message);
    res.status(500).json({
      error: 'Failed to send message',
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Twilio WhatsApp Server running on http://localhost:${PORT}`);
  console.log(`📱 Ready to send WhatsApp messages!`);
});
