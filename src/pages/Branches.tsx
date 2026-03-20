import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { Branch } from "@/data/branches";
import styles from "@/components/BranchCard.module.css";

const Branches = () => {
  const { data: branches = [], loading } = useFirebaseData<Branch>({ collectionName: 'branches' });
  
  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Loading branches...</p>
      </div>
    );
  }
  
  return (
  <div className="py-20 relative">
    <div className="container max-w-6xl">
      <SectionTitle title="Our Branches" subtitle="Visit any of our 4 branches across Tamil Nadu" />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-fr gap-8 mt-10">
        {branches.map((b, i) => (
          <div
            key={b.name}
            className={styles["glass-card"] + " relative overflow-hidden animate-fade-up flex flex-col md:flex-row w-full h-full md:h-72"}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative w-full md:w-[40%] h-44 md:h-full shrink-0 overflow-hidden rounded-t-[1.5rem] md:rounded-none md:rounded-l-[1.5rem]">
              <img
                src={b.image}
                alt={b.name}
                className="card-bg w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/95">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-white text-lg font-semibold drop-shadow">{b.name}</div>
              </div>
            </div>
            <div className="card-content p-5 flex flex-col justify-center gap-2.5 md:w-[60%] h-full">
              <div className="branch-details flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{b.shortAddress}</span>
              </div>
              <div className="branch-details flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                <span>{b.phone}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Link to={`/branches/${b.slug}`} className={styles["branch-btn"]}>
                  <span className="branch-btn px-5 py-1.5 font-semibold">View Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Decorative SVGs for uniqueness */}
    <svg className="absolute left-0 top-0 -z-10" width="180" height="180" fill="none" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r="80" fill="#519A66" fillOpacity="0.12" />
    </svg>
    <svg className="absolute right-0 bottom-0 -z-10" width="220" height="220" fill="none" viewBox="0 0 220 220">
      <rect x="30" y="30" width="160" height="160" rx="80" fill="#355872" fillOpacity="0.10" />
    </svg>
  </div>
  );
};

export default Branches;
