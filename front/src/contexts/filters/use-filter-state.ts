import { useContext } from "react";
import { FilterStateContext } from "./use-filters.context";

export const useFilterState = () => {
  const context = useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterState must be used within a FilterProvider");
  }
  return context;
};

