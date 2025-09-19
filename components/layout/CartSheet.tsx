// components/layout/CartSheet.tsx
/**
 * @file CartSheet.tsx
 * @description Panel lateral (Sheet) que muestra el contenido del carrito de compras.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/Sheet";
import { Button, DynamicIcon, Separator } from "@/components/ui";
import { useCartStore, useCartTotals } from "@/store/useCartStore";
import type { CartItem } from "@/store/useCartStore";
import { logger } from "@/lib/logging";

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  // TODO: Internacionalizar textos
}

const CartItemRow = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-16 w-16 rounded-md overflow-hidden border">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          {new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(item.price)}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <DynamicIcon name="Minus" className="h-4 w-4" />
          </Button>
          <span className="text-sm w-4 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <DynamicIcon name="Plus" className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => removeItem(item.id)}
      >
        <DynamicIcon name="Trash2" className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function CartSheet({ isOpen, onOpenChange }: CartSheetProps) {
  logger.info("[CartSheet] Renderizando panel del carrito.");
  const items = useCartStore((state) => state.items);
  const { cartTotal } = useCartTotals();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Il Tuo Carrello</SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <div className="flex-1 overflow-y-auto px-6">
            <div className="divide-y">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <DynamicIcon
              name="ShoppingCart"
              className="w-16 h-16 text-muted-foreground/30"
            />
            <p className="text-muted-foreground">Il tuo carrello è vuoto.</p>
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="px-6 py-4 bg-muted/50 mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-base font-semibold">
                <p>Subtotale</p>
                <p>
                  {new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(cartTotal)}
                </p>
              </div>
              <Button size="lg" className="w-full">
                Procedi al Checkout
              </Button>
              <SheetClose asChild>
                <Button variant="link" className="w-full">
                  Continua lo Shopping
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
// components/layout/CartSheet.tsx
