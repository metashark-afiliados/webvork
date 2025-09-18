// components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal. Ahora integra la
 *              lógica y UI para el carrito de compras.
 * @version 21.0.0 (Shopping Cart Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react"; // <-- Se añade useState
import Image from "next/image";
import Link from "next/link";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { Button } from "@/components/ui/Button";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { NavLink } from "@/lib/schemas/components/header.schema";
import { type Locale } from "@/lib/i18n.config";
import { ToggleTheme } from "./toogle-theme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartTrigger } from "./CartTrigger"; // <-- NUEVA IMPORTACIÓN
import { CartSheet } from "./CartSheet"; // <-- NUEVA IMPORTACIÓN

interface HeaderProps {
  content: Dictionary["header"];
  devDictionary?: Dictionary["devRouteMenu"];
  currentLocale: Locale;
  supportedLocales: readonly string[];
}

export default function Header({
  // <-- Se cambia a exportación nombrada
  content,
  devDictionary,
  currentLocale,
  supportedLocales,
}: HeaderProps): React.ReactElement | null {
  logger.info("[Header] Renderizando v21.0 (Shopping Cart Integration)");

  // --- [INICIO] LÓGICA DE ESTADO PARA EL CARRITO ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  // --- [FIN] LÓGICA DE ESTADO PARA EL CARRITO ---

  if (!content) {
    logger.warn(
      "[Header] No se proporcionó contenido. El header no se renderizará."
    );
    return null;
  }

  const { logoUrl, logoAlt, navLinks, ctaButton } = content;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-sm md:px-6 border-b border-border">
        {/* ... Logo y NavLinks sin cambios ... */}
        <Link href="/" className="mr-6 flex items-center">
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
          {/* --- [INICIO] INTEGRACIÓN DEL CARRITO --- */}
          <Separator orientation="vertical" className="h-6 mx-2" />
          <CartTrigger onClick={() => setIsCartOpen(true)} />
          {/* --- [FIN] INTEGRACIÓN DEL CARRITO --- */}
          {process.env.NODE_ENV === "development" && devDictionary && (
            <DevToolsDropdown dictionary={devDictionary} />
          )}
        </div>
      </header>

      {/* El panel del carrito se renderiza aquí, controlado por el estado del Header */}
      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
// components/layout/Header.tsx
