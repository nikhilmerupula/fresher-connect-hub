
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-16 sm:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-fresher-purple via-fresher-teal to-fresher-orange bg-clip-text text-transparent animate-pulse-slow">
              Anonymous Freshers' Hub
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Connect with seniors, professors, and alumni while maintaining your privacy. 
              Get the guidance you need without revealing your identity.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/questions">Explore Questions</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Abstract shapes for visual interest */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
    </div>
  );
};
