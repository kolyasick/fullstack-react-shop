import { useState } from "react";
import type { ProductResponse } from "../models/product/api";

export const usePaginationState = () => {
  const [pagginationInfo, setPaginationInfo] = useState<Omit<
    ProductResponse,
    "products"
  > | null>(null);

  return {
    pagginationInfo,
    setPaginationInfo,
  };
};
