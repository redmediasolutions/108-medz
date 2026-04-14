"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";

/* ---------------- TYPE ---------------- */
type Slide = {
  id: string;
  label?: string;
  title?: string;
  description?: string;
  imageweb?: string;
  content?: string[];
  order?: number;
  isPublish?: boolean;
};

export default function HeroSlider() {
  console.log("🔥 HeroSlider component rendered");

  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);

  /* ---------------- FETCH FROM FIREBASE ---------------- */
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log("🚀 Fetching Homecarousel...");

        const q = query(
          collection(db, "Homecarousel"),
          where("isPublish", "==", true)
          // orderBy("order", "asc") // enable after index
        );

        const snapshot = await getDocs(q);

        console.log("📄 Docs count:", snapshot.docs.length);

        const data: Slide[] = snapshot.docs.map((doc) => {
          const docData = doc.data();

          console.log("📃 Document:", {
            id: doc.id,
            ...docData,
          });

          return {
            id: doc.id,
            ...docData,
          };
        }) as Slide[];

        /* Optional local sort (no index needed) */
        data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        console.log("✅ Final Slides:", data);

        setSlides(data);
      } catch (err) {
        console.error("❌ Carousel fetch error:", err);
      }
    };

    fetchSlides();
  }, []);

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  /* ---------------- EMPTY STATE ---------------- */
  if (!slides.length) {
    console.log("⚠️ No slides yet");

    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        Loading banners...
      </div>
    );
  }

  const current = slides[index];

  console.log("🧠 Current Slide:", current);

  /* ---------------- IMAGE SELECT ---------------- */
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const image = isMobile
    ? current.content?.[0]
    : current.imageweb;

  /* ---------------- UI ---------------- */
  return (
    <section className="px-4">
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" />

        <div className="relative grid md:grid-cols-2 items-center min-h-[400px]">

          {/* LEFT CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="p-10 md:p-14 text-white"
            >
              <p className="text-yellow-400 font-semibold tracking-widest text-sm mb-2">
                {current.label || "MORE CARE"}
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                {current.title || "LESS COST"}
              </h1>

              <p className="text-white/80 text-lg mb-6 max-w-md">
                {current.description ||
                  "Get affordable medicines delivered to your doorstep."}
              </p>

              <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
                Shop Now
              </button>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT IMAGE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-end h-full"
            >
              {image && (
                <img
                  src={image}
                  alt="Hero"
                  className="h-[350px] object-contain drop-shadow-2xl"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === i ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}