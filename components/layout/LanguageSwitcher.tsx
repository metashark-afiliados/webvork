// RUTA: components/layout/LanguageSwitcher.tsx

/**
 * @file LanguageSwitcher.tsx
 * @description Componente de UI de élite para cambiar el idioma del portal.
 *              v5.1.0 (Linter Hygiene Fix): Resuelve errores de ESLint eliminando
 *              importaciones no utilizadas y corrigiendo el array de dependencias
 *              del hook `useCallback`, garantizando la máxima calidad de código.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  supportedLocales: readonly string[];
  content: NonNullable<Dictionary["languageSwitcher"]>;
}

export function LanguageSwitcher({
  currentLocale,
  supportedLocales,
  content,
}: LanguageSwitcherProps): React.ReactElement {
  logger.info("[LanguageSwitcher] Renderizando v5.1 (Linter Hygiene Fix).");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      const segments = pathname.split("/");
      const localeIndex = segments.findIndex((segment) =>
        supportedLocales.includes(segment as Locale)
      );

      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }

      const newPathname = segments.join("/");
      const currentSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      const newUrl = `${newPathname}?${currentSearchParams.toString()}`;

      router.push(newUrl);
    },
    [pathname, searchParams, router, supportedLocales] // <-- DEPENDENCIA CORREGIDA
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={content.ariaLabel}
          className="relative"
        >
          <FlagIcon
            locale={currentLocale}
            className="w-5 h-5 rounded-sm transition-transform duration-300 group-hover:scale-110"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLocales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={cn(
              "flex items-center gap-3 cursor-pointer",
              currentLocale === locale && "bg-muted font-semibold"
            )}
          >
            <FlagIcon
              locale={locale as Locale}
              className="w-5 h-5 rounded-sm"
            />
            <span>
              {content.languages[locale as keyof typeof content.languages]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
