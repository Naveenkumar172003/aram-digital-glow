export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  images?: string[];
  description: string;
  featured?: boolean;
  specs?: ProductSpec[];
};

export type Category = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

export const categories: Category[] = [
  {
    name: "Brand New Xerox Machines",
    slug: "brand-new-xerox",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop",
    description: "Latest xerox and copier machines from top brands",
  },
  {
    name: "Refurbished Machines",
    slug: "refurbished-machines",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    description: "Quality tested refurbished units at great prices",
  },
  {
    name: "Printers",
    slug: "printers",
    image: "https://images.unsplash.com/photo-1572239305927-fc0e37e0de8f?w=600&auto=format&fit=crop",
    description: "Laser and inkjet printers for home and office",
  },
  {
    name: "Document Scanners",
    slug: "document-scanners",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&auto=format&fit=crop",
    description: "High-speed document and book scanners",
  },
  {
    name: "Laptops",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop",
    description: "New and refurbished laptops for every need",
  },
  {
    name: "Spare Parts & Toners",
    slug: "spare-parts",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop",
    description: "Original spare parts and toner cartridges",
  },
];

export const products: Product[] = [
  // Brand New Xerox Machines
  {
    id: "bx-001",
    name: "Canon IR 2006N MFP",
    category: "Brand New Xerox Machines",
    categorySlug: "brand-new-xerox",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop",
    ],
    description: "A3 size, 20 ppm, network ready multifunction copier",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Multifunctional for A3" },
      { label: "Technology", value: "Canon Laser" },
      { label: "Engine Speed", value: "Up to 20 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi" },
      { label: "Warm-up Time", value: "Approx. 21 seconds or less" },
      { label: "Time to First Print", value: "Approx. 9.1 seconds" },
      { label: "Paper Capacity", value: "Up to 330 sheets (250 + 80 bypass)" },
      { label: "Dimensions (W x D x H)", value: "559 x 487 x 452 mm" },
      { label: "Weight", value: "Approx. 25 kg" },
      { label: "Power Consumption", value: "Copy / Print: 1040 W, Standby: 10 W" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  {
    id: "bx-002",
    name: "Canon IR 2206N",
    category: "Brand New Xerox Machines",
    categorySlug: "brand-new-xerox",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop",
    ],
    description: "Compact A3 MFP with Wi-Fi and mobile printing",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Multifunctional for A3" },
      { label: "Technology", value: "Canon Laser" },
      { label: "Engine Speed", value: "Up to 22 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi" },
      { label: "Warm-up Time", value: "Approx. 20 seconds or less" },
      { label: "Time to First Print", value: "Approx. 8.5 seconds" },
      { label: "Connectivity", value: "USB 2.0, Wi-Fi, Network (RJ-45)" },
      { label: "Paper Capacity", value: "Up to 330 sheets" },
      { label: "Dimensions (W x D x H)", value: "559 x 487 x 452 mm" },
      { label: "Weight", value: "Approx. 26 kg" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  {
    id: "bx-003",
    name: "Kyocera ECOSYS M2040dn",
    category: "Brand New Xerox Machines",
    categorySlug: "brand-new-xerox",
    image: "https://images.unsplash.com/photo-1572239305927-fc0e37e0de8f?w=400&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572239305927-fc0e37e0de8f?w=800&auto=format&fit=crop",
    ],
    description: "40 ppm A4 MFP with duplex and network",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Multifunctional for A4" },
      { label: "Technology", value: "KYOCERA ECOSYS, Mono Laser" },
      { label: "Engine Speed", value: "Up to 40 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi, 1200 x 1200 dpi equivalent" },
      { label: "Warm-up Time", value: "Approx. 26 seconds or less" },
      { label: "Time to First Print", value: "Approx. 6.4 seconds" },
      { label: "Duplex", value: "Automatic" },
      { label: "Connectivity", value: "USB 2.0, Gigabit Ethernet" },
      { label: "Dimensions (W x D x H)", value: "417 x 412 x 429 mm" },
      { label: "Weight", value: "Approx. 19 kg" },
      { label: "Power Consumption", value: "Copy / Print: 530 W, Standby: 60 W" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  {
    id: "bx-004",
    name: "Konica Minolta Bizhub 225i",
    category: "Brand New Xerox Machines",
    categorySlug: "brand-new-xerox",
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?w=400&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?w=800&auto=format&fit=crop",
    ],
    description: "A3 monochrome MFP for high-volume offices",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Multifunctional for A3" },
      { label: "Technology", value: "Konica Minolta, Mono Laser" },
      { label: "Engine Speed", value: "Up to 22 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi" },
      { label: "Warm-up Time", value: "Approx. 20 seconds or less" },
      { label: "Time to First Print", value: "Approx. 7.5 seconds" },
      { label: "Paper Capacity", value: "Up to 650 sheets (550 + 100 bypass)" },
      { label: "Dimensions (W x D x H)", value: "585 x 590 x 465 mm" },
      { label: "Weight", value: "Approx. 32 kg" },
      { label: "Power Consumption", value: "Copy / Print: 1200 W, Standby: 55 W" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  // Refurbished Machines
  {
    id: "rf-001",
    name: "Canon IR 2520 (Refurbished)",
    category: "Refurbished Machines",
    categorySlug: "refurbished-machines",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    ],
    description: "Fully serviced A3 copier at affordable price",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Multifunctional for A3" },
      { label: "Technology", value: "Canon Laser" },
      { label: "Engine Speed", value: "Up to 20 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi" },
      { label: "Warm-up Time", value: "Approx. 20 seconds" },
      { label: "Condition", value: "Fully Refurbished, Quality Tested" },
      { label: "Paper Capacity", value: "Up to 580 sheets" },
      { label: "Dimensions (W x D x H)", value: "565 x 560 x 680 mm" },
      { label: "Weight", value: "Approx. 33 kg" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  {
    id: "rf-002",
    name: "Xerox WorkCentre 5335 (Refurbished)",
    category: "Refurbished Machines",
    categorySlug: "refurbished-machines",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop",
    ],
    description: "35 ppm A3 multifunction with scan and fax",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Multifunctional for A3" },
      { label: "Technology", value: "Xerox Laser" },
      { label: "Engine Speed", value: "Up to 35 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi" },
      { label: "Condition", value: "Fully Refurbished, Quality Tested" },
      { label: "Features", value: "Copy, Print, Scan, Fax" },
      { label: "Connectivity", value: "USB, Ethernet" },
      { label: "Weight", value: "Approx. 60 kg" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  {
    id: "rf-003",
    name: "Canon IR 3300 (Refurbished)",
    category: "Refurbished Machines",
    categorySlug: "refurbished-machines",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop",
    description: "High-speed A3 copier for bulk printing needs",
    specs: [
      { label: "Type", value: "Monochrome Copier for A3" },
      { label: "Technology", value: "Canon Laser" },
      { label: "Engine Speed", value: "Up to 33 pages A4 per minute in b/w" },
      { label: "Resolution", value: "600 x 600 dpi" },
      { label: "Condition", value: "Fully Refurbished, Quality Tested" },
      { label: "Paper Capacity", value: "Up to 1,100 sheets" },
      { label: "Weight", value: "Approx. 45 kg" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  // Printers
  {
    id: "pr-001",
    name: "HP LaserJet Pro M404dn",
    category: "Printers",
    categorySlug: "printers",
    image: "https://images.unsplash.com/photo-1572239305927-fc0e37e0de8f?w=400&auto=format&fit=crop",
    description: "Fast mono laser printer with auto-duplex",
    featured: true,
    specs: [
      { label: "Type", value: "Monochrome Laser Printer" },
      { label: "Technology", value: "HP Laser" },
      { label: "Print Speed", value: "Up to 38 pages per minute" },
      { label: "Resolution", value: "1200 x 1200 dpi" },
      { label: "Duplex", value: "Automatic" },
      { label: "Connectivity", value: "USB 2.0, Gigabit Ethernet" },
      { label: "Paper Capacity", value: "350 sheets (250 tray + 100 multipurpose)" },
      { label: "Dimensions (W x D x H)", value: "381 x 359 x 216 mm" },
      { label: "Weight", value: "Approx. 8.6 kg" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  {
    id: "pr-002",
    name: "Epson EcoTank L3250",
    category: "Printers",
    categorySlug: "printers",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&auto=format&fit=crop",
    description: "Ink tank color printer with Wi-Fi",
    featured: true,
    specs: [
      { label: "Type", value: "Colour Multifunctional Inkjet" },
      { label: "Technology", value: "Epson Micro Piezo, Ink Tank" },
      { label: "Print Speed", value: "Up to 33 pages per minute (draft b/w)" },
      { label: "Resolution", value: "5760 x 1440 dpi" },
      { label: "Connectivity", value: "USB, Wi-Fi, Wi-Fi Direct" },
      { label: "Functions", value: "Print, Scan, Copy" },
      { label: "Paper Capacity", value: "100 sheets" },
      { label: "Dimensions (W x D x H)", value: "375 x 347 x 179 mm" },
      { label: "Weight", value: "Approx. 4.3 kg" },
      { label: "Power Source", value: "AC 220 – 240 V, 50/60 Hz" },
    ],
  },
  // Document Scanners
  {
    id: "sc-001",
    name: "Canon DR-C225 II Scanner",
    category: "Document Scanners",
    categorySlug: "document-scanners",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&auto=format&fit=crop",
    description: "Compact desktop document scanner, 25 ppm",
    specs: [
      { label: "Type", value: "Desktop Document Scanner" },
      { label: "Scanning Speed", value: "25 ppm / 50 ipm (Colour, 200 dpi)" },
      { label: "Resolution", value: "Up to 600 dpi optical" },
      { label: "ADF Capacity", value: "30 sheets" },
      { label: "Daily Duty Cycle", value: "1,500 scans" },
      { label: "Connectivity", value: "USB 2.0" },
      { label: "Dimensions (W x D x H)", value: "300 x 221 x 349 mm" },
      { label: "Weight", value: "Approx. 2.8 kg" },
    ],
  },
  {
    id: "sc-002",
    name: "Epson DS-530 II Scanner",
    category: "Document Scanners",
    categorySlug: "document-scanners",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&auto=format&fit=crop",
    description: "High-speed duplex document scanner",
    specs: [
      { label: "Type", value: "Sheet-feed Document Scanner" },
      { label: "Scanning Speed", value: "35 ppm / 70 ipm (Colour, 300 dpi)" },
      { label: "Resolution", value: "Up to 600 dpi optical" },
      { label: "ADF Capacity", value: "50 sheets" },
      { label: "Duplex Scanning", value: "Single-pass duplex" },
      { label: "Daily Duty Cycle", value: "4,000 scans" },
      { label: "Connectivity", value: "USB 3.0" },
      { label: "Dimensions (W x D x H)", value: "296 x 169 x 176 mm" },
      { label: "Weight", value: "Approx. 3.7 kg" },
    ],
  },
  // Laptops
  {
    id: "lp-001",
    name: "HP 15s Laptop",
    category: "Laptops",
    categorySlug: "laptops",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&auto=format&fit=crop",
    description: "Intel i5, 8GB RAM, 512GB SSD",
    specs: [
      { label: "Processor", value: "Intel Core i5-1235U (12th Gen)" },
      { label: "RAM", value: "8 GB DDR4" },
      { label: "Storage", value: "512 GB SSD" },
      { label: "Display", value: '15.6" Full HD (1920 x 1080) IPS' },
      { label: "Graphics", value: "Intel Iris Xe" },
      { label: "Operating System", value: "Windows 11 Home" },
      { label: "Battery", value: "Up to 8 hours" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.2" },
      { label: "Weight", value: "Approx. 1.69 kg" },
    ],
  },
  {
    id: "lp-002",
    name: "Lenovo IdeaPad 3",
    category: "Laptops",
    categorySlug: "laptops",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&auto=format&fit=crop",
    description: "Ryzen 5, 8GB RAM, 256GB SSD",
    specs: [
      { label: "Processor", value: "AMD Ryzen 5 5500U" },
      { label: "RAM", value: "8 GB DDR4" },
      { label: "Storage", value: "256 GB SSD" },
      { label: "Display", value: '15.6" Full HD (1920 x 1080) TN' },
      { label: "Graphics", value: "AMD Radeon Graphics" },
      { label: "Operating System", value: "Windows 11 Home" },
      { label: "Battery", value: "Up to 7.5 hours" },
      { label: "Connectivity", value: "Wi-Fi 5, Bluetooth 5.0" },
      { label: "Weight", value: "Approx. 1.65 kg" },
    ],
  },
  // Spare Parts
  {
    id: "sp-001",
    name: "Canon NPG-59 Toner",
    category: "Spare Parts & Toners",
    categorySlug: "spare-parts",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop",
    description: "Original toner for Canon IR 2002/2202 series",
    specs: [
      { label: "Type", value: "Original Toner Cartridge" },
      { label: "Colour", value: "Black" },
      { label: "Compatible Models", value: "Canon IR 2002, IR 2002N, IR 2202, IR 2202N" },
      { label: "Page Yield", value: "Approx. 10,000 pages (A4, 5% coverage)" },
      { label: "Weight", value: "Approx. 0.5 kg" },
    ],
  },
  {
    id: "sp-002",
    name: "Kyocera TK-1178 Toner",
    category: "Spare Parts & Toners",
    categorySlug: "spare-parts",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop",
    description: "Original toner for Kyocera ECOSYS series",
    specs: [
      { label: "Type", value: "Original Toner Cartridge" },
      { label: "Colour", value: "Black" },
      { label: "Compatible Models", value: "Kyocera ECOSYS M2040dn, M2540dn, M2640idw" },
      { label: "Page Yield", value: "Approx. 7,200 pages (A4, 5% coverage)" },
      { label: "Weight", value: "Approx. 0.4 kg" },
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const productsByCategory = (slug: string) =>
  products.filter((p) => p.categorySlug === slug);

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const productById = (id: string) =>
  products.find((p) => p.id === id);
