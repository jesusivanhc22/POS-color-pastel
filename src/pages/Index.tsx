import { useState, useMemo } from "react";
import { POSHeader } from "@/components/POSHeader";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSidebar } from "@/components/CartSidebar";
import { mockProducts } from "@/data/mockProducts";
import { CartItem } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return mockProducts;
    return mockProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

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
      description: `${newItem.productName} (${newItem.model} - ${newItem.color}) agregado al carrito`,
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
      description: "Producto removido del carrito",
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(current => current === categoryId ? '' : categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      <POSHeader 
        cartItemCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Punto de Venta
          </h2>
          <p className="text-muted-foreground">
            Selecciona una categoría y agrega productos al carrito
          </p>
        </div>

        <CategoryGrid 
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-card-foreground">
            {selectedCategory ? 'Productos Filtrados' : 'Todos los Productos'}
            <span className="text-muted-foreground ml-2">
              ({filteredProducts.length})
            </span>
          </h3>
        </div>

        <ProductGrid 
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
