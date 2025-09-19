// components/sections/ProductInfo.tsx
/**
 * @file ProductInfo.tsx
 * @description Panel de información y acciones para la página de detalle de producto.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { Button, DynamicIcon, Separator } from "@/components/ui";
import { TextSection } from "@/components/sections/TextSection";
import { useCartStore } from "@/store/useCartStore";
import type { z } from "zod";
import type { ProductDetailPageContentSchema } from "@/lib/schemas/pages/product-detail-page.schema";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logging";

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
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { productData, description, addToCartButton, quantityLabel } = content;

  const handleAddToCart = () => {
    logger.info(
      `[ProductInfo] Añadiendo ${quantity} de "${productData.name}" al carrito.`
    );
    addItem(productData, quantity);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {productData.category}
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          {productData.name}
        </h1>

        <div className="flex items-center gap-4 mt-4">
          {productData.rating && <StarRating rating={productData.rating} />}
          <span className="text-3xl font-bold text-primary">
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "EUR",
            }).format(productData.price)}
          </span>
        </div>
      </div>

      <TextSection
        content={description}
        spacing="compact"
        prose={false}
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
            />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <DynamicIcon name="Plus" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full sm:w-auto flex-1"
        >
          <DynamicIcon name="ShoppingCart" className="mr-2 h-5 w-5" />
          {addToCartButton}
        </Button>
      </div>

      <div className="text-sm text-center">
        {productData.inventory > 0 ? (
          <p className="text-green-600">
            Disponibile ({productData.inventory} in magazzino)
          </p>
        ) : (
          <p className="text-destructive">Attualmente non disponibile</p>
        )}
      </div>
    </div>
  );
}

// Pequeños componentes de UI que faltaban, añadidos aquí por completitud.
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
// components/sections/ProductInfo.tsx
