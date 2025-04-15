import { useState } from "react";
import { cartItems } from "../store/cart";

export default function SimulacionPago() {
  const [datos, actDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  const [estadoPago, setEstadoPago] = useState("");
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const cambio = (e) => {
    actDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (!datos.nombre || !datos.correo || !datos.telefono || !datos.direccion) {
      alert("Por favor completa todos los campos");
      return;
    }
    setFormularioEnviado(true);
    setEstadoPago("Procesando 👟 ...");

    setTimeout(() => {
      setEstadoPago("Pagado ✅");
    }, 2000);
  };

  function limpiarCarrito() {
    cartItems.set([]);
    console.log("Carrito limpiado");
    window.location.href = "/";
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl">
      {!formularioEnviado ? (
        <form onSubmit={enviarFormulario} className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Detalles de Envío</h2>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-gray-500 hover:text-black"
            >
              <a href="/carrito">Volver al carrito</a>
            </button>
          </div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={datos.nombre}
            onChange={cambio}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={datos.correo}
            onChange={cambio}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={datos.telefono}
            onChange={cambio}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección de Envío"
            value={datos.direccion}
            onChange={cambio}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold hover:shadow-lg transition-all"
          >
            Realizar Orden
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">{estadoPago}</h2>
          {estadoPago === "Pagado ✅" && (
            <div className="text-green-600 font-bold">
              <p className="text-gray-700 mt-2">
                Gracias por tu compra, {datos.nombre}!
                <br />
                Un correo de confirmación ha sido enviado a {datos.correo}.
              </p>
              <button
                onClick={limpiarCarrito}
                className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                Volver a la tienda
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
