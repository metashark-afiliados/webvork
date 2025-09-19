// RUTA: app/[locale]/not-found/page.tsx

/**
 * @file page.tsx
 * @description Página 404 localizada de élite, con animaciones y efectos MEA/UX.
 * @version 2.0.0 (Holistic Elite Leveling & MEA)
 * @author RaZ Podestá - MetaShark Tech
 *
 * @description_extended Este componente de cliente autocontenido busca su propio
 *              contenido i18n y renderiza una experiencia 404 pulida. Utiliza
 *              `framer-motion` para una entrada animada y el `razBit` <LightRays />
 *              para una atmósfera visual de alta calidad, transformando un error
 *              en una interacción de marca positiva.
 */
"use client";

import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LightRays } from "@/components/razBits/LightRays/LightRays";
import { logger } from "@/lib/logging";
import { type Locale } from "@/lib/i18n.config";
import { getDictionary } from "@/lib/i18n";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type NotFoundContent = NonNullable<Dictionary["notFoundPage"]>;

// Variante para la animación del contenedor, que orquesta a sus hijos.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Variante para la animación de cada elemento de texto/botón.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

export default function NotFoundPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info(
    `[NotFoundPage] Renderizando página 404 de élite (v2.0) para locale: ${locale}`
  );

  const [content, setContent] = useState<NotFoundContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { dictionary, error } = await getDictionary(locale);
      if (error || !dictionary.notFoundPage) {
        logger.error(
          `[NotFoundPage] No se pudo cargar el contenido para [${locale}].`,
          { error }
        );
      } else {
        setContent(dictionary.notFoundPage);
      }
      setIsLoading(false);
    };

    fetchContent();
  }, [locale]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* Renderiza un loader simple o un esqueleto aquí si es necesario */}
      </div>
    );
  }

  if (!content) {
    // Fallback genérico y sin texto hardcodeado en un idioma específico
    return (
      <Container className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
            Application Error
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Could not load page content. Please try again later.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <LightRays
        config={{
          raysColor: "primary",
          raysOrigin: "top-center",
          raysSpeed: 0.3,
          lightSpread: 0.8,
          rayLength: 1.5,
          mouseInfluence: 0.02,
        }}
        className="absolute inset-0 z-0 opacity-20"
      />
      <Container className="relative z-10 flex h-full items-center justify-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-base font-semibold text-primary"
          >
            404
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {content.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base leading-7 text-muted-foreground"
          >
            {content.description}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button asChild>
              <Link href={`/${locale}`}>{content.buttonText}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
