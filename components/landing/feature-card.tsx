import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group bg-background/60 h-full rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-muted-foreground mt-3 text-sm leading-6">
        {description}
      </p>
    </Card>
  );
}
