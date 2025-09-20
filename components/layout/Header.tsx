// RUTA: components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal.
 *              v25.2.0 (Props Contract Fix): Corrige la interfaz de props
 *              para aceptar `supportedLocales`, resolviendo un error de tipo
 *              crítico TS2322 y restaurando la integridad del build.
 * @version 25.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { Separator } from "@/components/ui/Separator";
import { logger } from "@/shared/lib/logging";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";
import type { NavLink } from "@/shared/lib/schemas/components/header.schema";
import { type Locale } from "@/shared/lib/i18n.config"; // No necesitamos `supportedLocales` aquí
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartTrigger } from "./CartTrigger";
import { CartSheet } from "./CartSheet";
import { routes } from "@/shared/lib/navigation";

interface HeaderProps {
  content: NonNullable<Dictionary["header"]>;
  devDictionary?: Dictionary["devRouteMenu"];
  toggleThemeContent: NonNullable<Dictionary["toggleTheme"]>;
  languageSwitcherContent: NonNullable<Dictionary["languageSwitcher"]>;
  cartContent?: Dictionary["cart"];
  currentLocale: Locale;
  // --- [INICIO DE CORRECCIÓN DE CONTRATO] ---
  supportedLocales: readonly string[]; // Prop añadida para cumplir el contrato
  // --- [FIN DE CORRECCIÓN DE CONTRATO] ---
}

export default function Header({
  content,
  devDictionary,
  toggleThemeContent,
  languageSwitcherContent,
  cartContent,
  currentLocale,
  supportedLocales, // <-- Prop ahora aceptada
}: HeaderProps): React.ReactElement | null {
  logger.info("[Header] Renderizando v25.2 (Props Contract Fix)");

  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!content) {
    logger.warn(
      "[Header] No se proporcionó contenido principal. El header no se renderizará."
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
          aria-label={logoAlt}
        >
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={150}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <nav
          className="hidden md:flex md:items-center md:gap-6 text-sm font-medium"
          aria-label="Navegación Principal"
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
          {cartContent && (
            <>
              <Separator orientation="vertical" className="h-6 mx-2" />
              <CartTrigger
                onClick={() => setIsCartOpen(true)}
                content={cartContent}
              />
            </>
          )}
          {process.env.NODE_ENV === "development" && devDictionary && (
            <DevToolsDropdown dictionary={devDictionary} />
          )}
        </div>
      </header>

      {cartContent && (
        <CartSheet
          isOpen={isCartOpen}
          onOpenChange={setIsCartOpen}
          content={cartContent}
          locale={currentLocale}
        />
      )}
    </>
  );
}
