"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("buy");
  const [price, setPrice] = useState(1500000);

  const savings = activeTab === "buy"
    ? price >= 9000000 ? price * 0.08 : price >= 7500000 ? price * 0.05 : price * 0.03
    : price >= 9000000 ? price * 0.06 : price >= 7500000 ? price * 0.04 : price * 0.02;

  const formatPHP = (val: number) =>
    "₱" + Math.round(val).toLocaleString("en-PH");

  const tiers = [
    { pct: "3%", label: "Above ₱5M" },
    { pct: "5%", label: "Above ₱7.5M" },
    { pct: "8%", label: "Above ₱9M" },
  ];

  return (
    <section className="py-24 bg-white dark:bg-darkmode">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-6">

        <div className="text-center mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-200 dark:border-emerald-800">
            Smart Buying
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-midnight_text dark:text-white">
            Estimate Your Savings
          </h2>
          <p className="text-gray dark:text-gray-300 text-lg mt-3 max-w-xl mx-auto">
            See how much you can save when you buy or sell through Venje Realty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div data-aos="fade-right">
            <div className="grid grid-cols-3 gap-4 mb-10">
              {tiers.map((t, i) => (
                <div key={i} className="bg-gray-50 dark:bg-darklight rounded-2xl p-5 border border-gray-100 dark:border-dark_border text-center hover:border-primary dark:hover:border-primary transition-all">
                  <p className="text-3xl font-extrabold text-primary mb-1">{t.pct}</p>
                  <p className="text-xs text-gray uppercase tracking-wide font-semibold">Savings</p>
                  <p className="text-sm text-gray mt-1">{t.label}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-3 mb-10">
              {[
                "No hidden fees — transparent pricing always",
                "Exclusive listings not found anywhere else",
                "Dedicated agent from inquiry to turnover",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray dark:text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/properties/properties-list" className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all">
                Buy a Property
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all">
                Talk to an Agent
              </Link>
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-dark_border">

              <div className="bg-primary px-8 pt-8 pb-6">
                <p className="text-white font-bold text-xl mb-4">Savings Calculator</p>
                <div className="flex bg-white/10 rounded-xl p-1 w-fit">
                  {["buy", "sell"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                        activeTab === tab ? "bg-white text-primary" : "text-white hover:bg-white/10"
                      }`}
                    >
                      {tab === "buy" ? "Buying" : "Selling"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-darklight px-8 py-8">
                <div className="bg-gray-50 dark:bg-darkmode rounded-2xl p-6 mb-6 text-center">
                  <p className="text-gray text-sm mb-1 uppercase tracking-wide font-semibold">Property Price</p>
                  <p className="text-4xl font-extrabold text-midnight_text dark:text-white">{formatPHP(price)}</p>
                </div>

                <div className="mb-6">
                  <input
                    type="range"
                    min="1000000"
                    max="20000000"
                    step="100000"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray mt-1 font-medium">
                    <span>₱1M</span>
                    <span>₱20M</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-6 py-5">
                  <div>
                    <p className="text-gray text-sm uppercase tracking-wide font-semibold mb-1">Estimated Savings</p>
                    <p className="text-3xl font-extrabold text-primary">{formatPHP(savings)}</p>
                  </div>
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-semidark px-8 py-4 flex items-center justify-between border-t border-gray-100 dark:border-dark_border">
                <div>
                  <p className="text-gray text-xs">Have Questions?</p>
                  <p className="text-midnight_text dark:text-white font-semibold text-sm">+63 975 886 8962</p>
                </div>
                <Link href="/contact" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all">
                  Contact Us
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
