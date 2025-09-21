// RUTA: shared/store/useCartStore.ts
/**
 * @file useCartStore.ts
 * @description Store de Zustand y SSoT para la gestión del estado del carrito de compras.
 *              v3.0.0 (DEPRECATION & ADAPTER): Este store ha sido refactorizado a un
 *              adaptador sobre el nuevo sistema de Contexto y Server Actions.
 *              Su uso está obsoleto y está destinado a ser eliminado.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { create } from "zustand";
import { toast } from "sonner";
import { logger } from "@/shared/lib/logging";
import type { Product } from "@/shared/lib/schemas/entities/product.schema";

/**
 * @interface CartItem
 * @description Define la estructura de un item dentro del carrito.
 *              Se mantiene por retrocompatibilidad durante la transición.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * @interface CartState
 * @description Define el contrato completo del store del carrito obsoleto.
 */
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

/**
 * @const useCartStore
 * @description Hook de Zustand obsoleto. Las acciones ahora solo registran una
 *              advertencia para facilitar la depuración y la migración final.
 */
export const useCartStore = create<CartState>(() => ({
  items: [],
  addItem: () => {
    logger.warn(
      "[useCartStore] DEPRECATED: La acción 'addItem' fue llamada. La lógica ha sido movida a 'cart.actions.ts'."
    );
    toast.warning("Funcionalidad obsoleta", {
      description: "addItem ya no debe ser usado desde useCartStore.",
    });
  },
  removeItem: () => {
    logger.warn(
      "[useCartStore] DEPRECATED: La acción 'removeItem' fue llamada."
    );
  },
  updateQuantity: () => {
    logger.warn(
      "[useCartStore] DEPRECATED: La acción 'updateQuantity' fue llamada."
    );
  },
  clearCart: () => {
    logger.warn(
      "[useCartStore] DEPRECATED: La acción 'clearCart' fue llamada."
    );
  },
}));

/**
 * @function useCartTotals
 * @description Hook selector obsoleto. La lógica ahora reside en el servidor
 *              y es gestionada por el nuevo `useCart` hook. Devuelve valores
 *              por defecto para prevenir que la UI se rompa durante la transición.
 * @returns {{ cartCount: number, cartTotal: number }}
 */
export const useCartTotals = () => {
  logger.warn(
    "[useCartStore] DEPRECATED: El hook 'useCartTotals' fue llamado. La lógica de totales ahora está en el servidor."
  );
  return { cartCount: 0, cartTotal: 0 };
};
