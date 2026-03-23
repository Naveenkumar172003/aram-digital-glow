import { useEffect, useRef, useState } from "react";
import { Palette, Printer, BookOpen, ScanLine, Copy, FileText, Image as ImageIcon } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { useFirebaseData } from "@/hooks/useFirebaseData";

interface Service {
  id?: string;
  icon: string;
  title: string;
  desc: string;
  image: string;
}

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    'Printer': Printer,
    'BookOpen': BookOpen,
    'Palette': Palette,
    'ScanLine': ScanLine,
    'Copy': Copy,
    'FileText': FileText,
    'Image': ImageIcon,
  };
  return icons[iconName] || Printer;
};

const Services = () => {
  const { data: firebaseServices, loading, error } = useFirebaseData<Service>({ 
    collectionName: 'services' 
  });

  const [expanded, setExpanded] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('=== Services Component Debug ===');
    console.log('firebaseServices:', firebaseServices);
    console.log('Services length:', firebaseServices.length);
    console.log('Loading:', loading);
    console.log('Error:', error);
    if (firebaseServices.length > 0) {
      console.log('First service:', firebaseServices[0]);
    }
    console.log('================================');
  }, [firebaseServices, loading, error]);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExpanded(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12">
      <div className="container">
        <SectionTitle title="Printing Services" subtitle="Click the card to explore all our services" />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading services: {error}</p>
          </div>
        ) : !firebaseServices || firebaseServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No services added yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden" style={{backgroundColor: 'transparent'}}>
            <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {firebaseServices.map((service, idx) => (
                <div
                  key={service.id || idx}
                  className="h-[200px]"
                  style={{
                    opacity: expanded ? 1 : 0,
                    transform: expanded ? "translateX(0) scale(1)" : "translateX(-260px) scale(0.4)",
                    transition: `opacity 0.55s ease ${idx * 80}ms, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms`,
                    pointerEvents: expanded ? "auto" : "none",
                  }}
                >
                  <ServiceCard 
                    icon={getIcon(service.icon || 'Printer')} 
                    title={service.title} 
                    description={service.desc} 
                    image={service.image} 
                    fullImage 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
