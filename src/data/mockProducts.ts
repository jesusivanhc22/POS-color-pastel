import { Product } from "@/types/product";
import { 
  sofaBeige,
  blueShirt, 
  runningShoes,
  laptopBackpack,
  glassTable,
  blueJeans,
  thermalBottle
} from "@/assets/images";

export const mockProducts: Product[] = [
  // Muebles
  {
    id: "sofa-1",
    name: "Sofá Moderno Confort",
    description: "Sofá de 3 plazas con estructura de madera y tapizado en tela de alta calidad",
    category: "furniture",
    image: sofaBeige,
    basePrice: 1200000,
    variants: [
      {
        id: "sofa-1-beige-3p",
        model: "Confort Plus",
        color: "Beige",
        size: "3 Plazas",
        price: 1200000,
        stock: 5
      },
      {
        id: "sofa-1-gris-3p",
        model: "Confort Plus",
        color: "Gris",
        size: "3 Plazas",
        price: 1200000,
        stock: 3
      },
      {
        id: "sofa-1-beige-2p",
        model: "Confort Plus",
        color: "Beige",
        size: "2 Plazas",
        price: 900000,
        stock: 7
      }
    ]
  },
  {
    id: "mesa-1",
    name: "Mesa de Centro Cristal",
    description: "Mesa de centro con superficie de cristal templado y base de acero inoxidable",
    category: "furniture",
    image: glassTable,
    basePrice: 450000,
    variants: [
      {
        id: "mesa-1-rectangular",
        model: "Crystal Modern",
        color: "Transparente",
        size: "Rectangular",
        price: 450000,
        stock: 8
      },
      {
        id: "mesa-1-redonda",
        model: "Crystal Modern",
        color: "Transparente",
        size: "Redonda",
        price: 420000,
        stock: 6
      }
    ]
  },
  
  // Ropa
  {
    id: "camisa-1",
    name: "Camisa Casual Algodón",
    description: "Camisa de manga larga en algodón 100% con corte clásico",
    category: "clothing",
    image: blueShirt,
    basePrice: 45000,
    variants: [
      {
        id: "camisa-1-azul-s",
        model: "Classic Fit",
        color: "Azul",
        size: "S",
        price: 45000,
        stock: 12
      },
      {
        id: "camisa-1-azul-m",
        model: "Classic Fit",
        color: "Azul",
        size: "M",
        price: 45000,
        stock: 15
      },
      {
        id: "camisa-1-azul-l",
        model: "Classic Fit",
        color: "Azul",
        size: "L",
        price: 45000,
        stock: 10
      },
      {
        id: "camisa-1-blanco-m",
        model: "Classic Fit",
        color: "Blanco",
        size: "M",
        price: 45000,
        stock: 8
      },
      {
        id: "camisa-1-blanco-l",
        model: "Classic Fit",
        color: "Blanco",
        size: "L",
        price: 45000,
        stock: 6
      }
    ]
  },
  {
    id: "pantalon-1",
    name: "Pantalón Jean Clásico",
    description: "Pantalón jean de corte recto en denim de alta calidad",
    category: "clothing",
    image: blueJeans,
    basePrice: 65000,
    variants: [
      {
        id: "pantalon-1-azul-30",
        model: "Straight Fit",
        color: "Azul Oscuro",
        size: "30",
        price: 65000,
        stock: 9
      },
      {
        id: "pantalon-1-azul-32",
        model: "Straight Fit",
        color: "Azul Oscuro",
        size: "32",
        price: 65000,
        stock: 14
      },
      {
        id: "pantalon-1-azul-34",
        model: "Straight Fit",
        color: "Azul Oscuro",
        size: "34",
        price: 65000,
        stock: 11
      },
      {
        id: "pantalon-1-negro-32",
        model: "Straight Fit",
        color: "Negro",
        size: "32",
        price: 65000,
        stock: 7
      }
    ]
  },
  
  // Calzado
  {
    id: "zapato-1",
    name: "Zapatos Deportivos Running",
    description: "Zapatos deportivos con tecnología de amortiguación y malla transpirable",
    category: "shoes",
    image: runningShoes,
    basePrice: 120000,
    variants: [
      {
        id: "zapato-1-negro-40",
        model: "Air Comfort",
        color: "Negro",
        size: "40",
        price: 120000,
        stock: 6
      },
      {
        id: "zapato-1-negro-41",
        model: "Air Comfort",
        color: "Negro",
        size: "41",
        price: 120000,
        stock: 8
      },
      {
        id: "zapato-1-negro-42",
        model: "Air Comfort",
        color: "Negro",
        size: "42",
        price: 120000,
        stock: 5
      },
      {
        id: "zapato-1-blanco-41",
        model: "Air Comfort",
        color: "Blanco",
        size: "41",
        price: 120000,
        stock: 4
      },
      {
        id: "zapato-1-azul-40",
        model: "Air Comfort",
        color: "Azul",
        size: "40",
        price: 120000,
        stock: 7
      }
    ]
  },
  
  // Artículos Varios
  {
    id: "mochila-1",
    name: "Mochila Laptop Ejecutiva",
    description: "Mochila con compartimento acolchado para laptop hasta 15.6 pulgadas",
    category: "misc",
    image: laptopBackpack,
    basePrice: 85000,
    variants: [
      {
        id: "mochila-1-negro-std",
        model: "Executive Pro",
        color: "Negro",
        price: 85000,
        stock: 12
      },
      {
        id: "mochila-1-gris-std",
        model: "Executive Pro",
        color: "Gris",
        price: 85000,
        stock: 8
      },
      {
        id: "mochila-1-azul-std",
        model: "Executive Pro",
        color: "Azul Marino",
        price: 85000,
        stock: 6
      }
    ]
  },
  {
    id: "termo-1",
    name: "Termo Acero Inoxidable",
    description: "Termo de acero inoxidable con doble pared y tapa a rosca",
    category: "misc",
    image: thermalBottle,
    basePrice: 35000,
    variants: [
      {
        id: "termo-1-negro-500ml",
        model: "Steel Pro",
        color: "Negro",
        size: "500ml",
        price: 35000,
        stock: 15
      },
      {
        id: "termo-1-plata-500ml",
        model: "Steel Pro",
        color: "Plata",
        size: "500ml",
        price: 35000,
        stock: 12
      },
      {
        id: "termo-1-azul-750ml",
        model: "Steel Pro",
        color: "Azul",
        size: "750ml",
        price: 42000,
        stock: 9
      }
    ]
  }
];