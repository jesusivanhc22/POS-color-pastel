import { Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const POSHeader = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            RetailPOS
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar productos..." 
              className="pl-10 w-80 bg-background/50 border-border/50 focus:bg-background transition-smooth"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="hover:bg-accent/50 transition-smooth">
            <User className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="icon" className="hover:bg-muted/50 transition-smooth">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};