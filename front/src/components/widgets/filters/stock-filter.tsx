import { StockFilterItem } from "../../../components";
import type { Stock, StockFilterType } from "../../../types/filters";

type Props = {
  stockFilter: Stock;
  setStock: React.Dispatch<React.SetStateAction<Stock>>;
};

export const StockFilter: React.FC<Props> = ({ setStock, stockFilter }) => {
  const stockFilters: StockFilterType[] = [
    {
      title: "Все",
      value: "ALL",
    },
    {
      title: "В наличии",
      value: "STOCK",
    },
    {
      title: "Нет в наличии",
      value: "OUT_OF_STOCK",
    },
  ];

  return (
    <div className="mb-6">
      <h4 className="font-medium mb-3">Наличие</h4>
      <div className="space-y-2">
        {stockFilters.map((f) => (
          <StockFilterItem
            filter={f}
            key={f.title}
            selectedFilter={stockFilter}
            setStockFilter={setStock}
          />
        ))}
      </div>
    </div>
  );
};
