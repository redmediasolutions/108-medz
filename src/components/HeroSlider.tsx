"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


const slides = [
  {
    title: "Your Trusted Medical Supply Partner",
    description:
      "Quality medical equipment and supplies delivered to your doorstep. FDA approved products with professional support.",
    image: "/doctor.jpg",
  },
  {
    title: "Healthcare Made Simple",
    description:
      "Shop diagnostic tools, wellness products, and medical essentials with confidence.",
    image: "/medical-tools.jpg",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-4xl font-bold mb-4">
              {slides[index].title}
            </h1>

            <p className="text-lg text-white/80 mb-6">
              {slides[index].description}
            </p>

            <div className="flex gap-4">
              {/* Primary CTA */}
              <button
                className="px-6 py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                Shop Now
              </button>

              {/* Secondary CTA */}
              <button
                className="px-6 py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* IMAGE CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src={slides[index].image}
                alt="Medical"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-secondary">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${index === i ? "bg-secondary" : "bg-secondary/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}