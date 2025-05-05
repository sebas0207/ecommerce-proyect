// components/Footer.tsx
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const sucribir = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert("Gracias por suscribirte 💌");
      setEmail("");
    } else {
      alert("Por favor, ingresa un email ❌");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 border-b border-gray-200 pb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text">
                NeonVibe
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-md">
              Descubre el equilibrio perfecto entre estilo y comodidad en
              nuestra colección exclusiva de calzado.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-gray-600">
              Recibe las últimas tendencias y ofertas exclusivas.
            </p>
            <form className="flex gap-2" onSubmit={sucribir}>
              <input
                id="emailInput"
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-500"
              />
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                type="submit"
              >
                Suscríbete
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Reusable link groups */}
          {[
            {
              title: "Colecciones",
              links: [
                { label: "Zapatos de Mujer", href: "/catalogo?gender=Mujer" },
                { label: "Zapatos de Hombre", href: "/catalogo?gender=Hombre" },
                { label: "Zapatos UniSex", href: "/catalogo?gender=Unisex" },
              ],
            },
            {
              title: "Atención al Cliente",
              links: [{ label: "Contacto", href: "/info#contacto" }],
            },
            {
              title: "Empresa",
              links: [
                { label: "Sobre Nosotros", href: "/info#sobre-nosotros" },
              ],
            },
          ].map((section, i) => (
            <div key={i} className="space-y-6">
              <h6 className="font-semibold text-lg text-red-600 uppercase tracking-wider">
                {section.title}
              </h6>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social media */}
          <div className="space-y-6">
            <h6 className="font-semibold text-lg text-red-600 uppercase tracking-wider">
              Síguenos
            </h6>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "Twitter"].map((name, i) => (
                <a
                  key={i}
                  href="/"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <img
                    src={`/svg/${name}.svg`}
                    alt={name}
                    className="hover:opacity-70 transition-opacity duration-200"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            2025 NeonVibe. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="/info#terminos"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Términos
            </a>
            <a
              href="/info#privacidad"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Privacidad
            </a>
            <a
              href="/info#cookies"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
