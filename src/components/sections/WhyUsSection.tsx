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
      title: "Felt and Cloth",
      description:
        "The playing surface cloth plays a significant role in the game's quality. This table comes included with your choice of new cloth. With almost 30 different cloth colours in stock.",
    },
  ];

  return (
    <section className="bg-[#bc9355] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#505a80]">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#374161]">
            Why Buy From Us
          </h2>
          <p className="mt-2 text-[#505a80]">
            A more reliable way to shop for used game tables.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#7e8ebf] bg-[#f5f7ff] p-6 shadow-[0_22px_48px_rgba(80,90,128,0.15)]"
            >
              <h3 className="text-xl font-semibold text-[#374161]">
                {item.title}
              </h3>
              <p className="mt-2 text-[#5b648a]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
