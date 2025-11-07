import { useCartActions } from "../../../hooks";
import { useUserStore } from "../../../stores";

type Props = {
  qty: number;
  stock: boolean;
  productId: number;

  updateQty: (qty: number) => void;
};

export const ProductCartButtons: React.FC<Props> = ({
  qty,
  stock,
  productId,
  updateQty,
}) => {
  const { addToCart, removeFromCart } = useCartActions();
  const user = useUserStore((state) => state.user);

  const handleAddToCart = async (productId: number) => {
    if (!user) return;
    await addToCart(productId);
    updateQty(qty + 1);
  };

  const handleRemoveFromCart = async (
    productId: number,
    completely: boolean
  ) => {
    if (!user) return;
    await removeFromCart(productId, completely);
    updateQty(qty - 1);
  };

  return (
    <>
      {qty === 0 ? (
        <div className="flex space-x-4 pt-4">
          <button
            onClick={() => handleAddToCart(productId)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              true
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {stock ? "Add to Cart" : "Out of Stock"}
          </button>
          <button className="py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Wishlist
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3 pt-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleRemoveFromCart(productId, false)}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
              aria-label="Decrease quantity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>

            <div className="w-16 h-12 flex items-center justify-center bg-white">
              <span className="text-lg font-semibold text-gray-900">{qty}</span>
            </div>

            <button
              onClick={() => handleAddToCart(productId)}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
              aria-label="Increase quantity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => handleRemoveFromCart(productId, true)}
            className="flex-1 py-3 px-6 border border-red-300 rounded-lg font-medium text-red-700 hover:bg-red-50 transition-colors"
          >
            Remove from Cart
          </button>
        </div>
      )}
    </>
  );
};
