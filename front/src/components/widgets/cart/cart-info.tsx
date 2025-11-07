import { useNavigate } from "react-router";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useCartStore } from "../../../stores";

type Props = {
  amount: number;
  length: number;
};

export const CartInfo: React.FC<Props> = ({ amount, length }) => {
  const navigate = useNavigate();
  const toggleCart = useCartStore((state) => state.toggleCart);

  const handleCreateOrder = () => {
    if (length < 1) return;
    navigate("/order");
    toggleCart(false);
  };
  return (
    <div className="p-6 border-t border-gray-200 bg-gray-50">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Товары ({length})</span>
          <span className="text-gray-900">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Скидка</span>
          <span className="text-green-600">
            {/* −{formatCurrency(totalDiscount())} */}0
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Доставка</span>
          <span className="text-gray-900">Бесплатно</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-900">Итого</span>
        <span className="text-2xl font-bold text-gray-900">
          {/* {formatCurrency(totalAmount() - totalDiscount())} */}
          {formatCurrency(amount)}
        </span>
      </div>

      <button
        onClick={handleCreateOrder}
        disabled={length < 1}
        className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
      >
        Оформить заказ
      </button>

      <p className="text-center text-gray-500 text-xs mt-3">
        Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных
        данных
      </p>
    </div>
  );
};
