import type { Category } from "../../../types/product";

type Props = {
  brand: Category;
  checked: boolean;
  setBrand: (c: Category["title"]) => void;
};

const BrandFilterItem: React.FC<Props> = ({ brand, checked, setBrand }) => {
  return (
    <div className="space-y-2 max-h-40 overflow-y-auto">
      <label className="flex items-center">
        <input
          onChange={() => setBrand(brand.title)}
          checked={checked}
          type="checkbox"
          className="mr-2"
        />
        {brand.title}
      </label>
    </div>
  );
};

export default BrandFilterItem;
