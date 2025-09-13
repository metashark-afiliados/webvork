// components/layout/sections/pricing.tsx
/**
 * @file pricing.tsx
 * @description Sección de precios. Totalmente refactorizada para ser un componente
 *              de presentación puro, data-driven, con formato de moneda localizado
 *              y alineado con la arquitectura del proyecto, resolviendo todos los errores de tipo.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Check } from "lucide-react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { PricingPlan } from "@/lib/schemas/components/pricing-section.schema";

interface PricingSectionProps {
  content: Dictionary["pricingSection"];
  locale: string;
}

export const PricingSection = ({
  content,
  locale,
}: PricingSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando PricingSection");

  if (!content) {
    logger.warn(
      "[PricingSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, subtitle, currency, plans } = content;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {eyebrow}
      </h2>

      <h3 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {title}
      </h3>

      <p className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        {subtitle}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map((plan: PricingPlan) => (
          <Card
            key={plan.title}
            className={
              plan.isPopular
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="pb-2">{plan.title}</CardTitle>
              <CardDescription className="pb-4">
                {plan.description}
              </CardDescription>
              <div>
                <span className="text-3xl font-bold">
                  {formatCurrency(plan.price)}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  {plan.priceSuffix}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex">
              <div className="space-y-4">
                {plan.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-primary mr-2" />
                    <h3>{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant={plan.isPopular ? "default" : "secondary"}
                className="w-full"
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
// components/layout/sections/pricing.tsx
