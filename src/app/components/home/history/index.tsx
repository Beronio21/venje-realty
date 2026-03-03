import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function History() {
  return (
    <section className="py-24 bg-white dark:bg-darkmode overflow-hidden">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-200 dark:border-emerald-800">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-midnight_text dark:text-white leading-tight mb-6">
              How Venje Realty <br />
              <span className="text-primary">Became #1</span>
            </h2>
            <p className="text-gray dark:text-gray-300 text-lg mb-4 leading-relaxed">
              Venje Realty was founded with a simple mission — make finding your dream property in the Philippines as easy as possible. We started in Cagayan de Oro and grew to serve clients across Mindanao and beyond.
            </p>
            <p className="text-gray dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Today, we've helped hundreds of families and investors find the right home or commercial space, with a team that genuinely cares about every client.
            </p>
            <Link
              href="/properties/properties-list"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all"
            >
              Browse Properties
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right - Stats cards */}
          <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
            {[
              { number: "10+", label: "Years Experience", icon: "🏆" },
              { number: "500+", label: "Happy Clients", icon: "😊" },
              { number: "₱2.5B", label: "Total Sales", icon: "💰" },
              { number: "200+", label: "Properties Listed", icon: "🏠" },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 dark:bg-darklight rounded-2xl p-6 border border-gray-100 dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all group">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-3xl font-extrabold text-midnight_text dark:text-white group-hover:text-primary transition-colors">{stat.number}</p>
                <p className="text-gray text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
