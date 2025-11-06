import { useCartActions } from "../../hooks";
import type { Product } from "../../models/product/api";
import { CartIcon } from ".";

type Props = {
  productId: Product["id"];
  qty: Product["qtyInCart"];
};

export const ProductCounter: React.FC<Props> = ({ productId, qty }) => {
  const { addToCart, removeFromCart } = useCartActions();

  return (
    <>
      {qty > 0 ? (
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => removeFromCart(productId, false)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            onClick={() => addToCart(productId)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(productId)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-1"
        >
          <CartIcon className="w-4 h-4" />
          <span>Купить</span>
        </button>
      )}
    </>
  );
};
