import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  compact?: boolean;
  fullImage?: boolean;
}

const ServiceCard = ({ icon: Icon, title, description, image, compact = false, fullImage = false }: ServiceCardProps) => {
  if (fullImage && image) {
    return (
      <div className="card-hover relative h-full w-full rounded-xl border overflow-hidden text-center">
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
        <div className={`absolute inset-x-0 bottom-0 ${compact ? "p-3" : "p-6"}`}>
          <div className={`mx-auto flex items-center justify-center rounded-full bg-accent ${compact ? "mb-2 h-10 w-10" : "mb-4 h-14 w-14"}`}>
            <Icon className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-primary`} />
          </div>
          <h3 className={`${compact ? "text-base" : "text-lg"} font-semibold text-white drop-shadow`}>{title}</h3>
          {!compact && <p className="mt-2 text-sm text-white/85">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`card-hover rounded-xl border bg-card overflow-hidden text-center ${compact ? "h-full" : ""}`}>
      {image && (
        <div className={`relative w-full overflow-hidden ${compact ? "h-24" : "h-40"}`}>
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}
      <div className={compact ? "p-2.5" : "p-6"}>
        <div className={`mx-auto flex items-center justify-center rounded-full bg-accent ${compact ? "mb-2 h-10 w-10" : "mb-4 h-14 w-14"}`}>
          <Icon className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-primary`} />
        </div>
        <h3 className={`${compact ? "text-base mb-1" : "text-lg mb-2"} font-semibold`}>{title}</h3>
        {!compact && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
