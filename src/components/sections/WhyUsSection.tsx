export default function WhyUsSection() {
  const items = [
    {
      title: "Table Structure",
      description:
        "Our technicians carefully assess the overall structural integrity of the pool table. They check for any signs of warping, bending, or damage to the frame and legs, ensuring that the table's foundation is sturdy and stable.",
    },
    {
      title: "Delivery and Setup Available",
      description:
        "Installation and setup options may be available on select tables within metro Vancouver.",
    },
    {
      title: "Playing Surface",
      description:
        "Our technicians meticulously inspect it for any imperfections, scratches, or unevenness. They use precision tools to measure the slate's flatness and ensure it meets regulation standards for accurate ball roll.",
    },
    {
      title: "Cloth Quality ",
      description:
        "The playing surface cloth plays a significant role in the game's quality. This table comes included with your choice of new cloth. With almost 30 different cloth colours in stock.",
    },
  ];

  return (
    <section className="bg-[radial-gradient(circle_at_top,#fffaf2_0%,#f6efe3_52%,#f3eadb_100%)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#a46f24]">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-5xl leading-[0.94] text-[#0d1b29] [font-family:Georgia,Times,'Times_New_Roman',serif] md:text-6xl">
            Why Buy From Us
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4b4e53]">
            A more reliable way to shop for used game tables.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[#e3d5c1] bg-[#fffdfa] shadow-[0_20px_44px_rgba(46,34,20,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={item.title}
                className={`px-7 py-8 md:px-8 ${index > 0 ? "border-t border-[#ebe1d3]" : ""} ${index >= 2 ? "md:border-t md:border-[#ebe1d3]" : "md:border-t-0"} ${index % 2 === 1 ? "md:border-l md:border-[#ebe1d3]" : "md:border-l-0"} ${index > 0 ? "xl:border-l xl:border-[#ebe1d3]" : "xl:border-l-0"} xl:border-t-0`}
              >
                <div className="mb-5 h-px w-14 bg-[#c89f57]" />
                <h3 className="text-[1.9rem] leading-[1.02] text-[#0f2030] [font-family:Georgia,Times,'Times_New_Roman',serif]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-8 text-[#4e5157]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
