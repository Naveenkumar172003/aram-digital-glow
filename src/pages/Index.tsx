import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { categories, featuredProducts } from "@/data/products";
import { branches } from "@/data/branches";

const features = [
  { icon: Wrench, title: "Expert Service", desc: "Certified technicians for all machine repairs" },
  { icon: Shield, title: "Genuine Parts", desc: "Original spare parts and toner cartridges" },
  { icon: Headphones, title: "24/7 Support", desc: "Always available for your service needs" },
];

const Index = () => (
  <div>
    {/* Hero Carousel */}
    <HeroCarousel />

    {/* Features strip */}
    <section className="bg-green-600 text-white">
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-white/80">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Product Categories */}
    <section className="py-16 bg-gray-50">
      <div className="container">
        <SectionTitle title="Our Product Categories" subtitle="Browse our complete range of machines and equipment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Best Selling Products */}
    <section className="py-16">
      <div className="container">
        <SectionTitle title="Best Selling Products" subtitle="Our most popular machines and equipment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/category/brand-new-xerox">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Branches */}
    <section className="py-16 bg-gray-50">
      <div className="container">
        <SectionTitle title="Our Branches" subtitle="Visit any of our branches across Tamil Nadu" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((b, i) => (
            <Link
              key={b.slug}
              to={`/branches/${b.slug}`}
              className="card-hover relative aspect-[4/3] rounded-xl overflow-hidden animate-fade-up group block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img src={b.image} alt={b.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                <h3 className="font-bold text-xl text-white drop-shadow">{b.name}</h3>
                <p className="text-white/70 text-sm mt-1">{b.shortAddress}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-16 bg-green-700 text-white">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Machine? Talk to Us!</h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Whether you need a brand new copier, a refurbished machine, or expert service — we've got you covered.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/919092592925?text=Hi, I'm interested in your machines"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 h-12">
              WhatsApp Us
            </Button>
          </a>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 h-12">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
