import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Watch, Heart, Zap, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import smartwatchImage from "@/assets/product-smartwatch.jpg";

const Product2 = () => {
  const handleCheckout = () => {
    toast.success("Redirigiendo al proceso de pago...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
        
        <Card className="max-w-4xl mx-auto overflow-hidden border-2 shadow-[var(--shadow-elegant)]">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-accent/20 p-12 flex items-center justify-center">
                <img 
                  src={smartwatchImage} 
                  alt="Smartwatch Premium"
                  className="w-full max-w-md object-cover rounded-xl shadow-[var(--shadow-glow)]"
                />
              </div>
              
              <div className="p-8 md:p-12 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Smartwatch Premium
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Tecnología avanzada en tu muñeca
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Watch className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Pantalla AMOLED</h3>
                      <p className="text-sm text-muted-foreground">Display vibrante de alta resolución</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Monitor de Salud</h3>
                      <p className="text-sm text-muted-foreground">Seguimiento de ritmo cardíaco y sueño</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Batería de larga duración</h3>
                      <p className="text-sm text-muted-foreground">Hasta 7 días de autonomía</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Conectividad total</h3>
                      <p className="text-sm text-muted-foreground">Notificaciones y llamadas desde tu muñeca</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                      $399
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      $499
                    </span>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    size="lg"
                    className="w-full bg-foreground hover:bg-primary text-background font-semibold py-6 text-lg shadow-lg hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all duration-300"
                  >
                    Comprar Ahora
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Product2;
