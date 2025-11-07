import { useEffect } from "react";
import { CartItem } from "./cart-item";
import { getCart } from "../../../api/cart";
import { useUserStore, useCartStore } from "../../../stores";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { CartSkeleton } from "./skeleton";
import { PromocodeForm } from "./promocode-form";
import { CartInfo } from "./cart-info";

export const Cart: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const user = useUserStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["cart", user?.uuid, cart?.items],
    queryFn: async () => {
      try {
        const { data } = await getCart(user!.uuid, false);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!user?.uuid && !cart?.items,

    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) setCart(data);
  }, [data]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50"></div>
      <div className="w-1/4 border-l border-gray-200 h-screen fixed top-0 right-0 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
            <button
              onClick={() => toggleCart(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {cart?.items && cart.items.length > 0 && (
            <p className="text-gray-500 text-sm mt-1">
              {cart.length} товара на сумму {formatCurrency(cart.amount)}
            </p>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <CartSkeleton key={i} className="w-full" />
            ))
          ) : cart?.items && cart.items.length > 0 ? (
            cart.items.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center ">
              <div className="text-6xl mb-4">😔</div>
              <div className="text-2xl text-gray-600 mb-2">Корзина пуста</div>
              <button
                onClick={() => toggleCart(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Набрать товаров
              </button>
            </div>
          )}
        </div>

        <PromocodeForm />

        <CartInfo amount={cart?.amount || 0} length={cart?.length || 0} />
      </div>
    </>
  );
};
