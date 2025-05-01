import React, { useState } from "react";
import type { ProductFilters } from "../types";

const FiltrosMobile: React.FC<{
  onApply: (filters: ProductFilters) => void;
}> = ({ onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ProductFilters>({
    gender: [],
    brand: [],
    price: [],
  });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    group: keyof ProductFilters,
    value: string
  ) => {
    const checked = e.target.checked;
    setLocalFilters((prev) => {
      const updatedGroup = new Set(prev[group]);
      if (checked) {
        updatedGroup.add(value);
      } else {
        updatedGroup.delete(value);
      }
      return { ...prev, [group]: Array.from(updatedGroup) };
    });
  };

  const handleApply = () => {
    onApply(localFilters);
    setIsOpen(false);
  };

  const options = {
    gender: ["Hombre", "Mujer", "Unisex"],
    brand: ["Nike", "Adidas", "Louis Vuitton"],
    price: [
      { label: "€0 - €100", value: "0-100" },
      { label: "€100 - €200", value: "100-200" },
      { label: "€200+", value: "200+" },
    ],
  };

  return (
    <div className="bg-gray-950 text-white p-1 max-sm:block sm:hidden">
      <div className="flex justify-between items-center ml-2">
        <h2 className="font-bold">Filtrar por</h2>
        <div className="p-1">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <img
              src="/svg/Filtro.svg"
              alt="IconFiltro"
              className="w-8 h-8 invert"
            />
          </a>
          {/* Modal */}
          <div
            className={`${isOpen ? "" : "hidden"} fixed inset-0 bg-black z-50`}
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="fixed bg-white w-[300px] h-full top-0 right-0 bottom-0 rounded-l-lg shadow-xl z-[101]">
              <div className="flex flex-col h-full gap-3 p-5 relative">
                <button
                  className="absolute top-4 left-4 text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <h3 className="text-gray-800 font-bold text-xl text-center mt-4 mb-2">
                  Filtrar por
                </h3>

                {/* Gender */}
                <div>
                  <h4 className="text-gray-700 font-semibold mb-2">Género</h4>
                  {options.gender.map((g) => (
                    <label key={g} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={localFilters.gender?.includes(g)}
                        onChange={(e) => handleCheckboxChange(e, "gender", g)}
                      />
                      <span className="text-gray-700">{g}</span>
                    </label>
                  ))}
                </div>

                {/* Brand */}
                <div>
                  <h4 className="text-gray-700 font-semibold mb-2">Marca</h4>
                  {options.brand.map((b) => (
                    <label key={b} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={localFilters.brand?.includes(b)}
                        onChange={(e) => handleCheckboxChange(e, "brand", b)}
                      />
                      <span className="text-gray-700">{b}</span>
                    </label>
                  ))}
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-gray-700 font-semibold mb-2">Precio</h4>
                  {options.price.map((p) => (
                    <label
                      key={p.value}
                      className="flex items-center gap-2 mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={localFilters.price?.includes(p.value)}
                        onChange={(e) =>
                          handleCheckboxChange(e, "price", p.value)
                        }
                      />
                      <span className="text-gray-700">{p.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  className="mt-auto bg-black text-white rounded-lg p-3 font-medium"
                  onClick={handleApply}
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrosMobile;
