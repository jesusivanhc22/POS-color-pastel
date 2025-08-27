import { Sofa, Shirt, ShoppingBag, Package } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}

const categories: Category[] = [
  { id: 'furniture', name: 'Muebles', icon: Sofa, color: 'primary', count: 45 },
  { id: 'clothing', name: 'Ropa', icon: Shirt, color: 'secondary', count: 120 },
  { id: 'shoes', name: 'Calzado', icon: ShoppingBag, color: 'accent', count: 80 },
  { id: 'misc', name: 'Artículos Varios', icon: Package, color: 'warning', count: 65 }
];

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory?: string;
}

export const CategoryGrid = ({ onSelectCategory, selectedCategory }: CategoryGridProps) => {
  const getIconClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'category-primary';
      case 'secondary': return 'category-secondary';
      case 'accent': return 'category-accent';
      case 'warning': return 'category-warning';
      default: return 'category-primary';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`category-card ${isSelected ? 'ring-2 ring-primary shadow-primary' : ''}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-3 rounded-full ${getIconClasses(category.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-card-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} productos</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};