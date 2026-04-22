import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Copy, Palette, Printer, BookOpen, ScanLine, Image as ImageIcon, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { Branch, BranchService } from "@/data/branches";

const defaultServices: BranchService[] = [
  { title: "A4 Xerox", desc: "Fast A4 copies" },
  { title: "A3 Xerox", desc: "Large format copies" },
  { title: "Color Printing", desc: "Vivid prints" },
  { title: "B&W Printing", desc: "Sharp prints" },
  { title: "Spiral Binding", desc: "Professional binding" },
  { title: "Scanning", desc: "Digital scanning" },
  { title: "Photo Printing", desc: "Photo prints" },
];

const getServiceIcon = (title: string) => {
  const iconMap: Record<string, any> = {
    'A4 Xerox': Copy,
    'A3 Xerox': Copy,
    'Color Printing': Palette,
    'B&W Printing': Printer,
    'Spiral Binding': BookOpen,
    'Scanning': ScanLine,
    'Photo Printing': ImageIcon,
  };
  return iconMap[title] || Copy;
};

const BranchDetail = () => {
  const { slug } = useParams();
  const { data: branches, loading } = useFirebaseData<Branch>({ collectionName: 'branches' });
  const branch = branches.find((b) => b.slug === slug);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-gray-600">Loading branch...</p>
      </div>
    );
  }

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

        <div className="mb-12 rounded-xl overflow-hidden card-hover relative h-screen max-h-[500px]">
          <img src={branch.image} alt={branch.name} className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Aram Xerox – {branch.name}</h1>
            <div className="flex flex-col sm:flex-row gap-4 text-white">
              <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-accent" />{branch.address}</div>
              <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-accent" />{branch.phone}</div>
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
          {(branch.services || defaultServices).map((s) => (
            <ServiceCard 
              key={s.title} 
              icon={getServiceIcon(s.icon || s.title)} 
              title={s.title} 
              description={s.desc} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;
