import type { Brand } from "../../../models/product/api";
import { BrandFilterItem, FilterSkeleton } from "../../../components";

type Props = {
  brands: Brand[];
  selectedBrands: Set<Brand["title"]>;
  setBrand: (c: Brand["title"]) => void;
};

export const BrandFilter: React.FC<Props> = ({
  brands,
  selectedBrands,
  setBrand,
}) => {
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
            <FilterSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};
