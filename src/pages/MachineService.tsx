import { Wrench, Settings, Droplets, Cpu, Shield } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";

const services = [
  { icon: Wrench, title: "All Machine Repairs", desc: "Repair all types of xerox and printing machines", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop" },
  { icon: Settings, title: "Printer Troubleshooting", desc: "Diagnose and fix printer issues quickly", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop" },
  { icon: Droplets, title: "Toner Replacement", desc: "Genuine toner cartridge replacement", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&auto=format&fit=crop" },
  { icon: Cpu, title: "Hardware Repair", desc: "Fix mechanical and electronic components", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop" },
  { icon: Shield, title: "AMC Service", desc: "Annual maintenance contracts for worry-free operation", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format&fit=crop" },
];

const MachineService = () => (
  <div className="py-20">
    <div className="container">
      <SectionTitle title="Printer & Xerox Machine Service" subtitle="Expert repair and maintenance for all your printing equipment" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={s.title} className="h-[320px] animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <ServiceCard icon={s.icon} title={s.title} description={s.desc} image={s.image} fullImage />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MachineService;
