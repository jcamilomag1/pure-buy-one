import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import productImage from "@/assets/product-headphones.jpg";

const ProductCard = () => {
  const features = [
    "Cancelación de ruido activa",
    "40 horas de batería",
    "Audio de alta fidelidad",
    "Bluetooth 5.0",
    "Plegable y portátil"
  ];

  const handleCheckout = () => {
    // Aquí iría la lógica de pago
    console.log("Procesando pago...");
  };

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-500">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Imagen del producto */}
        <div className="relative bg-secondary p-12 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--gradient-shine)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={productImage}
            alt="Premium Wireless Headphones"
            className="relative z-10 w-full h-auto max-w-md object-contain transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Detalles del producto */}
        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              SoundMax Pro
            </h1>
            <p className="text-lg text-muted-foreground">
              Auriculares inalámbricos premium con cancelación de ruido
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-foreground">
                <div className="rounded-full bg-primary/10 p-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                $299
              </span>
              <span className="text-xl text-muted-foreground line-through">
                $399
              </span>
            </div>

            <Button 
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-foreground hover:bg-primary text-background font-semibold py-6 text-lg shadow-lg hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all duration-300"
            >
              Comprar Ahora
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Envío gratis • Garantía de 2 años • Devolución en 30 días
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
