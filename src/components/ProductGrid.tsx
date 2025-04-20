import { useEffect, useState } from "react";
import type { Product } from "../types";
import { addToCart } from "../store/cart";

interface ProductGridProps {
  products: Product[];
}

const availableSizes = [37, 38, 39, 40, 41, 42, 43, 44, 45];

export default function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId =
      params.get("producto") || localStorage.getItem("productoId");

    if (productId) {
      const productElement = document.getElementById(productId);
      if (productElement) {
        productElement.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("productoId");
    }
  }, []);

  const [openSizeSelector, setOpenSizeSelector] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>(
    {}
  );

  const handleSizeSelect = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    if (product.soldOut) {
      alert("Producto agotado");
      return;
    }
    setOpenSizeSelector(product.id);
  };

  const handleConfirmSize = (product: Product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Por favor selecciona una talla");
      return;
    }
    addToCart({
      id: Number(product.id),
      title: product.name,
      image: product.imageUrl,
      price: product.price,
      size,
    });
    setOpenSizeSelector(null);
    alert("Producto agregado al carrito 🛒");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:ml-80 md:mr-5 mb-8 px-4 sm:px-0 max-w-5xl md:max-w-none mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          id={String(product.id)}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full"
        >
          <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-3 sm:p-6">
            <h3 className="text-sm sm:text-lg font-medium text-gray-900 capitalize">
              {product.name.replace(/-/g, " ")}
            </h3>
            <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-gray-900">
              €{product.price.toFixed(2)}
            </p>
            <button
              className="mt-3 sm:mt-6 w-full bg-black text-white py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-lg"
              onClick={() => handleAddToCart(product)}
            >
              Añadir al carrito
            </button>
            {openSizeSelector === product.id && !product.soldOut && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Selecciona tu talla:
                </p>
                <div className="grid grid-cols-5 gap-1">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`p-1 text-xs sm:text-sm border rounded-md transition-colors ${
                        selectedSizes[product.id] === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-800 border-gray-300 hover:border-black"
                      }`}
                      onClick={() => handleSizeSelect(product.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg lg:py-3 hover:bg-green-700 transition-colors text-sm cursor-pointer"
                  onClick={() => handleConfirmSize(product)}
                >
                  Confirmar talla y añadir
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
