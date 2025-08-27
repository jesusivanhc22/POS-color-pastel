import { useState, useMemo } from "react";
import { Product, CartItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryGrid } from "@/components/CategoryGrid";

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
}

export const ProductCatalog = ({ products, onAddToCart }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]?.id || '');
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedVariant) return;

    const variant = selectedProduct.variants.find(v => v.id === selectedVariant);
    if (!variant) return;

    const cartItem: CartItem = {
      variantId: variant.id,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      model: variant.model,
      color: variant.color,
      size: variant.size,
      price: variant.price,
      quantity: 1,
      image: selectedProduct.image
    };

    onAddToCart(cartItem);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(current => current === categoryId ? '' : categoryId);
    setSelectedProduct(null);
    setSelectedVariant('');
  };

  return (
    <div className="flex-1 p-6 bg-background">
      {/* Categories */}
      <div className="mb-6">
        <CategoryGrid 
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Products Grid */}
        <div className="overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {selectedCategory ? 'Productos Filtrados' : 'Todos los Productos'}
              <span className="text-muted-foreground ml-2 text-sm">
                ({filteredProducts.length})
              </span>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedProduct?.id === product.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-soft'
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <CardContent className="p-3">
                  <div className="aspect-square mb-2 rounded-md overflow-hidden bg-muted/30">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-card-foreground mb-1 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.variants.length} variantes
                    </Badge>
                    <span className="text-sm font-bold text-primary">
                      ${product.basePrice.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-card rounded-lg border border-border p-6">
          {selectedProduct ? (
            <div className="space-y-6">
              <div>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted/30">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-card-foreground mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Seleccionar Variante:
                  </label>
                  <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una variante" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProduct.variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>
                              {variant.color}
                              {variant.size && ` - ${variant.size}`}
                            </span>
                            <span className="ml-4 font-medium">
                              ${variant.price.toLocaleString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedVariant && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    {(() => {
                      const variant = selectedProduct.variants.find(v => v.id === selectedVariant);
                      return variant ? (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Modelo:</span>
                            <span className="text-sm font-medium">{variant.model}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Color:</span>
                            <span className="text-sm font-medium">{variant.color}</span>
                          </div>
                          {variant.size && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Talla:</span>
                              <span className="text-sm font-medium">{variant.size}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Stock:</span>
                            <Badge variant={variant.stock > 5 ? "default" : "destructive"}>
                              {variant.stock} unidades
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">Precio:</span>
                            <span className="text-lg font-bold text-primary">
                              ${variant.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}

                <Button 
                  className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                >
                  Agregar a la Venta
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                  <Badge className="h-8 w-8" />
                </div>
                <p className="text-muted-foreground">
                  Selecciona un producto para ver sus detalles
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};