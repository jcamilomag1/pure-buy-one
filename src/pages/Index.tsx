import ProductCard from "@/components/ProductCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-12 md:py-24">
      <div className="container mx-auto">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Tienda Premium
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre la excelencia en audio con nuestra selección exclusiva
          </p>
        </div>
        
        <ProductCard />
      </div>
    </div>
  );
};

export default Index;
