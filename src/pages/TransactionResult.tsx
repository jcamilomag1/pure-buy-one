import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react";

const TransactionResult = () => {
  const [searchParams] = useSearchParams();
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    const status = searchParams.get("status");
    
    setTransactionId(id);
    setTransactionStatus(status);
  }, [searchParams]);

  const getStatusConfig = () => {
    switch (transactionStatus) {
      case "APPROVED":
        return {
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
          title: "¡Pago Aprobado!",
          description: "Tu pago se ha procesado exitosamente.",
          color: "text-green-500"
        };
      case "DECLINED":
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: "Pago Declinado",
          description: "Tu pago fue declinado. Por favor intenta nuevamente.",
          color: "text-red-500"
        };
      default:
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500" />,
          title: "Pago Pendiente",
          description: "El estado de tu pago está pendiente de confirmación.",
          color: "text-yellow-500"
        };
    }
  };

  if (!transactionStatus) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Clock className="w-16 h-16 mx-auto text-muted-foreground animate-pulse" />
                <p className="text-lg text-muted-foreground">
                  Verificando el estado de tu transacción...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              {statusConfig.icon}
            </div>
            <CardTitle className={`text-3xl ${statusConfig.color}`}>
              {statusConfig.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {statusConfig.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {transactionId && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">ID de Transacción</p>
                <p className="font-mono text-sm break-all">{transactionId}</p>
              </div>
            )}
            
            <div className="flex justify-center pt-4">
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionResult;
