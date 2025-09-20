// components/ui/Skeleton.tsx
/**
 * @file Skeleton.tsx
 * @description Componente de UI para mostrar un placeholder de carga.
 * @version 1.0.0
 * @author shadcn/ui
 */
import { cn } from "@/shared/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
// components/ui/Skeleton.tsx
