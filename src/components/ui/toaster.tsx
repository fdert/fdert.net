// src/components/ui/toaster.tsx
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      richColors
      closeButton
      position="top-right"
    />
  );
}

// لو كان App.tsx يستورد Default بالغلط، نخليها آمنة:
export default Toaster;
