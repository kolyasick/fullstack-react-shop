import type { PriceRange } from "../../../types/filters";

type Props = {
  priceRange: PriceRange;
  setPriceRange: (key: keyof PriceRange, value: number) => void;
};

export const PriceFilter: React.FC<Props> = ({ priceRange, setPriceRange }) => {
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-3">Цена, $</h4>
      <div className="flex space-x-2">
        <input
          type="number"
          onChange={(e) => setPriceRange("priceFrom", e.target.valueAsNumber)}
          value={priceRange.priceFrom || 0}
          placeholder="От"
          className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
        />
        <input
          type="number"
          onChange={(e) => setPriceRange("priceTo", e.target.valueAsNumber)}
          value={priceRange.priceTo || 0}
          placeholder="До"
          className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
        />
      </div>
    </div>
  );
};

