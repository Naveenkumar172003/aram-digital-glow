import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionTitle from "@/components/SectionTitle";
import { useToast } from "@/hooks/use-toast";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { Branch } from "@/data/branches";

const defaultBranches = [
  { name: "Theni", address: "Old Bus Stand Opposite , Theni, Tamil Nadu", phone: "+91 9092592925", mapQuery: "Theni+Tamil+Nadu" },
  { name: "Bodinayakanur (Bodi)", address: "P.H. Road, Bodinayakanur, Tamil Nadu", phone: "+91 9092425263", mapQuery: "Bodinayakanur+Tamil+Nadu" },
  { name: "Periyakulam", address: "Moondranthal, Periyakulam, Tamil Nadu", phone: "+91 9087777175", mapQuery: "Periyakulam+Tamil+Nadu" },
  { name: "Chinnamanur", address: "Temple Road, Chinnamanur, Tamil Nadu", phone: "+91 9543951545", mapQuery: "Chinnamanur+Tamil+Nadu" },
];

type FormState = { name: string; mobile: string; message: string };
const emptyForm = (): FormState => ({ name: "", mobile: "", message: "" });

type BranchContactType = {
  name: string;
  address: string;
  phone: string;
  mapQuery: string;
  latitude?: number;
  longitude?: number;
};

const BranchContactCard = ({ branch }: { branch: BranchContactType }) => {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '916385449637';
    const message = `Branch: ${branch.name}\nName: ${form.name}\nMobile: ${form.mobile}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setForm(emptyForm());
  };

  return (
    <div className="rounded-2xl border bg-card overflow-hidden shadow-sm card-hover">
      {/* Branch header */}
      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">Aram Xerox – {branch.name}</h3>
          <p className="text-white/70 text-xs">{branch.address}</p>
        </div>
        <span className="ml-auto text-white/80 text-sm">{branch.phone}</span>
      </div>

      {/* Map + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Map */}
        <div className="h-[220px] lg:h-auto min-h-[220px]">
          <iframe
            title={`Map of ${branch.name}`}
            src={`https://www.google.com/maps?q=${
              branch.latitude && branch.longitude
                ? `${branch.latitude},${branch.longitude}`
                : branch.mapQuery
            }&output=embed`}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right: Form */}
        <div className="p-4">
          <h4 className="font-semibold text-sm mb-3">Send a Message to {branch.name}</h4>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="text-xs font-medium mb-1 block">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Mobile Number</label>
              <Input type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="Your mobile number" required />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={3} required />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { data: firebaseBranches, loading } = useFirebaseData<Branch>({ collectionName: 'branches' });
  const branchesToDisplay = firebaseBranches && firebaseBranches.length > 0 ? firebaseBranches : defaultBranches;

  return (
    <div className="py-20">
      <div className="container">
        <SectionTitle title="Contact Us" subtitle={loading ? "Loading contact information..." : "Reach out to any of our branches"} />

        {/* Four branch containers */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {branchesToDisplay.map((b) => (
            <BranchContactCard key={b.name} branch={b} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

