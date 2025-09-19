// RUTA: components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal. Orquesta la
 *              navegación, los controles de UI y el acceso al carrito.
 *              v25.0.0 (Holistic Elite Compliance): Versión final auditada para
 *              cumplir con los 6 Pilares de Calidad, incluyendo A11Y y MEA/UX.
 * @version 25.0.0
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
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartTrigger } from "./CartTrigger";
import { CartSheet } from "./CartSheet";
import { routes } from "@/lib/navigation";

interface HeaderProps {
  content: NonNullable<Dictionary["header"]>;
  devDictionary?: Dictionary["devRouteMenu"];
  toggleThemeContent: NonNullable<Dictionary["toggleTheme"]>;
  languageSwitcherContent: NonNullable<Dictionary["languageSwitcher"]>;
  cartContent: NonNullable<Dictionary["cart"]>;
  currentLocale: Locale;
}

export default function Header({
  content,
  devDictionary,
  toggleThemeContent,
  languageSwitcherContent,
  cartContent,
  currentLocale,
}: HeaderProps): React.ReactElement | null {
  logger.info("[Header] Renderizando v25.0 (Holistic Elite Compliance)");

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
        <Link
          href={routes.home.path({ locale: currentLocale })}
          className="mr-6 flex items-center"
          aria-label={logoAlt} // Pilar 6: ARIA label descriptivo para el enlace del logo.
        >
          <Image
            src={logoUrl}
            alt={logoAlt} // Pilar 6: Texto alternativo para la imagen.
            width={150}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <nav
          className="hidden md:flex md:items-center md:gap-6 text-sm font-medium"
          aria-label="Navegación Principal" // Pilar 6: ARIA label para la navegación.
        >
          {navLinks.map((route: NavLink) => (
            <Link
              key={route.href}
              href={`/${currentLocale}${route.href}`.replace("//", "/")}
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
