import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { Product } from "@/hooks/useProducts";

interface ProductCardPreviewProps {
  product: Product;
  image: string;
}

const ProductCardPreview = ({ product, image }: ProductCardPreviewProps) => {
  return (
    <Link to={`/producto/${product.reference}`}>
      <Card className="overflow-hidden hover:shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-accent/20">
            <img 
              src={image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
            <div className="pt-2">
              <span className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCardPreview;
