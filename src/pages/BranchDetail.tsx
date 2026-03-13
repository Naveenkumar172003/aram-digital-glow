import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Copy, Palette, Printer, BookOpen, ScanLine, Image, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { branchBySlug } from "@/data/branches";

const services = [
  { icon: Copy, title: "A4 Xerox", desc: "Fast A4 copies" },
  { icon: FileText, title: "A3 Xerox", desc: "Large format copies" },
  { icon: Palette, title: "Color Printing", desc: "Vivid prints" },
  { icon: Printer, title: "B&W Printing", desc: "Sharp prints" },
  { icon: BookOpen, title: "Spiral Binding", desc: "Professional binding" },
  { icon: ScanLine, title: "Scanning", desc: "Digital scanning" },
  { icon: Image, title: "Photo Printing", desc: "Photo prints" },
];

const BranchDetail = () => {
  const { slug } = useParams();
  const branch = branchBySlug[slug || ""];

  if (!branch) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Branch not found</h2>
        <Link to="/branches"><Button>Back to Branches</Button></Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container">
        <Link to="/branches" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Branches
        </Link>

        <div className="mb-12 rounded-xl border bg-card overflow-hidden card-hover">
          <div className="relative h-56">
            <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
          </div>
          <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Aram Xerox – {branch.name}</h1>
          <div className="flex flex-col sm:flex-row gap-6 text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />{branch.address}</div>
            <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" />{branch.phone}</div>
          </div>
          </div>
        </div>

        <div className="mb-12 rounded-xl overflow-hidden border">
          <iframe
            title={`Map of ${branch.name}`}
            src={`https://www.google.com/maps?q=${branch.mapQuery}&output=embed`}
            className="w-full h-[350px]"
            loading="lazy"
          />
        </div>

        <SectionTitle title="Services Available" subtitle={`Services offered at our ${branch.name} branch`} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.desc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;
