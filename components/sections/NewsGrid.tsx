// components/sections/NewsGrid.tsx
/**
 * @file NewsGrid.tsx
 * @description Cuadrícula de noticias, ahora data-driven desde CogniRead.
 * @version 6.0.0 (CogniRead Integration & BAVI-Powered)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion, type Variants } from "framer-motion";
import { Container, DynamicIcon } from "@/components/ui";
import { routes } from "@/shared/lib/navigation";
import type { Locale } from "@/shared/lib/i18n.config";
import type { CogniReadArticle } from "@/shared/lib/schemas/cogniread/article.schema";
import { logger } from "@/shared/lib/logging";

interface NewsGridProps {
  articles: CogniReadArticle[];
  locale: Locale;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function NewsGrid({
  articles,
  locale,
}: NewsGridProps): React.ReactElement {
  logger.info("[NewsGrid] Renderizando v6.0 (CogniRead & BAVI Powered).");

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {articles.map((article) => {
            const content = article.content[locale];
            if (!content) return null; // No renderizar si no hay traducción

            return (
              <motion.div key={article.articleId} variants={cardVariants}>
                <Link
                  href={routes.newsBySlug.path({ locale, slug: content.slug })}
                  className="block group"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg border border-border bg-card h-full flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                    <div className="relative w-full h-48 bg-muted/50">
                      {article.baviHeroImageId ? (
                        <CldImage
                          src={article.baviHeroImageId}
                          alt={content.title}
                          width={400}
                          height={225}
                          crop="fill"
                          gravity="auto"
                          format="auto"
                          quality="auto"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <DynamicIcon name="ImageOff" size={48} />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-primary flex-grow">
                        {content.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {content.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
// components/sections/NewsGrid.tsx
