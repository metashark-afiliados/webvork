// src/components/razBits/CardNav/CardNav.tsx
/**
 * @file CardNav.tsx
 * @description Componente de navegación principal, "naturalizado" para Curcumin Simplex.
 *              Corregida la asignación de callback ref para cumplir con el contrato de React.
 * @version 2.2.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type CardNavItem = NonNullable<Dictionary["cardNav"]>["navItems"][number];
type CardNavLink = CardNavItem["links"][number];

interface CardNavProps {
  content: Dictionary["cardNav"];
  className?: string;
}

export function CardNav({
  content,
  className,
}: CardNavProps): React.ReactElement | null {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    clientLogger.startGroup("CardNav GSAP Initialization");
    if (!navRef.current || !content) {
      clientLogger.warn(
        "GSAP no se pudo inicializar: Ref de navegación o contenido no disponible."
      );
      clientLogger.endGroup();
      return;
    }
    const collapsedHeight = 60;
    const calculateExpandedHeight = () =>
      window.matchMedia("(max-width: 768px)").matches
        ? (navRef.current?.scrollHeight ?? 260)
        : 260;
    gsap.set(navRef.current, { height: collapsedHeight, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navRef.current, {
      height: calculateExpandedHeight,
      duration: 0.5,
      ease: "power3.out",
    }).to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 },
      "-=0.3"
    );
    timelineRef.current = tl;
    clientLogger.info("GSAP timeline creada exitosamente.");
    return () => {
      tl.kill();
      timelineRef.current = null;
      clientLogger.trace("GSAP timeline destruida.");
      clientLogger.endGroup();
    };
  }, [content]);

  const toggleMenu = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    setMenuOpen((prev) => {
      const newOpenState = !prev;
      clientLogger.trace(
        `toggleMenu: El menú ahora está ${newOpenState ? "ABIERTO" : "CERRADO"}.`
      );
      if (newOpenState) tl.play();
      else tl.reverse();
      return newOpenState;
    });
  };

  if (!content) {
    clientLogger.error(
      "[CardNav] No se proporcionó contenido. El componente no se renderizará."
    );
    return null;
  }

  console.log("[Observabilidad] Renderizando CardNav (Naturalizado)");
  const { logo, navItems, ctaButton, menuAccessibility } = content;

  return (
    <div
      className={twMerge(
        "absolute left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 top-4 md:top-8",
        className
      )}
    >
      <nav
        ref={navRef}
        className="block h-[60px] rounded-xl shadow-lg relative will-change-[height] bg-background/80 backdrop-blur-md border border-white/10"
      >
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-2 md:px-4 z-10">
          <button
            onClick={toggleMenu}
            className="group h-full flex flex-col items-center justify-center cursor-pointer gap-1.5 p-4 order-2 md:order-1"
            aria-label={
              isMenuOpen
                ? menuAccessibility.closeLabel
                : menuAccessibility.openLabel
            }
            aria-expanded={isMenuOpen}
          >
            <div
              className={twMerge(
                "w-7 h-0.5 bg-foreground transition-transform duration-300 origin-center",
                isMenuOpen && "translate-y-[4px] rotate-45"
              )}
            />
            <div
              className={twMerge(
                "w-7 h-0.5 bg-foreground transition-transform duration-300 origin-center",
                isMenuOpen && "-translate-y-[4px] -rotate-45"
              )}
            />
          </button>
          <Link
            href="/"
            aria-label={logo.alt}
            className="order-1 md:order-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex order-3">
            <Link
              href={ctaButton.href}
              className="inline-flex items-center justify-center rounded-lg text-sm font-semibold px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {ctaButton.label}
            </Link>
          </div>
        </div>
        <div
          className={twMerge(
            "absolute top-[60px] left-0 right-0 bottom-0 p-2 pt-0 flex flex-col md:flex-row items-stretch gap-2 justify-end",
            !isMenuOpen && "invisible pointer-events-none"
          )}
        >
          {navItems.slice(0, 3).map((item: CardNavItem, idx: number) => (
            <div
              key={item.label}
              // <<-- CORRECCIÓN DEFINITIVA: Se utiliza la sintaxis de callback ref con cuerpo de función.
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className={twMerge(
                "flex flex-col gap-2 p-4 rounded-lg min-w-0 flex-1",
                idx === 0 && "bg-secondary/70",
                idx === 1 && "bg-muted/70",
                idx === 2 && "bg-background/70"
              )}
            >
              <h3 className="font-bold tracking-tight text-xl text-primary">
                {item.label}
              </h3>
              <div className="mt-auto flex flex-col gap-1 items-start">
                {item.links.map((link: CardNavLink) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group"
                  >
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
// src/components/razBits/CardNav/CardNav.tsx
