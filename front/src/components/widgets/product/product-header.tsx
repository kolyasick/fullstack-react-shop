import type { Product } from "../../../models/product/api";

type Props = {
  title: Product["title"];
  reviewsLength: number;
};

export const ProductHeader: React.FC<Props> = ({ reviewsLength, title }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-1">
          {/* {renderRatingStars(product.rating)} */}
          <span className="ml-2 text-sm text-gray-600">
            ({reviewsLength} reviews)
          </span>
        </div>
      </div>
      <p className="mt-2 text-lg text-gray-500">Apple</p>
    </div>
  );
};
