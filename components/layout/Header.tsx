// components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal del portal. Resuelve el error de tipo
 *              TS7006 al importar y utilizar el tipo explícito `NavLink` desde su SSoT.
 * @version 17.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/layout/Header.tsx.md
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import DevToolsDropdown from "@/components/dev/DevToolsDropdown";
import { Button } from "@/components/ui/Button";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- INICIO DE MODIFICACIÓN ---
import type { NavLink } from "@/lib/schemas/components/header.schema";
// --- FIN DE MODIFICACIÓN ---

interface HeaderProps {
  content: Dictionary["header"];
  devDictionary: Dictionary["devRouteMenu"];
}

/**
 * @component Header
 * @description Renderiza la cabecera principal del portal, incluyendo navegación y CTA.
 * @param {HeaderProps} props Las propiedades con el contenido i18n necesario.
 * @returns {React.ReactElement | null} El elemento JSX de la cabecera o null si no hay contenido.
 */
const Header = ({
  content,
  devDictionary,
}: HeaderProps): React.ReactElement | null => {
  logger.info(
    "[Observabilidad] Renderizando Header (v17.0.0 - Tipo explícito)"
  );

  if (!content) {
    logger.warn(
      "[Header] No se proporcionó contenido. El header no se renderizará."
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
        {/* --- INICIO DE CORRECCIÓN --- */}
        {/* Se aplica el tipo explícito `NavLink` al parámetro `route`. */}
        {navLinks.map((route: NavLink) => (
          <Link
            key={route.href}
            href={route.href}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {route.label}
          </Link>
        ))}
        {/* --- FIN DE CORRECCIÓN --- */}
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
// components/layout/Header.tsx
