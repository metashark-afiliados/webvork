// components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal.
 *              - v16.1.0: Corregido el nombre de la prop pasada a DevToolsDropdown.
 * @version 16.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/layout/Header.tsx.md
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { Button } from "@/components/ui/Button"; // Asumiendo que ahora usa nuestra SSoT Button
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface PortalHeaderProps {
  content: Dictionary["header"];
  devDictionary: Dictionary["devRouteMenu"];
}

const PortalHeader = ({
  content,
  devDictionary,
}: PortalHeaderProps): React.ReactElement | null => {
  clientLogger.info(
    "[PortalHeader] Renderizando cabecera principal del portal."
  );

  if (!content) {
    clientLogger.warn(
      "[PortalHeader] No se proporcionó contenido. El header no se renderizará."
    );
    return null;
  }

  const { logoUrl, logoAlt, navLinks, ctaButton } = content;

  return (
    <header className="fixed top-16 left-0 right-0 z-40 flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-sm md:px-6 border-b border-white/10">
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
        {navLinks.map((route) => (
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
          // <<-- CORRECCIÓN: Se pasa la prop con el nombre correcto 'dictionary'.
          <DevToolsDropdown dictionary={devDictionary} />
        )}
      </div>
    </header>
  );
};

export default PortalHeader;
// components/layout/Header.tsx
