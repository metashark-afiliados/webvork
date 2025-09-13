// components/sections/OrderSection.tsx
/**
 * @file OrderSection.tsx
 * @description Sección dedicada a la conversión.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { OrderForm } from "@/components/forms/OrderForm"; // RUTA CORREGIDA
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface OrderSectionProps {
  content: Dictionary["orderSection"]; // Clave corregida
  locale: string;
}

export function OrderSection({
  content,
  locale,
}: OrderSectionProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando OrderSection");

  if (!content) return null;

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
