"use client";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="relative h-screen w-full overflow-hidden bg-green-900">
      
      {/* Mesa (placeholder por ahora) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90%] max-w-5xl aspect-[16/9] bg-green-700 rounded-2xl border-8 border-amber-900 flex items-center justify-center">
          <span className="text-white text-lg">Billiard Table</span>
        </div>
      </div>

      {/* Bolas (placeholder) */}
      <div className="absolute inset-0 pointer-events-none">
  
        {/* Bola 8 */}
       <div className="absolute top-[30%] left-[20%] w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
          style={{
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.4}px)`
          }}
        >
          8
        </div>

        {/* Bola 1 */}
        <div
          className="absolute top-[50%] right-[25%] w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
          style={{
            transform: `translate(${-scrollY * 0.3}px, ${scrollY * 0.3}px)`
          }}
        >
          1
        </div>

        {/* Bola 3 */}
        <div
          className="absolute bottom-[30%] left-[40%] w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.3}px)`
          }}
        >
          3
        </div>

      </div>

      {/* Texto opcional */}
      <div className="absolute bottom-10 w-full text-center text-white">
        <p className="text-sm opacity-70">Scroll to explore</p>
      </div>

    </section>
  );
}