// src/components/layout/Footer.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * @file Footer.tsx
 * @description Componente de presentación para el pie de página principal del sitio.
 * @version 2.0.0
 * @date 2025-09-09
 * @dependencies next/link, @/components/ui/Container
 *
 * @prop {string} copyright - Texto del copyright.
 * @prop {Array<{label: string, href: string}>} links - Array de objetos para los enlaces legales.
 * @prop {string} disclaimer - Texto del descargo de responsabilidad.
 */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  copyright: string;
  links: FooterLink[];
  disclaimer: string;
}

/**
 * @component Footer
 * @description Renderiza el pie de página. Es un componente de presentación puro que
 * recibe todo su contenido a través de props para facilitar la internacionalización
 * estática y las pruebas.
 * @param {FooterProps} props Las propiedades con el contenido textual.
 * @returns {React.ReactElement} El elemento JSX que representa el pie de página.
 */
export function Footer({
  copyright,
  links,
  disclaimer,
}: FooterProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando Footer");

  return (
    <footer className="text-gray-400 pt-16 pb-10 mt-20 border-t border-gray-800">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm">{copyright}</p>
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0"
            aria-label="Footer navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 text-xs text-gray-500 border-t border-gray-700 pt-6">
          <p>{disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}

// src/components/layout/Footer.tsx
