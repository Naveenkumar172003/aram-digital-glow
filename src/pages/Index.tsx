import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Copy, Palette, BookOpen, ScanLine, Printer, Monitor, CheckCircle, Layers, Camera } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { branches } from "@/data/branches";

const branchOverlays = [
  "rgba(0,80,40,0.40)",
  "rgba(0,60,50,0.40)",
  "rgba(10,70,30,0.40)",
  "rgba(20,50,40,0.40)",
];

const services = [
  { icon: Printer, title: "Printing", desc: "Sharp, professional prints in any format", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop" },
  { icon: BookOpen, title: "Spiral Binding", desc: "Professional spiral binding", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop" },
  { icon: Palette, title: "Color Printing", desc: "Vivid, high-quality color prints", image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&auto=format&fit=crop" },
  { icon: ScanLine, title: "Scanning", desc: "Fast digital document scanning", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&auto=format&fit=crop" },
];

const compactServices = services.slice(1);
const animatedSixServices = Array.from({ length: 6 }, (_, idx) => compactServices[idx % compactServices.length]);

const Index = () => {
  const [activeBranch, setActiveBranch] = useState(0);
  const [topServicesExpanded, setTopServicesExpanded] = useState(false);
  const [bottomServicesExpanded, setBottomServicesExpanded] = useState(false);
  const topServicesSectionRef = useRef<HTMLDivElement | null>(null);
  const bottomServicesSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBranch((prev) => (prev + 1) % branches.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const target = topServicesSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTopServicesExpanded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = bottomServicesSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBottomServicesExpanded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Slideshow background */}
        <div className="absolute inset-0">
          {branches.map((branch, i) => (
            <div
              key={branch.slug}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === activeBranch ? 1 : 0 }}
            >
              <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: branchOverlays[i] }} />
            </div>
          ))}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-[0.15em] uppercase">
                Serving Tamil Nadu Since 2014
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-5">
              Your Trusted{" "}
              <span className="text-cyan-400">Printing Partner</span>{" "}in
              <br />Tamil Nadu
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Link to="/services">
                <Button
                  size="lg"
                  className="bg-slate-800/90 hover:bg-slate-700 border border-white/20 text-white font-semibold px-6 h-12 text-base"
                >
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/branches">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white font-semibold px-6 h-12 text-base"
                >
                  <MapPin className="mr-2 h-5 w-5" /> Find a Branch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0d1f2d]/85 backdrop-blur-sm border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "4",    label: "BRANCHES" },
              { value: "10+",  label: "YEARS OF SERVICE" },
              { value: "50K+", label: "HAPPY CUSTOMERS" },
              { value: "20+",  label: "SERVICES OFFERED" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5 px-3">
                <span className="text-xl md:text-2xl font-bold text-cyan-400">{stat.value}</span>
                <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.12em] text-white/55 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <SectionTitle title="Our Branches" subtitle="Visit any of our 4 branches across Tamil Nadu" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((b, i) => (
              <div key={b.slug} className="card-hover relative aspect-[16/10] rounded-xl border overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <img src={b.image} alt={b.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                  <h3 className="font-semibold text-2xl mb-4 text-white drop-shadow">{b.name}</h3>
                  <Link to={`/branches/${b.slug}`}>
                    <Button variant="outline" size="sm" className="border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                      View Branch Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12">
        <div className="container">
          <SectionTitle title="Printing Services" subtitle="Click the card to explore all our services" />
          <div className="rounded-2xl border border-black bg-blue-100/70 p-4 md:p-6 shadow-sm overflow-hidden">
            <div ref={topServicesSectionRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="h-[320px]">
                <ServiceCard icon={services[0].icon} title={services[0].title} description={services[0].desc} image={services[0].image} fullImage />
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {animatedSixServices.map((s, idx) => (
                  <div
                    key={`${s.title}-top-${idx}`}
                    className="h-[150px]"
                    style={{
                      opacity: topServicesExpanded ? 1 : 0,
                      transform: topServicesExpanded ? "translateX(0) scale(1)" : "translateX(-260px) scale(0.4)",
                      transition: `opacity 0.55s ease ${idx * 80}ms, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms`,
                      pointerEvents: topServicesExpanded ? "auto" : "none",
                    }}
                  >
                    <ServiceCard icon={s.icon} title={s.title} description={s.desc} image={s.image} compact fullImage />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black bg-blue-100/70 p-4 md:p-6 shadow-sm overflow-hidden mt-8">
            <div ref={bottomServicesSectionRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="h-[320px]">
                <ServiceCard icon={services[0].icon} title={services[0].title} description={services[0].desc} image={services[0].image} fullImage />
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {animatedSixServices.map((s, idx) => (
                  <div
                    key={`${s.title}-bottom-${idx}`}
                    className="h-[150px]"
                    style={{
                      opacity: bottomServicesExpanded ? 1 : 0,
                      transform: bottomServicesExpanded ? "translateX(0) scale(1)" : "translateX(-260px) scale(0.4)",
                      transition: `opacity 0.55s ease ${idx * 80}ms, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms`,
                      pointerEvents: bottomServicesExpanded ? "auto" : "none",
                    }}
                  >
                    <ServiceCard icon={s.icon} title={s.title} description={s.desc} image={s.image} compact fullImage />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;