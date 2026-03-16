import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { categories } from "@/data/products";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "Brand New Machines",
    path: "/category/brand-new-xerox",
    children: categories.slice(0, 3).map((c) => ({ label: c.name, path: `/category/${c.slug}` })),
  },
  {
    label: "Refurbished",
    path: "/category/refurbished-machines",
  },
  { label: "Scanners", path: "/category/document-scanners" },
  { label: "Laptops", path: "/category/laptops" },
  { label: "Services", path: "/services" },
  { label: "Branches", path: "/branches" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-green-800 text-white text-sm">
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a href="tel:+919092592925" className="flex items-center gap-1 hover:text-green-200 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 9092592925</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <Link to="/branches" className="hover:text-green-200 transition-colors">Our Branches</Link>
            <span className="opacity-40">|</span>
            <Link to="/contact" className="hover:text-green-200 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 font-bold text-xl shrink-0">
            <img src={logo} alt="Aram Xerox Logo" className="h-14 w-auto object-contain" />
            <span className="font-bold text-xl text-gradient">Xerox</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {navLinks.map((l) => (
              <div key={l.path} className="relative">
                {l.children ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === l.label ? null : l.label)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700 ${
                      location.pathname.startsWith(l.path) ? "bg-green-50 text-green-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {l.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === l.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    to={l.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700 ${
                      location.pathname === l.path ? "bg-green-50 text-green-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                )}

                {/* Dropdown */}
                {l.children && activeDropdown === l.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-green-100 py-2 z-50">
                    {l.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-green-50 text-gray-600 hover:text-green-700 transition-colors"
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
          <div className="border-t border-green-100 bg-green-50/50">
            <div className="container py-3">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search machines, printers, scanners..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-green-100 bg-white animate-fade-up">
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <div key={l.path}>
                  <Link
                    to={l.path}
                    onClick={() => !l.children && setOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-green-50 ${
                      location.pathname === l.path ? "bg-green-50 text-green-700" : "text-gray-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                  {l.children && (
                    <div className="ml-4 border-l-2 border-green-100">
                      {l.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
