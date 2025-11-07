import type { Product } from "../../../models/product/api";
import { formatCurrency } from "../../../utils/formatCurrency";

type Props = {
  price: Product["price"];
  stock: Product["inStock"];
};

export const ProductStock: React.FC<Props> = ({ price, stock }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-4xl font-bold text-gray-900">
        {formatCurrency(price)}
      </span>
      {stock ? (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          In Stock
        </span>
      ) : (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          Out of Stock
        </span>
      )}
    </div>
  );
};
