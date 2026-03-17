import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => (
  <div className="card-hover bg-white rounded-xl border border-gray-100 overflow-hidden group flex flex-col h-full">
    <Link to={`/product/${product.id}`}>
      <div className={`relative overflow-hidden bg-gray-50 ${compact ? "h-44" : "aspect-square"}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
    <div className={`${compact ? "p-3" : "p-4"} flex flex-col flex-1`}>
      <span className="text-xs font-medium text-green-600 uppercase tracking-wide">{product.category}</span>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-semibold text-gray-800 mt-1 text-sm leading-snug hover:text-green-700 transition-colors">{product.name}</h3>
      </Link>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">{product.description}</p>
      <div className={compact ? "mt-2 flex items-center gap-2" : "mt-3 flex items-center gap-2"}>
        <a
          href={`https://wa.me/919092592925?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Enquire Now
        </a>
        <Link
          to={`/product/${product.id}`}
          className="px-3 py-2 rounded-lg border border-green-200 text-green-700 hover:bg-green-50 text-xs font-medium transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
