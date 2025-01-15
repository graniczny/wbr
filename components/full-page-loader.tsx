import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-lg font-semibold text-primary">
          Give it a moment...
        </p>
      </div>
    </div>
  );
}
