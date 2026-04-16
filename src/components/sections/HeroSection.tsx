"use client";

export default function HeroSection() {
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
        
        <div className="absolute top-[30%] left-[20%] w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold">
          8
        </div>

        <div className="absolute top-[50%] right-[25%] w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
          1
        </div>

        <div className="absolute bottom-[30%] left-[40%] w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold">
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