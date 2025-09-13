// components/layout/CookieConsentBanner.tsx
/**
 * @file CookieConsentBanner.tsx
 * @description Banner para solicitar el consentimiento de cookies.
 *              - v1.3.0: Refactoriza los alias de importación al patrón robusto
 *                `@/components/...` para garantizar la compatibilidad con el build.
 * @version 1.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";
// --- INICIO DE CORRECCIÓN: Rutas de importación robustas ---
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
// --- FIN DE CORRECCIÓN ---

interface CookieConsentBannerProps {
  message: string;
  acceptButtonText: string;
  rejectButtonText: string;
  policyLinkText: string;
  policyLinkHref: string;
}

export function CookieConsentBanner({
  message,
  acceptButtonText,
  rejectButtonText,
  policyLinkText,
  policyLinkHref,
}: CookieConsentBannerProps): React.ReactElement | null {
  const { hasBeenSet, accept, reject } = useCookieConsent();

  if (hasBeenSet) {
    return null;
  }

  console.log("[Observabilidad] Renderizando CookieConsentBanner");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-white/10 shadow-lg">
      <Container className="py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/80 text-center sm:text-left">
            {message}{" "}
            <Link
              href={policyLinkHref}
              className="underline hover:text-primary"
            >
              {policyLinkText}
            </Link>
            .
          </p>
          <div className="flex-shrink-0 flex items-center gap-3">
            <Button onClick={reject} variant="secondary" size="sm">
              {rejectButtonText}
            </Button>
            <Button onClick={accept} variant="default" size="sm">
              {acceptButtonText}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
