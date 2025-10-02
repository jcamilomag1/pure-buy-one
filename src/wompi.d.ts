// src/wompi.d.ts
declare global {
  interface Window {
    WompiCheckout: new (options: any) => {
      open: (callback: (result: any) => void) => void;
    };
  }
}
export {};
