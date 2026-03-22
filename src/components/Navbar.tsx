import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Brand New Machines", path: "/category/brand-new-xerox" },
  { label: "Refurbished Machines", path: "/category/refurbished-machines" },
  { label: "Printers", path: "/category/printers" },
  { label: "Laptops", path: "/category/laptops" },
  { label: "Spare Parts & Toners", path: "/category/spare-parts" },
  { label: "Services", path: "/services" },
  { label: "Branches", path: "/branches" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`z-50 ${
        isHome
          ? "fixed top-0 left-0 right-0 bg-transparent border-transparent shadow-none"
          : "sticky top-0 bg-white border-b border-green-100 shadow-sm"
      }`}
    >
        <div className="container flex h-20 items-center justify-between px-0">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 mr-4 pl-0 lg:pl-0" style={{marginLeft: 0}}>
            <Link to="/" className="flex items-center gap-0 font-bold text-xl shrink-0 mt-0">
              <img src={logo} alt="Aram Xerox Logo" className="h-16 w-auto object-contain ml-0" />
              <div className="flex flex-col leading-tight ml-1">
                <span className={`font-bold text-xl ${isHome ? "text-white" : "text-gradient"}`}>Xerox</span>
                <span className={`text-xs ${isHome ? "text-white/70" : "text-gray-500"}`}>since 2010</span>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <div key={l.path} className="relative">
                <Link
                  to={l.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isHome
                      ? "hover:bg-white/15 hover:text-white"
                      : "hover:bg-green-50 hover:text-green-700"
                  } ${
                    location.pathname === l.path
                      ? isHome
                        ? "bg-white/20 text-white font-semibold"
                        : "bg-green-50 text-green-700 font-semibold"
                      : isHome
                        ? "text-white/95"
                        : "text-gray-700"
                  }`}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-colors ${
                isHome ? "hover:bg-white/15 text-white" : "hover:bg-green-50 text-gray-600 hover:text-green-700"
              }`}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className={`${isHome ? "border-t border-white/20 bg-black/35 backdrop-blur-sm" : "border-t border-green-100 bg-green-50/50"}`}>
            <div className="container py-3">
              <div className="relative max-w-xl mx-auto">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isHome ? "text-white/70" : "text-gray-400"}`} />
                <input
                  type="text"
                  placeholder="Search machines, printers, laptops..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isHome
                      ? "border border-white/30 bg-white/10 text-white placeholder:text-white/70"
                      : "border border-green-200"
                  }`}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div className={`lg:hidden animate-fade-up ${isHome ? "border-t border-white/20 bg-black/70 backdrop-blur-md" : "border-t border-green-100 bg-white"}`}>
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <div key={l.path}>
                  <Link
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isHome ? "hover:bg-white/15" : "hover:bg-green-50"
                    } ${
                      location.pathname === l.path
                        ? isHome
                          ? "bg-white/20 text-white"
                          : "bg-green-50 text-green-700"
                        : isHome
                          ? "text-white"
                          : "text-gray-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
