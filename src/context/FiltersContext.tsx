import React, { createContext, useContext, useState } from "react";
import type { ProductFilters } from "../types";

type FiltersContextType = {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<ProductFilters>({});
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters must be used within FiltersProvider");
  return context;
};
