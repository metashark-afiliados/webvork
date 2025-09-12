// src/components/sections/ProductShowcase.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @file ProductShowcase.tsx
 * @description Vitrina de productos. Actualizado para aceptar `content`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

// <<-- CORRECCIÓN: La prop ahora es un objeto `content`
interface ProductShowcaseProps {
  content: NonNullable<Dictionary["productShowcase"]>;
}

export function ProductShowcase({
  content,
}: ProductShowcaseProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando ProductShowcase");
  const { title, products } = content;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 sm:py-24 bg-background/95">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.name}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-6 text-center"
              variants={cardVariants}
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">{product.name}</h3>
              <p className="mt-2 text-sm text-foreground/80">
                {product.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
// src/components/sections/ProductShowcase.tsx
