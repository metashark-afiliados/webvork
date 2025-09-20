// components/sections/ProductGallery.tsx
/**
 * @file ProductGallery.tsx
 * @description Galería de imágenes interactiva para la página de detalle de producto.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { z } from "zod";
import type { ProductDetailPageContentSchema } from "@/shared/lib/schemas/pages/product-detail-page.schema";

type GalleryImage = z.infer<
  typeof ProductDetailPageContentSchema
>["galleryImages"][number];

interface ProductGalleryProps {
  images: GalleryImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="aspect-square bg-muted rounded-xl"></div>;
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden border shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square w-full rounded-md overflow-hidden border-2 transition-all",
              activeIndex === index
                ? "border-primary ring-2 ring-primary/50"
                : "border-transparent hover:border-primary/50"
            )}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
// components/sections/ProductGallery.tsx
