import { useEffect } from "react";
import type { Product } from "../types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("producto") || localStorage.getItem("productoId");

    if (productId) {
      const productElement = document.getElementById(productId);
      if (productElement) {
        productElement.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("productoId");
    }
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:ml-80 md:mr-5 mb-8 px-4 sm:px-0 max-w-5xl md:max-w-none mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          id={String(product.id)} // 👈 Asegurar que tenga un ID
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full"
        >
          {product.soldOut && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
              Sold Out
            </div>
          )}
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
              onClick={() => {
                if (product.soldOut) {
                  return alert("Producto agotado");
                }
                addToCart({
                  id: Number(product.id),
                  title: product.name,
                  image: product.imageUrl,
                  price: product.price,
                });
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import { addToCart } from "../store/cart";
