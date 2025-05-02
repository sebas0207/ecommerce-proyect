import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import ProductGrid from "./ProductGrid";
import { products } from "../store/products";
import type { ProductFilters } from "../types";
import FiltrosMobile from "./FiltrosMobile";

const CatalogIsland: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({});

  // Capturar parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gender = params.get('gender');
    if (gender) {
      setFilters(prev => ({ ...prev, gender: [gender] }));
    }
  }, []);

  return (
    <>
      <FiltrosMobile onApply={setFilters} />
      <div className="flex mt-6">
        <Aside filters={filters} onChange={setFilters} />
        <div className="flex-1 mt-6">
          <ProductGrid products={products} filters={filters} />
        </div>
      </div>
    </>
  );
};

export default CatalogIsland;
