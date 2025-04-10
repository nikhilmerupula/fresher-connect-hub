
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-muted py-8 mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">FreshersHub</h3>
            <p className="text-sm text-muted-foreground">
              Connect anonymously with seniors, professors, and alumni for guidance and support.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link to="/questions" className="text-muted-foreground hover:text-primary transition-colors">Questions</Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/questions/academics" className="text-muted-foreground hover:text-primary transition-colors">#Academics</Link>
              </li>
              <li>
                <Link to="/questions/internships" className="text-muted-foreground hover:text-primary transition-colors">#Internships</Link>
              </li>
              <li>
                <Link to="/questions/campus" className="text-muted-foreground hover:text-primary transition-colors">#CampusLife</Link>
              </li>
              <li>
                <Link to="/questions/career" className="text-muted-foreground hover:text-primary transition-colors">#Career</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FreshersHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
