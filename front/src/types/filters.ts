export type PriceRange = {
  priceFrom?: number;
  priceTo?: number;
};

export type Stock = "STOCK" | "OUT_OF_STOCK" | "ALL";

export type StockFilterType = {
  title: string;
  value: Stock;
};
