interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
    {subtitle && <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
    <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-hero-gradient" />
  </div>
);

export default SectionTitle;
