import { ShoppingCart, Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface POSHeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export const POSHeader = ({ cartItemCount, onOpenCart }: POSHeaderProps) => {
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
          <Button 
            variant="outline" 
            size="icon"
            className="relative hover:bg-secondary/50 transition-smooth"
            onClick={onOpenCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge 
                variant="default" 
                className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[20px] h-5 flex items-center justify-center text-xs font-bold"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
          
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