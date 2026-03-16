import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/products";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => (
  <Link
    to={`/category/${category.slug}`}
    className="card-hover relative rounded-xl overflow-hidden group animate-fade-up block"
    style={{ animationDelay: `${index * 0.08}s` }}
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={category.image}
        alt={category.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <h3 className="font-bold text-white text-lg drop-shadow">{category.name}</h3>
      <p className="text-white/75 text-sm mt-1">{category.description}</p>
      <div className="mt-3 flex items-center gap-1 text-green-300 text-sm font-medium group-hover:text-green-200 transition-colors">
        Browse Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default CategoryCard;
