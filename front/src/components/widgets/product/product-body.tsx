import type { Brand, Category, Product } from "../../../models/product/api";
import { ProductCartButtons } from "./product-cart-buttons";

type Props = {
  id: Product["id"];
  description: Product["description"];
  category: Category["title"];
  brand: Brand["title"];
  features: Product["features"];
  qty: Product["qtyInCart"];
  stock: Product["inStock"];

  updateQty: (qty: number) => void;
};

export const ProductBody: React.FC<Props> = ({
  brand,
  category,
  description,
  features,
  qty,
  stock,
  id,
  updateQty,
}) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2">
          {features.split(", ").map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-900">Категория:</span>
          <span className="ml-2 text-gray-600">{category}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Бренд:</span>
          <span className="ml-2 text-gray-600">{brand}</span>
        </div>
      </div>

      <ProductCartButtons
        qty={qty}
        stock={stock}
        productId={id}
        updateQty={updateQty}
      />
    </>
  );
};
