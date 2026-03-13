import { Monitor, Smartphone, Keyboard, Download, ShieldCheck, HardDrive, Database } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";

const services = [
  { icon: Monitor, title: "Laptop Repair", desc: "Complete laptop repair solutions", image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&auto=format&fit=crop" },
  { icon: Smartphone, title: "Screen Replacement", desc: "LCD/LED screen replacement service", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop" },
  { icon: Keyboard, title: "Keyboard Replacement", desc: "Keyboard repair and replacement", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop" },
  { icon: Download, title: "Software Installation", desc: "OS and software installation", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&auto=format&fit=crop" },
  { icon: ShieldCheck, title: "Virus Removal", desc: "Malware and virus removal service", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&auto=format&fit=crop" },
  { icon: HardDrive, title: "OS Installation", desc: "Fresh OS installation and setup", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop" },
  { icon: Database, title: "Data Recovery", desc: "Recover lost or deleted data", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop" },
];

const LaptopService = () => (
  <div className="py-20">
    <div className="container">
      <SectionTitle title="Laptop Repair & Service" subtitle="Professional laptop repair and maintenance services" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div key={s.title} className="h-[320px] animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <ServiceCard icon={s.icon} title={s.title} description={s.desc} image={s.image} fullImage />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LaptopService;
