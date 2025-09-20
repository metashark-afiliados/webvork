// RUTA: components/layout/CartTrigger.tsx
/**
 * @file CartTrigger.tsx
 * @description Componente de UI de élite que actúa como activador para el panel del
 *              carrito. Muestra el número de ítems y reacciona con una animación
 *              de "salto" (MEA/UX) al añadir nuevos productos.
 * @version 2.0.0 (Holistic Elite Leveling & MEA)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { useCartTotals } from "@/shared/store/useCartStore";
import { logger } from "@/shared/lib/logging";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";

type CartContent = NonNullable<Dictionary["cart"]>;

interface CartTriggerProps {
  onClick: () => void;
  content: CartContent;
}

export function CartTrigger({
  onClick,
  content,
}: CartTriggerProps): React.ReactElement {
  logger.info("[CartTrigger] Renderizando v2.0 (Elite & MEA).");
  const { cartCount } = useCartTotals();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const scaleAnimation = isAnimating ? 1.2 : 1;
  const ariaLabel = content.triggerAriaLabel.replace(
    "{{count}}",
    String(cartCount)
  );

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      aria-label={ariaLabel}
      className="relative"
    >
      <DynamicIcon name="ShoppingCart" />
      {cartCount > 0 && (
        <motion.div
          animate={{ scale: scaleAnimation }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold"
        >
          {cartCount}
        </motion.div>
      )}
    </Button>
  );
}
