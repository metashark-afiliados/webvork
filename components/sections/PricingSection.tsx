// components/sections/PricingSection.tsx
/**
 * @file PricingSection.tsx
 * @description Componente de sección para mostrar planes de precios.
 *              - v1.1.0: Iconografía estandarizada.
 *              - v1.2.0 (Resilience): La prop `content` ahora es opcional.
 * @version 1.2.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { PricingPlan } from "@/lib/schemas/components/pricing-section.schema";

interface PricingSectionProps {
  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  content?: Dictionary["pricingSection"];
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---
  locale: string;
}

export function PricingSection({
  content,
  locale,
}: PricingSectionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando PricingSection");

  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  if (!content) {
    logger.warn(
      "[PricingSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---

  const { eyebrow, title, subtitle, currency, plans } = content;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            {eyebrow}
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan: PricingPlan) => (
            <Card
              key={plan.title}
              className={cn(
                "flex flex-col rounded-3xl p-8 ring-1 ring-muted-foreground/20 xl:p-10",
                {
                  "bg-muted/30 ring-2 ring-primary": plan.isPopular,
                }
              )}
            >
              <CardHeader className="p-0">
                <CardTitle className="text-lg leading-8 text-foreground">
                  {plan.title}
                </CardTitle>
                <CardDescription className="mt-4 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col flex-1">
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    {plan.priceSuffix}
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
                >
                  {plan.benefitList.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
                      <DynamicIcon
                        name="Check"
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-auto w-full"
                  variant={plan.isPopular ? "default" : "secondary"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
// components/sections/PricingSection.tsx
