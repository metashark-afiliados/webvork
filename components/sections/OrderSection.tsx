// components/sections/OrderSection.tsx
/**
 * @file OrderSection.tsx
 * @description Sección dedicada a la conversión.
 *              - v3.0.0: Rutas y claves de contenido corregidas.
 *              - v3.1.0 (Resilience): La prop `content` ahora es opcional.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { OrderForm } from "@/components/forms/OrderForm";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";

interface OrderSectionProps {
  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  content?: Dictionary["orderSection"];
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---
  locale: string;
}

export function OrderSection({
  content,
  locale,
}: OrderSectionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando OrderSection");

  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  if (!content) {
    logger.warn(
      "[OrderSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---

  return (
    <section id="order-form" className="py-16 sm:py-24 bg-secondary/20">
      <Container className="max-w-md">
        <div className="rounded-lg border border-white/20 bg-black/30 p-6 shadow-2xl backdrop-blur-md">
          <PriceDisplay
            originalPrice={content.originalPrice}
            discountedPrice={content.discountedPrice}
            locale={locale}
            originalPriceLabel={content.originalPriceLabel}
            discountedPriceLabel={content.discountedPriceLabel}
          />
          <OrderForm
            nameInputLabel={content.nameInputLabel}
            nameInputPlaceholder={content.nameInputPlaceholder}
            phoneInputLabel={content.phoneInputLabel}
            phoneInputPlaceholder={content.phoneInputPlaceholder}
            submitButtonText={content.submitButtonText}
            submitButtonLoadingText={content.submitButtonLoadingText}
          />
        </div>
      </Container>
    </section>
  );
}
// components/sections/OrderSection.tsx
