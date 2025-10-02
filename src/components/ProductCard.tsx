import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import productImage from "@/assets/product-headphones.jpg";
import smartwatchImage from "@/assets/product-smartwatch.jpg";
import type { Product } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";


interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  
  const features = [
    "Cancelación de ruido activa",
    "40 horas de batería",
    "Audio de alta fidelidad",
    "Bluetooth 5.0",
    "Plegable y portátil"
  ];

  const handleCheckout = async () => {
    setIsProcessingPayment(true);
    toast.loading("Iniciando pasarela de pago...", { id: "payment-toast" });

    try {
      // 1. Llamar a la Edge Function para obtener los datos de la transacción
      const { data, error } = await supabase.functions.invoke('generate-payment-link', {
        body: { productReference: product.reference },
      });

      if (error) throw error;

      // 2. Crear y abrir el widget de Wompi
      const checkout = new window.WompiCheckout({
        currency: 'COP',
        amountInCents: data.amountInCents,
        reference: data.reference,
        publicKey: data.publicKey,
        signature: {
          integrity: data.signature,
        },
        redirectUrl: `${window.location.origin}/transaction-result`,
      });

      toast.dismiss("payment-toast");

      checkout.open((result: any) => {
        // Este callback se ejecuta cuando el usuario cierra el widget o completa el pago.
        // La verificación final se hace vía webhook, esto es solo para feedback inmediato.
        console.log('Resultado del checkout:', result);
        setIsProcessingPayment(false);
      });

    } catch (error: any) {
      console.error('Error al iniciar el pago:', error);
      toast.error("Error al procesar el pago", {
        id: "payment-toast",
        description: error.message,
      });
      setIsProcessingPayment(false);
    }
  };

  // Seleccionar imagen según el producto
  const productImages: { [key: string]: string } = {
    "AUR-001": productImage,
    "SMW-001": smartwatchImage,
  };

  const selectedImage = productImages[product.reference] || productImage;

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-500">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Imagen del producto */}
        <div className="relative bg-secondary p-12 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--gradient-shine)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={selectedImage}
            alt={product.name}
            className="relative z-10 w-full h-auto max-w-md object-contain transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Detalles del producto */}
        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {product.description}
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
                ${product.price}
              </span>
            </div>

            <Button 
              onClick={handleCheckout}
              disabled={isProcessingPayment}
              size="lg"
              className="w-full bg-foreground hover:bg-primary text-background font-semibold py-6 text-lg shadow-lg hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all duration-300"
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Comprar Ahora"
              )}
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
