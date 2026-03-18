import { Laptop, RefreshCw, Briefcase, GraduationCap, Headphones, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { useTwilioWhatsApp } from "@/hooks/useTwilioWhatsApp";
import { Button } from "@/components/ui/button";

const products = [
  { icon: Laptop, title: "New Laptops", desc: "Latest models from top brands", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop" },
  { icon: RefreshCw, title: "Used Laptops", desc: "Quality-checked pre-owned laptops", image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=400&auto=format&fit=crop" },
  { icon: Briefcase, title: "Business Laptops", desc: "High-performance business machines", image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&auto=format&fit=crop" },
  { icon: GraduationCap, title: "Student Laptops", desc: "Affordable laptops for students", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop" },
  { icon: Headphones, title: "Accessories", desc: "Chargers, bags, mice and more", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop" },
];

const LaptopSales = () => {
  const { sendWhatsAppMessage } = useTwilioWhatsApp();

  const handleProductInquiry = async (productName: string) => {
    await sendWhatsAppMessage({
      type: 'product',
      name: productName,
    });
  };

  return (
    <div className="py-20">
      <div className="container">
        <SectionTitle title="Laptop Sales" subtitle="Find the perfect laptop for your needs and budget" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={p.title} className="h-[320px] animate-fade-up flex flex-col" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex-1">
                <ServiceCard icon={p.icon} title={p.title} description={p.desc} image={p.image} fullImage />
              </div>
              <Button
                onClick={() => handleProductInquiry(p.title)}
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Inquire on WhatsApp
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaptopSales;
