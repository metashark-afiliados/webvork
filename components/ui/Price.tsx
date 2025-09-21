// RUTA: components/ui/Price.tsx
/**
 * @file Price.tsx
 * @description Componente de UI de élite para la visualización de precios.
 *              Inyectado con MEA (Micro-interacciones y Experiencia Adrenalínica):
 *              implementa una animación de conteo y un efecto de pulso para un
 *              feedback kinestésico superior.
 * @version 2.0.0 (MEA Injected)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { logger } from "@/shared/lib/logging";

interface PriceProps extends React.HTMLAttributes<HTMLParagraphElement> {
  amount: string | number;
  locale: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
  isHighlighted?: boolean;
}

const AnimatedCounter = ({
  value,
  locale,
  currencyCode,
}: {
  value: number;
  locale: string;
  currencyCode: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Animación de resorte para el número
  const springValue = useSpring(isInView ? value : value * 0.9, {
    mass: 0.8,
    stiffness: 100,
    damping: 15,
  });

  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currencyCode,
          currencyDisplay: "narrowSymbol",
        }).format(latest);
      }
    });
    return unsubscribe;
  }, [springValue, locale, currencyCode]);

  return <span ref={ref} />;
};

export function Price({
  amount,
  locale,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
  isHighlighted = false,
  ...props
}: PriceProps): React.ReactElement {
  logger.trace(`[Price] Renderizando v2.0 (MEA) para locale: ${locale}`);

  const numericAmount = Number(amount);

  return (
    <motion.p
      animate={{ scale: isHighlighted ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      suppressHydrationWarning={true}
      className={cn(
        "transition-colors duration-300",
        isHighlighted && "text-accent",
        className
      )}
      {...props}
    >
      <AnimatedCounter
        value={numericAmount}
        locale={locale}
        currencyCode={currencyCode}
      />
      <span className={cn("ml-1 inline", currencyCodeClassName)}>
        {currencyCode}
      </span>
    </motion.p>
  );
}
