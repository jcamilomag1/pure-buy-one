// src/wompi.d.ts
declare global {
  interface Window {
    WidgetCheckout?: new (options: any) => {
      open: (callback: (result: any) => void) => void;
    };
    WompiCheckout?: new (options: any) => {
      open: (callback: (result: any) => void) => void;
    };
  }
}
export {};
