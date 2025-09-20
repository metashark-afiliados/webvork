// RUTA: components/sections/ProductInfo.tsx
/**
 * @file ProductInfo.tsx
 * @description Panel de información y acciones para la página de detalle de producto.
 * @version 2.1.0 (Holistic Elite Compliance & Full i18n)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { Button, DynamicIcon, Separator, Input, Label } from "@/components/ui";
import { TextSection } from "@/components/sections/TextSection";
import { useCartStore } from "@/shared/store/useCartStore";
import type { z } from "zod";
import type { ProductDetailPageContentSchema } from "@/shared/lib/schemas/pages/product-detail-page.schema";
import { cn } from "@/shared/lib/utils";
import { logger } from "@/shared/lib/logging";

type ProductContent = z.infer<typeof ProductDetailPageContentSchema>;

interface ProductInfoProps {
  content: ProductContent;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <DynamicIcon
        key={i}
        name="Star"
        className={cn(
          "h-5 w-5",
          i < Math.floor(rating)
            ? "text-yellow-400"
            : "text-muted-foreground/30"
        )}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ))}
  </div>
);

export function ProductInfo({ content }: ProductInfoProps) {
  logger.info("[ProductInfo] Renderizando v2.1 (Full i18n).");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const {
    productData,
    description,
    addToCartButton,
    quantityLabel,
    stockStatus,
  } = content;

  const handleAddToCart = () => {
    logger.info(
      `[ProductInfo] Añadiendo ${quantity} de "${productData.name}" al carrito.`
    );
    addItem(productData, quantity);
  };

  const stockAvailable = productData.inventory.available > 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {productData.categorization.primary}
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          {productData.name}
        </h1>

        <div className="flex items-center gap-4 mt-4">
          {productData.rating && <StarRating rating={productData.rating} />}
          <span className="text-3xl font-bold text-primary">
            {new Intl.NumberFormat("it-IT", {
              // Locale debería ser una prop en el futuro
              style: "currency",
              currency: productData.currency,
            }).format(productData.price)}
          </span>
        </div>
      </div>

      <TextSection
        content={description}
        spacing="compact"
        prose={true}
        className="py-0 text-muted-foreground"
      />

      <Separator />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="quantity" className="text-sm font-medium">
            {quantityLabel}
          </Label>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={!stockAvailable}
            >
              <DynamicIcon name="Minus" className="h-4 w-4" />
            </Button>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="h-9 w-16 text-center mx-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              disabled={!stockAvailable}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setQuantity((q) => q + 1)}
              disabled={!stockAvailable}
            >
              <DynamicIcon name="Plus" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full sm:w-auto flex-1"
          disabled={!stockAvailable}
        >
          <DynamicIcon name="ShoppingCart" className="mr-2 h-5 w-5" />
          {addToCartButton}
        </Button>
      </div>

      <div className="text-sm text-center">
        {stockAvailable ? (
          <p className="text-green-600">
            {stockStatus.available.replace(
              "{{count}}",
              String(productData.inventory.available)
            )}
          </p>
        ) : (
          <p className="text-destructive">{stockStatus.unavailable}</p>
        )}
      </div>
    </div>
  );
}
