// src/components/layout/DevHomepageHeader.tsx
/**
 * @file DevHomepageHeader.tsx
 * @description Header de desarrollo para la página de inicio. Corregido para
 *              pasar la prop 'dictionary' correcta a DevToolsDropdown.
 * @version 6.0.0
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
    <header className="py-3 sticky top-0 z-50 bg-red-900/90 backdrop-blur-lg border-b border-red-700">
      <Container>
        <div className="flex h-16 items-center justify-between gap-8">
          <nav className="flex items-center gap-4">
            <Link
              href={routes.home.path({ locale: currentLocale })}
              className="text-white hover:text-red-300 transition-colors px-3 py-2 rounded-md bg-red-700/50"
            >
              {dictionary.homeLink}
            </Link>
            <Link
              href={routes.about.path({ locale: currentLocale })}
              className="text-white hover:text-red-300 transition-colors px-3 py-2 rounded-md bg-red-700/50"
            >
              {dictionary.aboutLink}
            </Link>
            <Link
              href={routes.store.path({ locale: currentLocale })}
              className="text-white hover:text-red-300 transition-colors px-3 py-2 rounded-md bg-red-700/50"
            >
              {dictionary.storeLink}
            </Link>
            <Link
              href={routes.news.path({ locale: currentLocale })}
              className="text-white hover:text-red-300 transition-colors px-3 py-2 rounded-md bg-red-700/50"
            >
              {dictionary.blogLink}
            </Link>
          </nav>

          <div className="ml-auto">
            {/* <<-- SOLUCIÓN: Se pasa la prop correcta 'dictionary'. */}
            <DevToolsDropdown dictionary={devRouteMenuDictionary} />
          </div>
        </div>
      </Container>
    </header>
  );
}
// src/components/layout/DevHomepageHeader.tsx
