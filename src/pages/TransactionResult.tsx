import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TransactionResult = () => {
  const [searchParams] = useSearchParams();
  const [transactionStatus, setTransactionStatus] = useState<'LOADING' | 'APPROVED' | 'DECLINED' | 'ERROR'>('LOADING');

  useEffect(() => {
    const status = searchParams.get("status");
    
    if (status === 'APPROVED') {
      setTransactionStatus('APPROVED');
    } else if (status === 'DECLINED') {
      setTransactionStatus('DECLINED');
    } else {
      setTransactionStatus('ERROR');
    }
  }, [searchParams]);

  const transactionId = searchParams.get("id");

  // Estado de carga
  if (transactionStatus === 'LOADING') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
                <p className="text-lg text-muted-foreground">
                  Verificando estado...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Estado aprobado
  if (transactionStatus === 'APPROVED') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl text-green-500">
                ¡Pago Aprobado!
              </CardTitle>
              <CardDescription className="text-lg">
                Gracias por tu compra. Tu pago ha sido procesado exitosamente.
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
                  <Button size="lg">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Estado declinado
  if (transactionStatus === 'DECLINED') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <CardTitle className="text-3xl text-red-500">
                Pago Declinado
              </CardTitle>
              <CardDescription className="text-lg">
                Tu pago fue declinado. Por favor intenta nuevamente o contacta a tu banco para más información.
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
                  <Button size="lg">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Estado de error
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <XCircle className="w-16 h-16 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl text-yellow-500">
              Error al Verificar la Transacción
            </CardTitle>
            <CardDescription className="text-lg">
              Hubo un problema al verificar el estado de tu transacción. Por favor contacta a soporte.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center pt-4">
              <Link to="/">
                <Button size="lg">
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
