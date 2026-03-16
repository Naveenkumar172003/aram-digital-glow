import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1600&auto=format&fit=crop",
    title: "Brand New Xerox Machines",
    subtitle: "Latest copiers from Canon, Kyocera & Konica Minolta",
    cta: { label: "Shop Now", link: "/category/brand-new-xerox" },
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop",
    title: "Quality Refurbished Machines",
    subtitle: "Fully serviced copiers at unbeatable prices",
    cta: { label: "View Collection", link: "/category/refurbished-machines" },
  },
  {
    image: "https://images.unsplash.com/photo-1572239305927-fc0e37e0de8f?w=1600&auto=format&fit=crop",
    title: "Printers & Scanners",
    subtitle: "Complete range of office printing solutions",
    cta: { label: "Explore", link: "/category/printers" },
  },
  {
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1600&auto=format&fit=crop",
    title: "Laptop Sales & Service",
    subtitle: "New laptops and expert repair services",
    cta: { label: "Learn More", link: "/category/laptops" },
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Slide content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-lg">
                <h2
                  className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.6s ease 0.3s",
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  className="text-lg text-white/85 mb-6"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.6s ease 0.5s",
                  }}
                >
                  {slide.subtitle}
                </p>
                <Link to={slide.cta.link}>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 h-12"
                    style={{
                      opacity: i === current ? 1 : 0,
                      transition: "opacity 0.6s ease 0.7s",
                    }}
                  >
                    {slide.cta.label}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-green-500" : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
