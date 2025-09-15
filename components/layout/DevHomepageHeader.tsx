// src/components/layout/DevHomepageHeader.tsx
/**
 * @file DevHomepageHeader.tsx
 * @description Header de desarrollo para la página de inicio.
 *              - v7.0.0 (Theming Sovereignty): Refactorizado para usar tokens
 *                de color semánticos (destructive) en lugar de valores fijos,
 *                alineándolo con la arquitectura de theming.
 * @version 7.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { usePathname } from "next/navigation";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { routes } from "@/lib/navigation";
import DevToolsDropdown from "../dev/DevToolsDropdown";

interface DevHomepageHeaderProps {
  dictionary: NonNullable<Dictionary["devHomepageHeader"]>;
  devRouteMenuDictionary: NonNullable<Dictionary["devRouteMenu"]>;
}

export function DevHomepageHeader({
  dictionary,
  devRouteMenuDictionary,
}: DevHomepageHeaderProps): React.ReactElement {
  logger.info("[DevHomepageHeader] Renderizando DevHomepageHeader (DEV-ONLY)");
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);

  return (
    <header className="py-3 sticky top-0 z-50 bg-destructive/90 backdrop-blur-lg border-b border-destructive/50">
      <Container>
        <div className="flex h-16 items-center justify-between gap-8">
          <nav className="flex items-center gap-4">
            <Link
              href={routes.home.path({ locale: currentLocale })}
              className="text-destructive-foreground hover:text-destructive-foreground/80 transition-colors px-3 py-2 rounded-md bg-destructive/50"
            >
              {dictionary.homeLink}
            </Link>
            <Link
              href={routes.about.path({ locale: currentLocale })}
              className="text-destructive-foreground hover:text-destructive-foreground/80 transition-colors px-3 py-2 rounded-md bg-destructive/50"
            >
              {dictionary.aboutLink}
            </Link>
            <Link
              href={routes.store.path({ locale: currentLocale })}
              className="text-destructive-foreground hover:text-destructive-foreground/80 transition-colors px-3 py-2 rounded-md bg-destructive/50"
            >
              {dictionary.storeLink}
            </Link>
            <Link
              href={routes.news.path({ locale: currentLocale })}
              className="text-destructive-foreground hover:text-destructive-foreground/80 transition-colors px-3 py-2 rounded-md bg-destructive/50"
            >
              {dictionary.blogLink}
            </Link>
          </nav>

          <div className="ml-auto">
            <DevToolsDropdown dictionary={devRouteMenuDictionary} />
          </div>
        </div>
      </Container>
    </header>
  );
}
// src/components/layout/DevHomepageHeader.tsx
