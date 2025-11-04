import type { Stock, StockFilterType } from "../../../types/filters";

type Props = {
  filter: StockFilterType;

  selectedFilter: Stock;
  setStockFilter: React.Dispatch<React.SetStateAction<Stock>>;
};

export const StockFilterItem: React.FC<Props> = ({
  filter,
  selectedFilter,
  setStockFilter,
}) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        onChange={() => setStockFilter(filter.value)}
        checked={filter.value === selectedFilter}
        name={filter.value}
        className="mr-2"
      />
      {filter.title}
    </label>
  );
};

