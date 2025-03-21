import { useState, useEffect } from "react";
import { Crown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { addToCart } from "../store/cart";
import { products } from "../store/products";

interface Event {
  id: string;
  title: string;
  image: string;
  badge?: string;
  price: number;
}

const events: Event[] = [
  {
    id: "2",
    title: "Nike 700",
    image: "/images/low.webp",
    badge: "Exclusive",
    price: 170.99,
  },
  {
    id: "3",
    title: "Nike Dunk Low",
    image: "/images/nike-dunk-low-00.webp",
    badge: "Exclusive",
    price: 199.99,
  },
  {
    id: "4",
    title: "Nike Genesis",
    image: "/images/low-3.webp",
    badge: "Exclusive",
    price: 199.99,
  },
  {
    id: "1",
    title: "Nike Cortez",
    image: "/images/nike-cortez.webp",
    badge: "Exclusive",
    price: 190.99,
  },
];

const variants = {
  center: {
    x: "-50%",
    rotate: 0,
    scale: 1,
    opacity: 1,
    zIndex: 3,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  left: {
    x: "-130%",
    rotate: -12,
    scale: 0.9,
    opacity: 0.8,
    zIndex: 2,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  right: {
    x: "30%",
    rotate: 12,
    scale: 0.9,
    opacity: 0.8,
    zIndex: 2,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  hidden: {
    opacity: 0,
    zIndex: 1,
    transition: { duration: 0.3 },
  },
};

export default function AppleInvites() {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = wrap(0, events.length, page);

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleSwipe = {
    drag: "x" as const,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.2,
    onDragEnd: (e: any, { offset, velocity }: any) => {
      const swipe = swipePower(offset.x, velocity.x);
      if (swipe < -swipeConfidenceThreshold) {
        paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1);
      }
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleEvents = [-1, 0, 1].map(
    (offset) => events[wrap(0, events.length, activeIndex + offset)]
  );

  const handleAddToCart = (event: Event) => {
    // Busca el producto correspondiente en la lista products por id
    const matchingProduct = products.find((product) => product.id === event.id);

    // Usa la imagen de products si existe, si no, usa la de event como fallback
    const cartImage = matchingProduct ? matchingProduct.imageUrl : event.image;

    // Llama a addToCart con la imagen de products
    addToCart({
      id: Number(event.id),
      title: event.title,
      image: cartImage, // Aquí pasamos la imagen de products
      price: event.price,
    });
  };

return (
  <div className="hidden md:block p-6 ">
    <div className="bg-gray-900 rounded-xl">
      <div className="relative flex min-h-screen w-full items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          {visibleEvents.map((event, index) => (
            <motion.div
              key={event.id}
              custom={direction}
              variants={variants}
              initial="hidden"
              animate={
                index === 1 ? "center" : index === 0 ? "left" : "right"
              }
              exit="hidden"
              className="absolute top-1/2 left-1/2 h-[160px] w-[120px] origin-center -translate-y-1/2 
              md:h-[400px] md:w-[240px] 
              lg:h-[490px] lg:w-[300px] 
              xl:h-[740px] xl:w-[430px]"
              {...handleSwipe}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-3">
                  <span className="flex flex-row items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl sm:text-sm">
                    <Crown size={14} />
                    {event.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 z-3 w-full overflow-hidden rounded-b-3xl p-6 text-white">
                  <p
                    className="text-sm mb-2.5 text-center font-bold 
                  md:text-base lg:text-lg xl:text-xl"
                  >
                    {event.title}
                  </p>
                  {/* Mostrar el precio */}
                  <p
                    className="text-xs mb-2.5 text-center font-bold 
                  md:text-sm lg:text-base xl:text-lg"
                  >
                    €{event.price.toFixed(2)}
                  </p>
                  {/* Button */}
                  <div className="text-center text-xs opacity-90">
                    <button
                      onClick={() => handleAddToCart(event)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 via-indigo-500 to-pink-200 group-hover:from-purple-400 group-hover:via-indigo-400 group-hover:to-pink-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-500"
                    >
                      <span className="relative px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Add to cart
                      </span>
                    </button>
                  </div>
                </div>

                <div className="fixed inset-x-0 bottom-0 isolate z-2 h-1/2">
                  <div className="gradient-mask-t-0 absolute inset-0 overflow-hidden rounded-3xl backdrop-blur-[1px]"></div>
                  <div className="gradient-mask-t-0 absolute inset-0 overflow-hidden rounded-3xl backdrop-blur-[2px]"></div>
                  <div className="gradient-mask-t-0 absolute inset-0 overflow-hidden rounded-3xl backdrop-blur-[3px]"></div>
                  <div className="gradient-mask-t-0 absolute inset-0 overflow-hidden rounded-3xl backdrop-blur-[6px]"></div>
                  <div className="gradient-mask-t-0 absolute inset-0 overflow-hidden rounded-3xl backdrop-blur-[12px]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </div>
);
}
