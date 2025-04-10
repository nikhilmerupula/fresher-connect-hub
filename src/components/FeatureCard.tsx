
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export const FeatureCard = ({ icon: Icon, title, description, onClick }: FeatureCardProps) => {
  return (
    <Card 
      className={`
        hover:scale-105 transition-all duration-200 
        shadow-md hover:shadow-lg border-primary/10
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
