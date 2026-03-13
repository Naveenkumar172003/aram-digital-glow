import { Printer, RefreshCw, Building2, Layers, Briefcase, Wrench } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";

const products = [
  { icon: Printer, title: "New Xerox Machines", desc: "Latest models from top brands", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop" },
  { icon: RefreshCw, title: "Refurbished Machines", desc: "Quality tested refurbished units at great prices", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop" },
  { icon: Building2, title: "Office Printers", desc: "Reliable printers for office environments", image: "https://images.unsplash.com/photo-1572239305927-fc0e37e0de8f?w=400&auto=format&fit=crop" },
  { icon: Layers, title: "Bulk Printing Machines", desc: "High-volume machines for businesses", image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?w=400&auto=format&fit=crop" },
  { icon: Briefcase, title: "Business Consultation", desc: "Expert advice for your printing setup needs", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format&fit=crop" },
  { icon: Wrench, title: "Machine Spare Parts", desc: "Original spare parts for all major machine brands", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop" },
];

const MachineSales = () => (
  <div className="py-20">
    <div className="container">
      <SectionTitle title="Xerox Machine Sales" subtitle="Find the perfect printing solution for your needs" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <div key={p.title} className="h-[320px] animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <ServiceCard icon={p.icon} title={p.title} description={p.desc} image={p.image} fullImage />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MachineSales;
