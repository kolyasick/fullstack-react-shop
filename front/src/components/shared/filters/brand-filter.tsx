import type { Brand } from "../../../types/product";
import BrandFilterItem from "./brand-filter-item";

type Props = {
  brands: Brand[];
  selectedBrands: Set<Brand["title"]>;
  setBrand: (c: Brand["title"]) => void;
};

const BrandFilter: React.FC<Props> = ({ brands, selectedBrands, setBrand }) => {
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-3">Бренды</h4>
      {brands.map((b) => (
        <BrandFilterItem
          key={b.id}
          brand={b}
          checked={selectedBrands.has(b.title)}
          setBrand={setBrand}
        />
      ))}
    </div>
  );
};

export default BrandFilter;
