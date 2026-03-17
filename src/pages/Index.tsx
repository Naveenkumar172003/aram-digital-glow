import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Palette,
  Printer,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { useAdminStore } from "@/hooks/useAdminStore";
import heroVideo from "@/assets/back4.mp4";

const services = [
  {
    icon: Printer,
    title: "Printing",
    desc: "Sharp, professional prints in any format",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop",
  },
  {
    icon: BookOpen,
    title: "Spiral Binding",
    desc: "Professional spiral binding",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop",
  },
  {
    icon: Palette,
    title: "Color Printing",
    desc: "Vivid, high-quality color prints",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&auto=format&fit=crop",
  },
  {
    icon: ScanLine,
    title: "Scanning",
    desc: "Fast digital document scanning",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&auto=format&fit=crop",
  },
];

const compactServices = services.slice(1);
const animatedSixServices = Array.from(
  { length: 6 },
  (_, idx) => compactServices[idx % compactServices.length],
);

const Index = () => {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const { categories, products, branches } = useAdminStore();
  
  // Get featured products
  const featuredProducts = products.filter((p) => p.featured);

  useEffect(() => {
    const target = servicesSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesExpanded(true);
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
      <section className="relative w-full min-h-[60vh] md:h-screen overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 md:bg-black/50" />
      </section>

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container">
          <SectionTitle
            title="Our Product Categories"
            subtitle="Browse our complete range of machines and equipment"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container">
          <SectionTitle title="Best Selling Products" subtitle="Our most popular machines and equipment" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10">
            <Link to="/category/brand-new-xerox">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 w-full">
        <div className="px-4 md:px-6">
          <SectionTitle title="Printing Services" subtitle="Click the card to explore all our services" />
          <div className="overflow-hidden">
            <div ref={servicesSectionRef} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="h-[260px] md:h-[320px]">
                <ServiceCard
                  icon={services[0].icon}
                  title={services[0].title}
                  description={services[0].desc}
                  image={services[0].image}
                  fullImage
                />
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {animatedSixServices.map((service, index) => (
                  <div
                    key={`${service.title}-${index}`}
                    className="h-[130px] md:h-[150px]"
                    style={{
                      opacity: servicesExpanded ? 1 : 0,
                      transform: servicesExpanded
                        ? "translateX(0) scale(1)"
                        : "translateX(-260px) scale(0.4)",
                      transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`,
                      pointerEvents: servicesExpanded ? "auto" : "none",
                    }}
                  >
                    <ServiceCard
                      icon={service.icon}
                      title={service.title}
                      description={service.desc}
                      image={service.image}
                      compact
                      fullImage
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container">
          <SectionTitle title="Our Branches" subtitle="Visit any of our branches across Tamil Nadu" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, index) => (
              <Link
                key={branch.slug}
                to={`/branches/${branch.slug}`}
                className="card-hover relative aspect-[4/3] rounded-xl overflow-hidden animate-fade-up group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <h3 className="font-bold text-lg md:text-xl text-white drop-shadow">{branch.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{branch.shortAddress}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-green-700">
        <div className="container text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black">Need a Machine? Talk to Us!</h2>
          <p className="text-base md:text-lg text-gray-800 mb-6 md:mb-8 max-w-2xl mx-auto">
            Whether you need a brand new copier, a refurbished machine, or expert service, we have you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/919092592925?text=Hi, I'm interested in your machines"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto bg-white text-green-700 hover:bg-gray-100 font-semibold px-8 h-12">
                WhatsApp Us
              </Button>
            </a>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-black text-black hover:bg-black/10 font-semibold px-8 h-12"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;