// components/layout/CartTrigger.tsx
/**
 * @file CartTrigger.tsx
 * @description Componente de UI que actúa como activador para el panel del
 *              carrito. Muestra el número de ítems y reacciona a los cambios.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui";
import { useCartTotals } from "@/store/useCartStore";

interface CartTriggerProps {
  onClick: () => void;
}

export function CartTrigger({ onClick }: CartTriggerProps) {
  const { cartCount } = useCartTotals();
  const [isAnimating, setIsAnimating] = useState(false);

  // Efecto para disparar la animación cuando cambia el cartCount
  useEffect(() => {
    if (cartCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300); // Duración de la animación
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const scaleAnimation = isAnimating ? 1.2 : 1;

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      aria-label={`Ver carrito, ${cartCount} artículos`}
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
// components/layout/CartTrigger.tsx
