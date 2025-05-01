import React from "react";
import type { ProductFilters } from "../types";

interface AsideProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

const Aside: React.FC<AsideProps> = ({ filters, onChange }) => {
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    group: keyof ProductFilters,
    value: string
  ) => {
    const checked = e.target.checked;
    let newFilters: ProductFilters = { ...filters };
    if (!Array.isArray(newFilters[group])) newFilters[group] = [];
    if (checked) {
      newFilters[group] = [...(newFilters[group] || []), value];
    } else {
      newFilters[group] = (newFilters[group] || []).filter((v) => v !== value);
    }
    onChange(newFilters);
  };

  return (
    <aside className="absolute top-32 left-0 z-40 w-64 rounded-xl bg-white p-6 ml-5 border border-gray-100 hidden md:block">
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Filtros</h2>
        <div className="h-px bg-red-500 mb-6"></div>
      </div>
      <div className="space-y-6">
        <div className="mb-4">
          <h3 className="mb-3 font-semibold text-gray-800">Género</h3>
          <div className="space-y-2">
            {["Hombre", "Mujer", "Unisex"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  checked={filters.gender?.includes(g) || false}
                  onChange={(e) => handleCheckboxChange(e, "gender", g)}
                />
                <span className="text-gray-700 hover:underline">{g}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="mb-3 font-semibold text-gray-800">Marca</h3>
          <div className="space-y-2">
            {["Nike", "Adidas", "Louis Vuitton"].map((b) => (
              <label
                key={b}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  checked={filters.brand?.includes(b) || false}
                  onChange={(e) => handleCheckboxChange(e, "brand", b)}
                />
                <span className="text-gray-700 hover:underline">{b}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="mb-3 font-semibold text-gray-800">Precio</h3>
          <div className="space-y-2">
            {[
              { label: "$0 - $100", value: "0-100" },
              { label: "$100 - $200", value: "100-200" },
              { label: "$200+", value: "200+" },
            ].map((p) => (
              <label
                key={p.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  checked={filters.price?.includes(p.value) || false}
                  onChange={(e) => handleCheckboxChange(e, "price", p.value)}
                />
                <span className="text-gray-700 hover:underline">{p.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
