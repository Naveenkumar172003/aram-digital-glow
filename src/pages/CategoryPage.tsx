import { useParams, Link } from "react-router-dom";
import { ChevronRight, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { Category, Product } from "@/data/products";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories, loading: categoriesLoading } = useFirebaseData<Category>({ collectionName: 'categories' });
  const { data: products, loading: productsLoading } = useFirebaseData<Product>({ collectionName: 'products' });
  
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.categorySlug === slug);
  const hideHeroBanner =
    slug === "brand-new-xerox" ||
    slug === "refurbished-machines" ||
    slug === "printers" ||
    slug === "laptops" ||
    slug === "spare-parts";
  const pageContainerClass = hideHeroBanner ? "container max-w-5xl" : "container";

  if (categoriesLoading || productsLoading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Loading category...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-20 text-center">
        <div className="container">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link to="/" className="text-green-600 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      {slug !== "spare-parts" && (
        <div className="bg-gray-50 border-b">
          <div className={`${pageContainerClass} py-3`}>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-800 font-medium">{category.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Category hero */}
      {!hideHeroBanner && (
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">{category.name}</h1>
              <p className="text-lg text-white/80 mt-2">{category.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Products grid */}
      <section className="py-12">
        <div className={pageContainerClass}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Other categories */}
            <aside className="lg:w-64 shrink-0">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">All Categories</h3>
              <div className="space-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      c.slug === slug
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                    }`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                <h4 className="font-semibold text-green-800 text-sm mb-2">Need Help?</h4>
                <p className="text-xs text-green-700 mb-3">Chat with us on WhatsApp for product enquiries</p>
                <a
                  href="https://wa.me/919092592925"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Now
                </a>
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1 max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">{categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""} found</p>
              </div>
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                  {categoryProducts.map((p) => (
                    <div key={p.id} className="w-full max-w-sm">
                      <ProductCard product={p} compact={hideHeroBanner} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-lg font-medium">No products listed yet</p>
                  <p className="text-sm mt-2">Contact us for availability</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
