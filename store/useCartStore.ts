// store/useCartStore.ts
/**
 * @file useCartStore.ts
 * @description Store de Zustand y SSoT para la gestión del estado del carrito de compras.
 *              Implementa la lógica para añadir, eliminar y actualizar productos,
 *              y persiste el estado en localStorage para una experiencia de usuario robusta.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { logger } from "@/lib/logging";
import type { z } from "zod";
import type { ProductCardSchema } from "@/lib/schemas/pages/store-page.schema";

// Definimos el tipo de un producto, que será la base para un item del carrito.
type Product = z.infer<typeof ProductCardSchema>;

/**
 * @interface CartItem
 * @description Define la estructura de un item dentro del carrito.
 *              Extiende el producto con la cantidad seleccionada.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * @interface CartState
 * @description Define el contrato completo del store del carrito, incluyendo
 *              el estado, los selectores derivados y las acciones.
 */
interface CartState {
  // --- ESTADO ---
  items: CartItem[];

  // --- ACCIONES ---
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // --- SELECTORES DERIVADOS (Getters) ---
  // No se almacenan en el estado, pero se pueden acceder como si lo fueran.
  // Nota: Zustand no tiene getters nativos como Pinia/Vuex. La forma idiomática
  // es definirlos fuera o llamarlos como funciones `get...()` si dependen del estado.
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // --- ESTADO INICIAL ---
      items: [],

      // --- IMPLEMENTACIÓN DE ACCIONES ---
      addItem: (product, quantity = 1) => {
        logger.trace(`[useCartStore] Acción: addItem`, { product, quantity });
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          // Si el item ya existe, actualizamos su cantidad
          const updatedItems = currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
          toast.success(`"${product.name}" actualizado en el carrito.`);
        } else {
          // Si es un item nuevo, lo añadimos al array
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
          // Si la cantidad es 0 o menos, eliminamos el item
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
      name: "cart-storage", // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// --- SELECTORES DERIVADOS (implementados como hooks/funciones externas) ---

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
// store/useCartStore.ts
