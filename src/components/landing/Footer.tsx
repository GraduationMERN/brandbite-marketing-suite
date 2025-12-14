import { Utensils } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Utensils className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-primary-foreground">
              BrandBite
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Support
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} BrandBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
