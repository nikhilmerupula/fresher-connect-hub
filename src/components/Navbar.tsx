
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-fresher-purple to-fresher-teal bg-clip-text text-transparent">
            Student Connect
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/questions" className="text-sm font-medium hover:text-primary transition-colors">
            Questions
          </Link>
          <Link to="/resources" className="text-sm font-medium hover:text-primary transition-colors">
            Resources
          </Link>
          <ThemeSwitcher />
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b animate-fade-in bg-background">
          <nav className="container flex flex-col py-4 gap-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/questions" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Questions
            </Link>
            <Link 
              to="/resources" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Button asChild className="m-4 bg-primary hover:bg-primary/90">
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
