// components/layout/sections/testimonial.tsx
/**
 * @file testimonial.tsx
 * @description Sección de carrusel de testimonios. Renombrada a TestimonialCarouselSection
 *              y refactorizada para ser data-driven.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Star } from "lucide-react";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { ReviewItem } from "@/lib/schemas/components/testimonial-carousel-section.schema";

interface TestimonialCarouselSectionProps {
  content: Dictionary["testimonialCarouselSection"];
}

export const TestimonialCarouselSection = ({
  content,
}: TestimonialCarouselSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando TestimonialCarouselSection");

  if (!content) {
    logger.warn(
      "[TestimonialCarouselSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, reviews } = content;

  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          {eyebrow}
        </h2>
        <h3 className="text-3xl md:text-4xl text-center font-bold mb-4">
          {title}
        </h3>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviews.map((review: ReviewItem) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < review.rating
                            ? "size-4 fill-primary text-primary"
                            : "size-4 fill-muted-foreground text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.userName} />
                      <AvatarFallback>
                        {review.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
// components/layout/sections/testimonial.tsx
