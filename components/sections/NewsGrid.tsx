// src/components/sections/NewsGrid.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @file NewsGrid.tsx
 * @description Cuadrícula de noticias. Actualizado para aceptar `content`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

// <<-- CORRECCIÓN: La prop ahora es un objeto `content`
interface NewsGridProps {
  content: NonNullable<Dictionary["newsGrid"]>;
}

export function NewsGrid({ content }: NewsGridProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando NewsGrid");
  const { title, articles } = content;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {articles.map((article) => (
            <motion.div key={article.title} variants={cardVariants}>
              <Link href={article.href} className="block group">
                <div className="overflow-hidden rounded-lg shadow-lg border border-muted bg-muted/20 h-full flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                  <div className="relative w-full h-48">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                      {article.category}
                    </p>
                    <h3 className="text-lg font-bold text-primary flex-grow">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {article.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
// src/components/sections/NewsGrid.tsx
