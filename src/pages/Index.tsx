import Header from "@/components/Header";
import ProductCardPreview from "@/components/ProductCardPreview";
import { useProducts } from "@/hooks/useProducts";
import headphonesImage from "@/assets/product-headphones.jpg";
import smartwatchImage from "@/assets/product-smartwatch.jpg";

const Index = () => {
  const { data: products, isLoading, error } = useProducts();

  const productImages: { [key: string]: string } = {
    "AUR-001": headphonesImage,
    "SMW-001": smartwatchImage,
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error al cargar productos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Descubre Nuestra Colección
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Productos premium diseñados para elevar tu estilo de vida
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            Cargando productos...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products?.map((product) => (
              <ProductCardPreview 
                key={product.id} 
                product={product}
                image={productImages[product.reference] || headphonesImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
