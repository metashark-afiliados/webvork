// components/layout/LanguageSwitcher.tsx
/**
 * @file LanguageSwitcher.tsx
 * @description Componente de UI para cambiar el idioma, con banderas y texto refinado.
 *              v4.1.0 (Type Assertion Fix): Resuelve el error de tipo TS2322
 *              mediante una aserción de tipo segura, garantizando que el `locale`
 *              pasado a FlagIcon sea del tipo `Locale`.
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  supportedLocales: readonly string[];
}

export function LanguageSwitcher({
  currentLocale,
  supportedLocales,
}: LanguageSwitcherProps): React.ReactElement {
  logger.info("[LanguageSwitcher] Renderizando (v4.1 - Type Assertion Fix)");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setIsOpen(false);
    },
    [pathname, searchParams, router]
  );

  const getShortLocale = (locale: Locale) => locale.split("-")[0].toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FlagIcon locale={currentLocale} className="w-5 h-5 rounded-sm" />
        <span className="text-sm font-semibold">
          {getShortLocale(currentLocale)}
        </span>
        <DynamicIcon
          name="ChevronDown"
          size={16}
          className={cn(
            "transition-transform duration-200 text-muted-foreground",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-2xl ring-1 ring-white/10 focus:outline-none animate-in fade-in-0 zoom-in-95">
          {supportedLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 text-sm text-left transition-colors",
                currentLocale === locale
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {/* --- [INICIO DE CORRECCIÓN DE TIPO] --- */}
              <FlagIcon
                locale={locale as Locale}
                className="w-5 h-5 rounded-sm"
              />
              {/* --- [FIN DE CORRECCIÓN DE TIPO] --- */}
              <span>{locale.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// components/layout/LanguageSwitcher.tsx
