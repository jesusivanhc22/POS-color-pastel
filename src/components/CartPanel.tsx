import { useState } from "react";
import { Minus, Plus, ShoppingCart, CreditCard, X, Calculator, Receipt, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/product";

interface CartPanelProps {
  items: CartItem[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
  onCheckout: () => void;
}

export const CartPanel = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartPanelProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('¡Venta completada exitosamente!');
    window.location.reload();
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border bg-primary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Venta Actual</h2>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {itemCount} items
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Vendedor: Admin</span>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay productos</p>
            <p className="text-sm text-muted-foreground">Selecciona productos para el cliente</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.variantId} className="bg-background/50 rounded-lg p-3 border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.model} - {item.color}
                      {item.size && ` - ${item.size}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-destructive hover:bg-destructive/10 flex-shrink-0"
                    onClick={() => onRemoveItem(item.variantId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      ${item.price.toLocaleString()} c/u
                    </p>
                    <p className="text-sm font-bold text-primary">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Impuestos:</span>
                <span>$0</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 mr-1" />
                Desc.
              </Button>
              <Button variant="outline" size="sm">
                <Receipt className="h-4 w-4 mr-1" />
                Nota
              </Button>
            </div>
            
            <Button 
              className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90 transition-smooth"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {isProcessing ? 'Procesando...' : 'Procesar Venta'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};