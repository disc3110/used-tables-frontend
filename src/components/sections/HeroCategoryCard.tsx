import Image from "next/image";
import Link from "next/link";

interface HeroCategoryCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroCategoryCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
}: HeroCategoryCardProps) {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-white/30 bg-white/30 p-3 text-[#4f5363] shadow-[0_15px_40px_rgba(90,92,110,0.15)] backdrop-blur-xl">
      <div className="relative mb-3 flex h-36 items-center justify-center overflow-hidden rounded-[1.1rem] bg-white/45">
        {imageSrc ? (
          <>
            <div className="absolute inset-0 bg-white/20" />
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              className="object-contain p-4 opacity-90 transition duration-500 group-hover:scale-[1.03]"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm tracking-[0.2em] text-[#6d7285]/70 uppercase">
            Image Coming Soon
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-base font-medium tracking-[0.08em] uppercase">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-[#666b7d]">
            {description}
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex w-full items-center justify-center rounded-full border border-[#7b8094] bg-[#5d6273] px-4 py-2 text-xs font-medium tracking-[0.18em] text-white uppercase transition hover:bg-[#4f5363]"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}