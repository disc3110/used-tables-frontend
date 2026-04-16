export default function WhyUsSection() {
  const items = [
    {
      title: "Inspected & Cleaned",
      description: "Every table is reviewed and prepared before being listed.",
    },
    {
      title: "Delivery Available",
      description: "We can help coordinate delivery depending on your location.",
    },
    {
      title: "Setup Support",
      description: "Installation and setup options may be available on select tables.",
    },
    {
      title: "Curated Selection",
      description: "We focus on quality used tables worth bringing into your space.",
    },
  ];

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Why Buy From Us</h2>
        <p className="text-gray-500 mt-2">
          A more reliable way to shop for used game tables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}