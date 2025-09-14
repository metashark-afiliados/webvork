// components/layout/LanguageSwitcher.tsx
/**
 * @file LanguageSwitcher.tsx
 * @description Componente de UI puro y atómico para cambiar el idioma.
 *              Refactorizado para ser data-driven y completamente reutilizable.
 *              - v2.1.0: Mejora la consistencia del sistema de iconos al reemplazar
 *                las importaciones directas de `Globe` y `ChevronDown` por el
 *                componente `DynamicIcon`.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
// import { Globe, ChevronDown } from "lucide-react"; // <-- ELIMINADO
import DynamicIcon from "@/components/ui/DynamicIcon"; // <-- AÑADIDO: Importación de DynamicIcon
import { type Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  supportedLocales: readonly string[];
}

export function LanguageSwitcher({
  currentLocale,
  supportedLocales,
}: LanguageSwitcherProps): React.ReactElement {
  logger.info(
    "[Observabilidad] Renderizando LanguageSwitcher (Client Component)"
  ); // Observabilidad actualizada
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // El locale es siempre el primer segmento
    const newPath = segments.join("/");
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <DynamicIcon name="Globe" size={18} /> {/* <-- USO DE DYNAMICICON */}
        <span className="text-sm font-medium">
          {currentLocale.toUpperCase()}
        </span>
        <DynamicIcon // <-- USO DE DYNAMICICON
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-2xl ring-1 ring-white/10 focus:outline-none">
          {supportedLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                currentLocale === locale
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
