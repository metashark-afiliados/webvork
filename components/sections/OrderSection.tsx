// src/components/sections/OrderSection.tsx
/**
 * @file OrderSection.tsx
 * @description Sección dedicada a la conversión. Refactorizada para orquestar
 *              los componentes atómicos PriceDisplay y OrderForm.
 * @version 2.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { OrderForm } from "@/components/ui/OrderForm";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface OrderSectionProps {
  content: Dictionary["orderForm"];
  locale: string;
}

/**
 * @component OrderSection
 * @description Renderiza la sección de pedido, componiendo la visualización
 *              de precios y el formulario de pedido como elementos separados.
 * @param {OrderSectionProps} props Las propiedades con el contenido.
 * @returns {React.ReactElement | null} El elemento JSX de la sección.
 */
export function OrderSection({
  content,
  locale,
}: OrderSectionProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando OrderSection (Orquestador)");

  if (!content) return null;

  return (
    <section id="order-form" className="py-16 sm:py-24 bg-secondary/20">
      <Container className="max-w-md">
        <div className="rounded-lg border border-white/20 bg-black/30 p-6 shadow-2xl backdrop-blur-md">
          {/* 
            Paso 1: Renderiza el componente de precios, pasándole solo las props que necesita.
          */}
          <PriceDisplay
            originalPrice={content.originalPrice}
            discountedPrice={content.discountedPrice}
            locale={locale}
            originalPriceLabel={content.originalPriceLabel}
            discountedPriceLabel={content.discountedPriceLabel}
          />

          {/* 
            Paso 2: Renderiza el formulario, pasándole las props restantes.
            Esto completa el patrón de composición.
          */}
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
// src/components/sections/OrderSection.tsx
