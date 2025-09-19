// RUTA: components/layout/Header.tsx

/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal.
 *              v24.4.0 (Module Resolution Fix): Corrige la ruta de importación de
 *              ToggleTheme para alinearse explícitamente con la convención de
 *              nomenclatura PascalCase.tsx, resolviendo errores de build.
 *              Esta versión consolida todas las refactorizaciones de élite.
 * @version 24.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { Separator } from "@/components/ui/Separator";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { NavLink } from "@/lib/schemas/components/header.schema";
import { type Locale } from "@/lib/i18n.config";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartTrigger } from "./CartTrigger";
import { CartSheet } from "./CartSheet";

interface HeaderProps {
  content: NonNullable<Dictionary["header"]>;
  devDictionary?: Dictionary["devRouteMenu"];
  toggleThemeContent: NonNullable<Dictionary["toggleTheme"]>;
  languageSwitcherContent: NonNullable<Dictionary["languageSwitcher"]>;
  cartContent: NonNullable<Dictionary["cart"]>;
  currentLocale: Locale;
  supportedLocales: readonly string[];
}

export default function Header({
  content,
  devDictionary,
  toggleThemeContent,
  languageSwitcherContent,
  cartContent,
  currentLocale,
  supportedLocales,
}: HeaderProps): React.ReactElement | null {
  logger.info("[Header] Renderizando v24.4 (Module Resolution Fix)");

  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!content) {
    logger.warn(
      "[Header] No se proporcionó contenido. El header no se renderizará."
    );
    return null;
  }

  const { logoUrl, logoAlt, navLinks } = content;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-sm md:px-6 border-b border-border">
        <Link href={`/${currentLocale}`} className="mr-6 flex items-center">
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={150}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((route: NavLink) => (
            <Link
              key={route.href}
              href={route.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ToggleTheme content={toggleThemeContent} />
          <LanguageSwitcher
            currentLocale={currentLocale}
            supportedLocales={supportedLocales}
            content={languageSwitcherContent}
          />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <CartTrigger
            onClick={() => setIsCartOpen(true)}
            content={cartContent}
          />
          {process.env.NODE_ENV === "development" && devDictionary && (
            <DevToolsDropdown dictionary={devDictionary} />
          )}
        </div>
      </header>

      <CartSheet
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        content={cartContent}
        locale={currentLocale}
      />
    </>
  );
}
