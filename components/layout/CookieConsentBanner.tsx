// RUTA: components/layout/CookieConsentBanner.tsx

/**
 * @file CookieConsentBanner.tsx
 * @description Banner de consentimiento de cookies de élite, con animación y
 *              adherencia a los 5 pilares de calidad.
 * @version 3.0.0 (Holistic Elite Leveling & MEA)
 * @author RaZ Podestá - MetaShark Tech
 * @see Directiva 026: The Elite Apparatus Quality Manifesto
 *
 * @description_extended Este componente de cliente gestiona la visualización del
 *              banner de consentimiento. Se suscribe al hook `useCookieConsent`
 *              para determinar si debe renderizarse. Para cumplir con el pilar de
 *              "Experiencia Adrenalínica" (MEA), utiliza `framer-motion` para
 *              presentarse con una animación de deslizamiento suave desde la parte
 *              inferior de la pantalla, en lugar de una aparición abrupta.
 *              Es completamente data-driven y temable.
 */
"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// Se extrae el tipo del contenido desde la SSoT (Dictionary) para un contrato robusto.
type CookieConsentContent = NonNullable<Dictionary["cookieConsentBanner"]>;

/**
 * @interface CookieConsentBannerProps
 * @description Define el contrato de props para el componente CookieConsentBanner.
 */
interface CookieConsentBannerProps {
  /**
   * @param {CookieConsentContent} content - El objeto de contenido i18n validado,
   *        que contiene todas las cadenas de texto necesarias para la UI del banner.
   */
  content: CookieConsentContent;
}

/**
 * @function CookieConsentBanner
 * @param {CookieConsentBannerProps} props - Las props del componente.
 * @returns {React.ReactElement} El componente JSX del banner de cookies.
 */
export function CookieConsentBanner({
  content,
}: CookieConsentBannerProps): React.ReactElement {
  logger.info(
    "[CookieConsentBanner] Renderizando componente de élite (v3.0 - MEA)."
  );
  const { hasBeenSet, accept, reject } = useCookieConsent();

  const bannerVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {!hasBeenSet && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-cookie-banner/80 backdrop-blur-md border-t border-border shadow-lg"
          role="dialog"
          aria-live="polite"
          aria-label="Banner de consentimiento de cookies"
        >
          <Container className="py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-cookie-banner-foreground/80 text-center sm:text-left">
                {content.message}{" "}
                <Link
                  href={content.policyLinkHref}
                  className="underline hover:text-primary"
                >
                  {content.policyLinkText}
                </Link>
                .
              </p>
              <div className="flex-shrink-0 flex items-center gap-3">
                <Button onClick={reject} variant="secondary" size="sm">
                  {content.rejectButtonText}
                </Button>
                <Button onClick={accept} variant="default" size="sm">
                  {content.acceptButtonText}
                </Button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
