import { useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "../stores";
import type { Product } from "../models/product/api";
import type { Cart, CartProduct } from "../models/cart/api";

export const useCartActions = () => {
  const queryClient = useQueryClient();

  const cart = useCartStore((state) => state.cart);
  const addProductToCart = useCartStore((state) => state.addToCart);
  const removeProductFromCart = useCartStore((state) => state.removeFromCart);

  const updateAllProductsCache = (productId: number, quantity: number) => {
    queryClient.setQueriesData({ queryKey: ["products"] }, (oldData: any) => {
      if (!oldData?.products) return oldData;
      return {
        ...oldData,
        products: oldData.products.map((p: Product) =>
          p.id === productId ? { ...p, qtyInCart: quantity } : p
        ),
      };
    });
  };

  const updateAllCartCache = (product: CartProduct) => {
    queryClient.setQueriesData({ queryKey: ["cart"] }, (oldData: Cart) => {
      if (!oldData) return oldData;

      const currentItems = oldData.items || [];

      if (product.qty === 0) {
        const newItems = currentItems.filter(
          (item: CartProduct) => item.id !== product.id
        );

        return {
          ...oldData,
          items: newItems,
          length: newItems.reduce((sum, item) => sum + item.qty, 0),
          amount: newItems.reduce(
            (sum, item) => sum + item.qty * item.product.price,
            0
          ),
        };
      }
      const existingItemIndex = currentItems.findIndex(
        (item: CartProduct) => item.id === product.id
      );

      let newItems: CartProduct[];

      if (existingItemIndex >= 0) {
        newItems = currentItems.map((item: CartProduct) =>
          item.id === product.id ? { ...item, qty: product.qty } : item
        );
      } else {
        newItems = [...currentItems, product];
      }

      const newLength = newItems.reduce((sum, item) => sum + item.qty, 0);

      return {
        ...oldData,
        items: newItems,
        length: newLength,
        amount: newItems.reduce(
          (sum, item) => sum + item.qty * item.product.price,
          0
        ),
      };
    });
  };

  const addToCart = async (productId: number) => {
    if (!cart?.id) return;
    try {
      const product = await addProductToCart(productId);
      updateAllProductsCache(productId, product.qty);
      updateAllCartCache(product);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId: number, completely: boolean) => {
    if (!cart?.id) return;
    try {
      const product = await removeProductFromCart(productId, completely);

      updateAllProductsCache(productId, product.qty);
      updateAllCartCache(product);
    } catch (error) {
      console.log(error);
    }
  };

  return { addToCart, removeFromCart };
};
