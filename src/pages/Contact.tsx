import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionTitle from "@/components/SectionTitle";
import { useToast } from "@/hooks/use-toast";

const branches = [
  { name: "Theni", address: "Old Bus Stand Opposite , Theni, Tamil Nadu", phone: "+91 9092592925", mapQuery: "Theni+Tamil+Nadu" },
  { name: "Bodinayakanur (Bodi)", address: "P.H. Road, Bodinayakanur, Tamil Nadu", phone: "+91 9092425263", mapQuery: "Bodinayakanur+Tamil+Nadu" },
  { name: "Periyakulam", address: "Moondranthal, Periyakulam, Tamil Nadu", phone: "+91 9087777175", mapQuery: "Periyakulam+Tamil+Nadu" },
  { name: "Chinnamanur", address: "Temple Road, Chinnamanur, Tamil Nadu", phone: "+91 9543951545", mapQuery: "Chinnamanur+Tamil+Nadu" },
];

type FormState = { name: string; email: string; message: string };
const emptyForm = (): FormState => ({ name: "", email: "", message: "" });

const BranchContactCard = ({ branch }: { branch: typeof branches[0] }) => {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: `Message sent to ${branch.name}!`, description: "We'll get back to you soon." });
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
            src={`https://www.google.com/maps?q=${branch.mapQuery}&output=embed`}
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
              <label className="text-xs font-medium mb-1 block">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" required />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={3} required />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="py-20">
    <div className="container">
      <SectionTitle title="Contact Us" subtitle="Reach out to any of our four branches" />

      {/* Four branch containers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {branches.map((b) => (
          <BranchContactCard key={b.name} branch={b} />
        ))}
      </div>
    </div>
  </div>
);

export default Contact;

