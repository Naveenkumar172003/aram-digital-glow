import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { branches } from "@/data/branches";

const Branches = () => (
  <div className="py-20">
    <div className="container">
      <SectionTitle title="Our Branches" subtitle="Visit any of our locations for quick, reliable service" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((b, i) => (
          <div key={b.name} className="card-hover rounded-xl border bg-card overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="relative h-44 overflow-hidden">
              <img
                src={b.image}
                alt={b.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white font-bold text-lg tracking-wide drop-shadow">
                {b.name}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{b.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-primary shrink-0" />{b.address}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                <Phone className="h-4 w-4 text-primary shrink-0" />{b.phone}
              </p>
              <Link to={`/branches/${b.slug}`}>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Branches;
