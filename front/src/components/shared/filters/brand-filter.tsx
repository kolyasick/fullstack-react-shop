import type { Brand } from "../../../types/product";
import Skeleton from "../skeleton";
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
      {brands.length > 0 ? (
        brands.map((b) => (
          <BrandFilterItem
            key={b.id}
            brand={b}
            checked={selectedBrands.has(b.title)}
            setBrand={setBrand}
          />
        ))
      ) : (
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} width={120} height={25} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandFilter;
