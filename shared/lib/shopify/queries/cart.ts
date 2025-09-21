// RUTA: shared/lib/shopify/queries/cart.ts
import "server-only";
import { cartFragment } from "../fragments/cart";
export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;
