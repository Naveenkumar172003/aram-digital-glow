export type BranchService = {
  title: string;
  desc: string;
  icon?: string;
};

export type Branch = {
  name: string;
  slug: string;
  address: string;
  shortAddress: string;
  phone: string;
  mapQuery: string;
  image: string;
  latitude?: number;
  longitude?: number;
  services?: BranchService[];
};

export const branches: Branch[] = [
  {
    name: "Theni",
    slug: "theni",
    address: "Old Bus Stand Opposite, Theni, Tamil Nadu",
    shortAddress: "Main Road, Theni",
    phone: "+91 9092592925",
    mapQuery: "Theni+Tamil+Nadu",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Bodinayakanur (Bodi)",
    slug: "bodinayakanur",
    address: "P.H. Road, Bodinayakanur, Tamil Nadu",
    shortAddress: "Main Street, Bodinayakanur",
    phone: "+91 9092425263",
    mapQuery: "Bodinayakanur+Tamil+Nadu",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Periyakulam",
    slug: "periyakulam",
    address: "Moondranthal, Periyakulam, Tamil Nadu",
    shortAddress: "High Road, Periyakulam",
    phone: "+91 9087777175",
    mapQuery: "Periyakulam+Tamil+Nadu",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Chinnamanur",
    slug: "chinnamanur",
    address: "Temple Road, Chinnamanur, Tamil Nadu",
    shortAddress: "Market Road, Chinnamanur",
    phone: "+91 9543951545",
    mapQuery: "Chinnamanur+Tamil+Nadu",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1600&q=80",
  },
];

export const branchBySlug = Object.fromEntries(
  branches.map((branch) => [branch.slug, branch]),
) as Record<string, Branch>;