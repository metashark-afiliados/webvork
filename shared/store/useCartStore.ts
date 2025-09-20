// RUTA: shared/store/useCartStore.ts
/**
 * @file useCartStore.ts
 * @description Store de Zustand y SSoT para la gestión del estado del carrito de compras.
 *              Implementa la lógica para añadir, eliminar y actualizar productos,
 *              y persiste el estado en localStorage para una experiencia de usuario robusta.
 * @version 2.0.0 (Elite Compliance & SSoT Alignment)
 * @author RaZ Podestá - MetaShark Tech
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logging";
import type { Product } from "@/shared/lib/schemas/entities/product.schema";

/**
 * @interface CartItem
 * @description Define la estructura de un item dentro del carrito.
 *              Extiende la entidad soberana 'Product' con la cantidad seleccionada.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * @interface CartState
 * @description Define el contrato completo del store del carrito, incluyendo
 *              el estado y las acciones.
 */
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        logger.trace(`[useCartStore] Acción: addItem`, { product, quantity });
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          const updatedItems = currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
          toast.success(`"${product.name}" actualizado en el carrito.`);
        } else {
          const newItem: CartItem = { ...product, quantity };
          set({ items: [...currentItems, newItem] });
          toast.success(`"${product.name}" añadido al carrito.`);
        }
      },
      removeItem: (productId) => {
        logger.trace(`[useCartStore] Acción: removeItem`, { productId });
        const updatedItems = get().items.filter(
          (item) => item.id !== productId
        );
        set({ items: updatedItems });
        toast.info("Producto eliminado del carrito.");
      },
      updateQuantity: (productId, quantity) => {
        logger.trace(`[useCartStore] Acción: updateQuantity`, {
          productId,
          quantity,
        });
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const updatedItems = get().items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },
      clearCart: () => {
        logger.warn(`[useCartStore] Acción: clearCart. Carrito vaciado.`);
        set({ items: [] });
        toast.warning("El carrito ha sido vaciado.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * @function useCartTotals
 * @description Hook selector para obtener valores calculados del estado del carrito.
 * @returns {{ cartCount: number, cartTotal: number }} El número total de items y el precio total.
 */
export const useCartTotals = () => {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return { cartCount, cartTotal };
};
