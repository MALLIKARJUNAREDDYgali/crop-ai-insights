
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ResultCard = ({ title, children, className }: ResultCardProps) => {
  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-primary text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
