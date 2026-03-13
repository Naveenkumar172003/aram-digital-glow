import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { branches } from "@/data/branches";
import styles from "@/components/BranchCard.module.css";

const Branches = () => (
  <div className="py-20 relative">
    <div className="container">
      <SectionTitle title="Our Branches" subtitle="Visit any of our 4 branches across Tamil Nadu" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {branches.map((b, i) => (
          <div
            key={b.name}
            className={styles["glass-card"] + " relative overflow-hidden animate-fade-up"}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <img
              src={b.image}
              alt={b.name}
              className="card-bg w-full h-48 object-cover"
            />
            <div className="card-content p-6 flex flex-col items-center justify-between h-full">
              <div className="branch-title mb-2" style={{fontSize:'2rem',fontWeight:'700',letterSpacing:'0.02em',color:'#fff',textShadow:'0 2px 8px rgba(0,0,0,0.25)'}}>{b.name}</div>
              <div className="branch-details mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{b.shortAddress}</span>
              </div>
              <div className="branch-details mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                <span>{b.phone}</span>
              </div>
              <Link to={`/branches/${b.slug}`} className={styles["branch-btn"]}>
                <span className="branch-btn px-6 py-2 font-semibold">View Branch Details</span>
              </Link>
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

export default Branches;
