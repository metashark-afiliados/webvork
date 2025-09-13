// components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal.
 *              - v17.2.0: Refactoriza los alias de importación al patrón robusto
 *                `@/components/...` para garantizar la compatibilidad con el build.
 * @version 17.2.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import Image from "next/image";
import Link from "next/link";
// --- INICIO DE CORRECCIÓN: Rutas de importación robustas ---
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { Button } from "@/components/ui/Button";
// --- FIN DE CORRECCIÓN ---
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { NavLink } from "@/schemas/components/header.schema";

interface HeaderProps {
  content: Dictionary["header"];
  devDictionary: Dictionary["devRouteMenu"];
}

const Header = ({
  content,
  devDictionary,
}: HeaderProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando Header");

  if (!content) {
    logger.warn(
      "[Header] No se proporcionó contenido. El header no se renderizará."
    );
    return null;
  }

  const { logoUrl, logoAlt, navLinks, ctaButton } = content;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-sm md:px-6 border-b border-white/10">
      <Link href="/" className="mr-6 flex items-center">
        <Image
          src={logoUrl}
          alt={logoAlt}
          width={150}
          height={28}
          className="h-7 w-auto"
          priority
        />
        <span className="sr-only">{logoAlt}</span>
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

      <div className="flex items-center gap-4 ml-auto">
        <Button href={ctaButton.href} variant="accent" size="sm">
          {ctaButton.label}
        </Button>

        {process.env.NODE_ENV === "development" && devDictionary && (
          <DevToolsDropdown dictionary={devDictionary} />
        )}
      </div>
    </header>
  );
};

export default Header;
