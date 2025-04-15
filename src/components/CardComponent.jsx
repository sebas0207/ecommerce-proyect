"use client";

import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { cartItems, removeFromCart } from "../store/cart";
import SimulacionPago from "./SimulacionPago";

export default function CartComponent() {
  const items = useStore(cartItems);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    console.log("CartComponent mounted, items:", items);
  }, []);

  const subtotal = items.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );
  const shipping = 8;
  const total = subtotal + shipping;

  return (
    <div className="w-full rounded-3xl bg-white shadow-xl overflow-hidden">
      {mostrarFormulario ? (
        <SimulacionPago />
      ) : (
        <>
          {/* Header */}
          <div className=" bg-gradient-to-t from-gray-200 to-red-600 p-6 text-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <h2 className="text-xl font-bold">Tu Carrito</h2>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {items.length} {items.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-8">
            {/* Empty state */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-white p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-red-500"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500 max-w-md">
                  Parece que aún no has añadido ningún producto a tu carrito
                </p>
                <button className="mt-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <a href="/catalogo">Continuar comprando</a>
                </button>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="py-6 flex flex-col sm:flex-row gap-4 sm:gap-6 relative"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gray-100 w-24 h-24 border border-solid border-red-500 sm:h-32 sm:w-32 flex-shrink-0">
                        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                          {item.quantity}
                        </span>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110 "
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                          <div className="pr-8 sm:pr-5">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-red-500 transition-colors">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              36EU - 4US
                            </p>
                          </div>

                          <div className="mt-2 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="text-lg font-bold text-red-500 sm:order-2 sm:ml-8 sm:text-right">
                              €{((item.price || 0) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <span className="sr-only">Eliminar</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Order summary */}
                <div className="mt-10">
                  <div className="rounded-2xl bg-gray-50 p-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">
                      Resumen de compra
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium text-gray-900">
                          €{subtotal.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-gray-500"
                          >
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                          </svg>
                          <p className="text-gray-600">Envío</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          €{shipping.toFixed(2)}
                        </p>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex items-center justify-between">
                        <p className="text-base font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-xl font-bold text-black">
                          €{total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Checkout button */}
                <div className="mt-8">
                  <button
                    onClick={() => setMostrarFormulario(true)}
                    className="group w-full bg-black text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                  >
                    Realizar Orden
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Envío seguro y rápido a toda España
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
