import type { Product } from "../types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6  md:ml-80 md:mr-5 mb-8 max-w-5xl md:max-w-none mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          {product.soldOut && (
            <div className="relative text-end bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
              Sold Out
            </div>
          )}
          <div className="aspect-square overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 capitalize">
              {product.name.replace(/-/g, " ")}
            </h3>
            <p className="mt-2 text-xl font-bold text-gray-900">
              €{product.price.toFixed(2)}
            </p>
            <button
              className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
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
