import Header from "@/components/Header";
import ProductCardPreview from "@/components/ProductCardPreview";
import headphonesImage from "@/assets/product-headphones.jpg";
import smartwatchImage from "@/assets/product-smartwatch.jpg";

const Index = () => {
  const products = [
    {
      id: 1,
      title: "Auriculares Premium",
      description: "Sumérgete en un sonido cristalino con cancelación de ruido activa y hasta 30 horas de batería.",
      price: "$299",
      image: headphonesImage,
    },
    {
      id: 2,
      title: "Smartwatch Premium",
      description: "Tecnología avanzada en tu muñeca con pantalla AMOLED y seguimiento completo de salud.",
      price: "$399",
      image: smartwatchImage,
    },
  ];

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
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCardPreview key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
