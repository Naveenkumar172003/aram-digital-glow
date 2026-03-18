import { useToast } from "@/hooks/use-toast";

interface SendMessageParams {
  type: 'branch' | 'product' | 'general'; // Type of inquiry
  name: string; // Branch/Product name
  phone?: string; // Optional: customer phone
  customMessage?: string;
}

export const useTwilioWhatsApp = () => {
  const { toast } = useToast();
  
  // Your personal WhatsApp number (with country code)
  const OWNER_PHONE = "+916385449637";

  const sendWhatsAppMessage = async ({
    type,
    name,
    phone,
    customMessage,
  }: SendMessageParams) => {
    try {
      let defaultMessage = "";

      if (type === 'branch') {
        defaultMessage = `Hi! 👋 New inquiry for ${name} branch.\n📞 Customer phone: ${phone}\n\nThey're interested in learning more about your services and timings.`;
      } else if (type === 'product') {
        defaultMessage = `Hi! 👋 New product inquiry.\n📦 Product: ${name}\n${phone ? `📞 Customer phone: ${phone}` : ''}\n\nThey're interested in this product and would like more information.`;
      } else {
        defaultMessage = `Hi! 👋 New inquiry.\n📝 Subject: ${name}\n${phone ? `📞 Customer phone: ${phone}` : ''}\n\nPlease respond at your earliest convenience.`;
      }

      const messageToSend = customMessage || defaultMessage;

      // Send to YOUR personal number (not branch)
      const response = await fetch(
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api/send-whatsapp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: OWNER_PHONE, // Always send to owner's number
            message: messageToSend,
            branchName: name,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to send message');
      }

      const result = await response.json();

      toast({
        title: "✓ Message Sent!",
        description: `Inquiry for ${name} received! We'll get back to you soon.`,
      });

      return true;
    } catch (error) {
      console.error('WhatsApp send error:', error);
      toast({
        title: "❌ Failed to Send",
        description: error instanceof Error ? error.message : "Could not send WhatsApp message. Please try again or call directly.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { sendWhatsAppMessage };
};
