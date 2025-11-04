import { useContext } from "react";
import { FilterActionsContext } from "./use-filters.context";

export const useFilterActions = () => {
  const context = useContext(FilterActionsContext);
  if (context === undefined) {
    throw new Error("useFilterActions must be used within a FilterProvider");
  }
  return context;
};
