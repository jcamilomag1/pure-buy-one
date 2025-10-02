import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Tienda Premium
          </h1>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-accent"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
