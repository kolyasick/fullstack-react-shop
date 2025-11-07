import type { CartProduct } from "../../../models/cart/api";
import { formatCurrency } from "../../../utils/formatCurrency";

type Props = {
  cardProduct: CartProduct;
};

export const OrderProductItem: React.FC<Props> = ({ cardProduct }) => {
  return (
    <div
      key={cardProduct.id}
      className="flex justify-between items-center py-3 border-b border-gray-200"
    >
      <div className="flex-1">
        <span className="font-medium text-gray-900">
          {cardProduct.product.title}
        </span>
        <span className="text-gray-500 ml-2">× {cardProduct.qty}</span>
      </div>
      <div className="font-semibold text-gray-900">
        {formatCurrency(cardProduct.product.price * cardProduct.qty)}
      </div>
    </div>
  );
};
