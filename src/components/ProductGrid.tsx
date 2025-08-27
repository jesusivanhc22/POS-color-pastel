import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, ProductVariant, CartItem } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variantId }));
  };

  const getSelectedVariant = (product: Product): ProductVariant | null => {
    const selectedVariantId = selectedVariants[product.id];
    return product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  };

  const handleAddToCart = (product: Product) => {
    const variant = getSelectedVariant(product);
    if (!variant) return;

    const cartItem: CartItem = {
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      model: variant.model,
      color: variant.color,
      size: variant.size,
      price: variant.price,
      quantity: 1,
      image: product.image
    };

    onAddToCart(cartItem);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const selectedVariant = getSelectedVariant(product);
        
        return (
          <div key={product.id} className="product-card">
            <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>

              <div className="space-y-2">
                <Select
                  value={selectedVariants[product.id] || product.variants[0]?.id}
                  onValueChange={(value) => handleVariantChange(product.id, value)}
                >
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue placeholder="Seleccionar variante" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border shadow-soft">
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm">
                            {variant.model} - {variant.color}
                            {variant.size && ` - ${variant.size}`}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedVariant && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        Stock: {selectedVariant.stock}
                      </Badge>
                      <span className="text-lg font-bold text-primary">
                        ${selectedVariant.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth"
                disabled={!selectedVariant || selectedVariant.stock === 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar al Carrito
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};