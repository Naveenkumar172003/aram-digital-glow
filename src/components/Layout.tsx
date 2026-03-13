import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* SVG shapes representing printing / document world */
const BG_ICONS = [
  // Document page
  { shape: "doc", x: "5%",  y: "12%", size: 48, delay: "0s",    dur: "8s",  anim: "float" },
  { shape: "doc", x: "88%", y: "22%", size: 36, delay: "1.5s",  dur: "10s", anim: "float-reverse" },
  { shape: "doc", x: "42%", y: "78%", size: 44, delay: "3s",    dur: "9s",  anim: "float" },
  { shape: "doc", x: "72%", y: "65%", size: 32, delay: "5s",    dur: "11s", anim: "float-reverse" },
  // Printer
  { shape: "printer", x: "18%", y: "40%", size: 52, delay: "2s",   dur: "12s", anim: "drift" },
  { shape: "printer", x: "80%", y: "55%", size: 40, delay: "4s",   dur: "14s", anim: "drift" },
  { shape: "printer", x: "60%", y: "15%", size: 38, delay: "0.5s", dur: "10s", anim: "float" },
  // Ink drop / circle
  { shape: "ink", x: "28%", y: "70%", size: 30, delay: "3.5s", dur: "7s",  anim: "float-reverse" },
  { shape: "ink", x: "92%", y: "80%", size: 22, delay: "1s",   dur: "9s",  anim: "float" },
  { shape: "ink", x: "50%", y: "48%", size: 26, delay: "6s",   dur: "13s", anim: "drift" },
  // Scan lines / rectangle
  { shape: "scan", x: "8%",  y: "60%", size: 50, delay: "2.5s", dur: "11s", anim: "float" },
  { shape: "scan", x: "65%", y: "90%", size: 38, delay: "4.5s", dur: "8s",  anim: "drift" },
  // Spiral / gear
  { shape: "gear", x: "35%", y: "25%", size: 44, delay: "1s",   dur: "20s", anim: "spin-slow" },
  { shape: "gear", x: "76%", y: "42%", size: 32, delay: "7s",   dur: "20s", anim: "spin-slow" },
];

function BgIcon({ shape, x, y, size, delay, dur, anim }: typeof BG_ICONS[0]) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    opacity: 0.08,
    animation: `${anim} ${dur} ${delay} ease-in-out infinite`,
    pointerEvents: "none",
    color: "hsl(206 37% 33%)",
    filter: "blur(0.5px)",
  };

  if (shape === "doc") return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="16" y2="17"/>
      <line x1="8" y1="9" x2="10" y2="9"/>
    </svg>
  );

  if (shape === "printer") return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  );

  if (shape === "ink") return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
    </svg>
  );

  if (shape === "scan") return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
    </svg>
  );

  // gear / spiral binding
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
    </svg>
  );
}

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    {/* Animated background layer */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {BG_ICONS.map((icon, i) => (
        <BgIcon key={i} {...icon} />
      ))}
    </div>
    <Navbar />
    <main className="flex-1 relative z-10">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
