import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Branches", path: "/branches" },
  { label: "Services", path: "/services" },
  { label: "Machine Service", path: "/machine-service" },
  { label: "Machine Sales", path: "/machine-sales" },
  { label: "Laptop Service", path: "/laptop-service" },
  { label: "Laptop Sales", path: "/laptop-sales" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-0 font-bold text-xl">
          <img src={logo} alt="Aram Xerox Logo" className="h-20 w-25 object-cover rounded-full mt-2.5" />
          <span className="font-bold text-xl bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2d9e10, #4ecb1f, #1a7a08)" }}>Xerox</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/20 ${
                location.pathname === l.path ? "bg-white/20 text-white font-semibold" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/20 bg-black/70 backdrop-blur-sm animate-fade-up">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-white/20 ${
                  location.pathname === l.path ? "bg-white/20 text-white" : "text-white/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
