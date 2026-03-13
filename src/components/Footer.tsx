import { Link } from "react-router-dom";
import { Printer, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 font-bold text-xl mb-4">
          <Printer className="h-6 w-6 text-primary" />
          <span>Aram Xerox</span>
        </div>
        <p className="text-sm opacity-70">
          High quality Xerox, Printing, Machine Service and Laptop Solutions across Tamil Nadu.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Branch Locations</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><MapPin className="inline h-4 w-4 mr-1" />Theni</li>
          <li><MapPin className="inline h-4 w-4 mr-1" />Bodinayakanur</li>
          <li><MapPin className="inline h-4 w-4 mr-1" />Periyakulam</li>
          <li><MapPin className="inline h-4 w-4 mr-1" />Chinnamanur</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
          <li><Link to="/machine-service" className="hover:text-primary transition-colors">Machine Service</Link></li>
          <li><Link to="/laptop-service" className="hover:text-primary transition-colors">Laptop Service</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container py-4 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Aram Xerox. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
