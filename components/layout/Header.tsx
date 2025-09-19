// components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal. Corregido para
 *              resolver errores de sintaxis y referencias faltantes.
 * @version 23.2.0 (Formatter & Syntax Fix)
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
import { ToggleTheme } from "./toogle-theme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartTrigger } from "./CartTrigger";
import { CartSheet } from "./CartSheet";

interface HeaderProps {
  content: Dictionary["header"];
  devDictionary?: Dictionary["devRouteMenu"];
  currentLocale: Locale;
  supportedLocales: readonly string[];
}

export default function Header({
  content,
  devDictionary,
  currentLocale,
  supportedLocales,
}: HeaderProps): React.ReactElement | null {
  logger.info("[Header] Renderizando v23.2 (Formatter & Syntax Fix)");

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
          <ToggleTheme />
          <LanguageSwitcher
            currentLocale={currentLocale}
            supportedLocales={supportedLocales}
          />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <CartTrigger onClick={() => setIsCartOpen(true)} />
          {process.env.NODE_ENV === "development" && devDictionary && (
            <DevToolsDropdown dictionary={devDictionary} />
          )}
        </div>
      </header>

      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
