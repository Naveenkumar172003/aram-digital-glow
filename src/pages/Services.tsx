import { useEffect, useRef, useState } from "react";
import { Palette, Printer, BookOpen, ScanLine } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";

const featuredService = {
  icon: Printer,
  title: "Printing",
  desc: "Sharp, professional prints in any format",
  image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop",
};

const compactServices = [
  { icon: BookOpen, title: "Spiral Binding", desc: "Professional spiral binding", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop" },
  { icon: Palette, title: "Color Printing", desc: "Vivid, high-quality color prints", image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&auto=format&fit=crop" },
  { icon: ScanLine, title: "Scanning", desc: "Fast digital document scanning", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&auto=format&fit=crop" },
];

const animatedSixServices = Array.from({ length: 6 }, (_, idx) => compactServices[idx % compactServices.length]);

const Services = () => {
  const [topExpanded, setTopExpanded] = useState(false);
  const [bottomExpanded, setBottomExpanded] = useState(false);
  const topSectionRef = useRef<HTMLDivElement | null>(null);
  const bottomSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = topSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTopExpanded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = bottomSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBottomExpanded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12">
      <div className="container">
        <SectionTitle title="Printing Services" subtitle="Click the card to explore all our services" />

        <div className="rounded-2xl border border-black p-4 md:p-6 shadow-sm overflow-hidden" style={{backgroundColor: '#7EACB5'}}>
          <div ref={topSectionRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div className="h-[320px]">
              <ServiceCard icon={featuredService.icon} title={featuredService.title} description={featuredService.desc} image={featuredService.image} fullImage />
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {animatedSixServices.map((s, idx) => (
                <div
                  key={`${s.title}-top-${idx}`}
                  className="h-[150px]"
                  style={{
                    opacity: topExpanded ? 1 : 0,
                    transform: topExpanded ? "translateX(0) scale(1)" : "translateX(-260px) scale(0.4)",
                    transition: `opacity 0.55s ease ${idx * 80}ms, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms`,
                    pointerEvents: topExpanded ? "auto" : "none",
                  }}
                >
                  <ServiceCard icon={s.icon} title={s.title} description={s.desc} image={s.image} compact fullImage />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black p-4 md:p-6 shadow-sm overflow-hidden mt-8" style={{backgroundColor: '#7EACB5'}}>
          <div ref={bottomSectionRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div className="h-[320px]">
              <ServiceCard icon={featuredService.icon} title={featuredService.title} description={featuredService.desc} image={featuredService.image} fullImage />
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {animatedSixServices.map((s, idx) => (
                <div
                  key={`${s.title}-bottom-${idx}`}
                  className="h-[150px]"
                  style={{
                    opacity: bottomExpanded ? 1 : 0,
                    transform: bottomExpanded ? "translateX(0) scale(1)" : "translateX(-260px) scale(0.4)",
                    transition: `opacity 0.55s ease ${idx * 80}ms, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms`,
                    pointerEvents: bottomExpanded ? "auto" : "none",
                  }}
                >
                  <ServiceCard icon={s.icon} title={s.title} description={s.desc} image={s.image} compact fullImage />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
