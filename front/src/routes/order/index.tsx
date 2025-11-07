import { OrderForm, OrderProductItem, ProductSkeleton } from "../../components";
import { useCartStore, useUserStore } from "../../stores";
import { formatCurrency } from "../../utils/formatCurrency";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../api/order";
import type { TFormOrderValues } from "../../components/widgets/order/schemas";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";

export const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  const { mutate: handleCreateOrder } = useMutation({
    mutationKey: ["order"],
    mutationFn: async (data: TFormOrderValues) => {
      const { data: order } = await createOrder({
        cartId: cart!.id,
        comment: data.comment || null,
        email: data.email,
        userId: user!.id,
        username: data.username,
        id: uuid(),
      });
      return order;
    },
    onSuccess: async (data) => {
      console.log(data);
      await navigate("/");
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Оформление заказа
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Товары в заказе
              </h2>
              <div className="space-y-4 mb-6">
                {cart?.items.map((item) => (
                  <OrderProductItem key={item.id} cardProduct={item} />
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Итого:</span>
                  <span>{formatCurrency(cart?.amount || 0)}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Данные для заказа
              </h2>
              {user && (
                <OrderForm data={user} createOrder={handleCreateOrder} />
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};
