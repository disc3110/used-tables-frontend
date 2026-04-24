const benefits = [
  {
    title: "Quality Checked",
    description: "Every table is inspected for quality and playability.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8">
        <path
          d="M12 3l7 3v5c0 4.6-2.8 8.2-7 10-4.2-1.8-7-5.4-7-10V6l7-3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12.5l2 2 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Delivery Available",
    description: "We offer local and nationwide delivery options.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8">
        <path
          d="M3 6h11v9H3zM14 9h3l4 4v2h-7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="18" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="18" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "Great Value",
    description: "Premium tables at a fraction of the original price.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8">
        <path
          d="M12 3l2.2 4.4 4.8.7-3.5 3.4.8 4.8L12 14.8 7.7 16.3l.8-4.8L5 8.1l4.8-.7L12 3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 20h7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Expert Support",
    description: "Our team is here to help you find the perfect table.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8">
        <path
          d="M6 18v-4a6 6 0 0112 0v4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 18H4v-4h2m12 4h2v-4h-2M10 20h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function TrustBenefits() {
  return (
    <div className="mt-16 rounded-[2rem] border border-[#dfd2be] bg-white/70 px-6 py-8 shadow-[0_20px_40px_rgba(77,58,34,0.08)] backdrop-blur-sm md:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`flex gap-4 lg:px-8 ${index < benefits.length - 1 ? "lg:border-r lg:border-[#dccfbf]" : ""}`}
          >
            <div className="mt-1 shrink-0 text-[#b27a2a]">{benefit.icon}</div>
            <div>
              <h3 className="text-lg font-medium text-[#102131]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#5c5e63]">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
