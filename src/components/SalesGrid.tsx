import { useState } from "react";
import { CartPanel } from "@/components/CartPanel";
import { ProductCatalog } from "@/components/ProductCatalog";
import { POSHeader } from "@/components/POSHeader";
import { mockProducts } from "@/data/mockProducts";
import { CartItem } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export const SalesGrid = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(current => {
      const existingIndex = current.findIndex(item => item.variantId === newItem.variantId);
      
      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity
        };
        return updated;
      }
      
      return [...current, newItem];
    });

    toast({
      title: "Producto agregado",
      description: `${newItem.productName} (${newItem.model} - ${newItem.color}) agregado a la venta`,
    });
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(variantId);
      return;
    }

    setCartItems(current =>
      current.map(item =>
        item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems(current => current.filter(item => item.variantId !== variantId));
    toast({
      title: "Producto eliminado",
      description: "Producto removido de la venta",
    });
  };

  const handleCheckout = () => {
    // Checkout logic will be handled in CartPanel
  };

  return (
    <div className="min-h-screen bg-background">
      <POSHeader />
      
      <div className="flex h-[calc(100vh-80px)]">
        <CartPanel
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
        
        <ProductCatalog
          products={mockProducts}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};