import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Pool Tables",
    href: "/products/pool-tables",
    cta: "Shop Pool Tables",
    imageSrc: "/images/categories/pool-background.png",
    imageAlt: "Pool table",
  },
  {
    title: "Ping Pong Tables",
    href: "/products/ping-pong",
    cta: "Shop Ping Pong Tables",
    imageSrc: "/images/categories/ping-pong-background.png",
    imageAlt: "Ping pong table",
  },
  {
    title: "Foosball Tables",
    href: "/products/foosball",
    cta: "Shop Foosball Tables",
    imageSrc: "/images/categories/foosball-background.png",
    imageAlt: "Foosball table",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[radial-gradient(circle_at_top,#fffaf4_0%,#f6efe4_58%,#f3eadc_100%)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
            Shop Your Way
          </p>
          <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-7xl">
            Browse by Category
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4b4e53]">
            Find the perfect table for your space.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group block"
            >
              <article className="overflow-hidden rounded-[1.8rem] border border-[#e5d9c9] bg-[#fffdfa] shadow-[0_18px_42px_rgba(46,34,20,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_58px_rgba(46,34,20,0.14)]">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="bg-[linear-gradient(180deg,#fffdfa_0%,#f8f3eb_100%)] px-7 py-6">
                  <h3 className="text-[2rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                    {category.title}
                  </h3>

                  <div className="mt-4 inline-flex items-center gap-2 text-base font-medium text-[#a46f24] transition group-hover:text-[#85561c]">
                    <span>{category.cta}</span>
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none transition duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
