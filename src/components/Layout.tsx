import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
