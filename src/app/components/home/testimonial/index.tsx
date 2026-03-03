import React from 'react';

const testimonials = [
  {
    quote: "Venje Realty made finding our home in Cagayan de Oro so effortless. Their team was professional, patient, and genuinely cared about finding the right fit for us.",
    name: "Juan dela Cruz",
    role: "Homeowner, Cagayan de Oro",
    initials: "JD",
    color: "bg-emerald-500",
  },
  {
    quote: "I was looking for an investment property in Davao and Venje Realty delivered beyond expectations. Fast, reliable, and transparent throughout the whole process.",
    name: "Maria Santos",
    role: "Investor, Davao City",
    initials: "MS",
    color: "bg-amber-500",
  },
  {
    quote: "From the first inquiry to the final handover, the team was always there to guide us. Best real estate experience I've had in the Philippines.",
    name: "Roberto Reyes",
    role: "Property Owner, Cebu",
    initials: "RR",
    color: "bg-sky-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-semidark">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-6">

        <div className="text-center mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-200 dark:border-emerald-800">
            What Clients Say
          </div>
          <h2 className="text-4xl font-extrabold text-midnight_text dark:text-white">
            Trusted by Hundreds of Filipinos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white dark:bg-darklight rounded-2xl p-8 border border-gray-100 dark:border-dark_border shadow-sm hover:shadow-md hover:border-primary dark:hover:border-primary transition-all" data-aos="fade-up" data-aos-delay={`${i * 100}`}>
              {/* Quote icon */}
              <svg className="w-10 h-10 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray dark:text-gray-300 text-base leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-midnight_text dark:text-white">{t.name}</p>
                  <p className="text-gray text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
