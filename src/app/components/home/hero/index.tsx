"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { PropertyContext } from "@/context-api/PropertyContext";

const Hero = () => {
  const router = useRouter();
  const [propertiesData, setPropertiesData] = useState<any[]>([])
  const { properties, updateFilter } = useContext(PropertyContext)!;
  const [activeTab, setActiveTab] = useState("sell");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/propertydata')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setPropertiesData(data || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  const handleTabChange = (tab: any) => setActiveTab(tab);

  const handleSearchSell = () => {
    if (location.trim() === '') { setError('Please enter a location to search.'); return; }
    setError('');
    updateFilter('location', location);
    updateFilter('tag', 'sell');
    router.push(`/properties/properties-list`);
  };

  const handleSearchBuy = () => {
    if (location.trim() === '') { setError('Please enter a location to search.'); return; }
    setError('');
    updateFilter('location', location);
    updateFilter('tag', 'Buy');
    router.push(`/properties/properties-list`);
  };

  const suggestions = Array.from(new Set(propertiesData.map((item) => item.location)));
  const handleSelect = (value: any) => { setLocation(value); setShowSuggestions(false); };
  const handleSearch = activeTab === 'sell' ? handleSearchSell : handleSearchBuy;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-darkmode">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-emerald-50 via-green-50 to-transparent dark:from-emerald-950/20 dark:via-transparent rounded-bl-[120px] -z-0" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl -z-0" />

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-6 relative z-10 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">

          {/* Left content */}
          <div className="flex flex-col items-start" data-aos="fade-right">

            {/* Badge */}
            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              #1 Real Estate Platform in the Philippines
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-midnight_text dark:text-white leading-[1.1] mb-6">
              Find Your{" "}
              <span className="text-primary relative inline-block">
                Dream
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C47 1.5 100 1 199 5.5" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>{" "}
              Property in the Philippines
            </h1>

            <p className="text-lg text-gray dark:text-gray-300 mb-8 max-w-lg">
              Venje Realty connects buyers, sellers, and renters with premium properties across the Philippines. Trusted by hundreds of Filipino families.
            </p>

            {/* Search box */}
            <div className="w-full max-w-xl bg-white dark:bg-darklight rounded-2xl shadow-xl border border-gray-100 dark:border-dark_border overflow-visible">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 dark:border-dark_border">
                <button
                  onClick={() => handleTabChange("sell")}
                  className={`flex-1 py-3.5 text-base font-semibold transition-all rounded-tl-2xl ${activeTab === "sell" ? "bg-primary text-white" : "text-gray dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkmode"}`}
                >
                  Rent
                </button>
                <button
                  onClick={() => handleTabChange("buy")}
                  className={`flex-1 py-3.5 text-base font-semibold transition-all rounded-tr-2xl ${activeTab === "buy" ? "bg-primary text-white" : "text-gray dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkmode"}`}
                >
                  Buy
                </button>
              </div>

              {/* Search input */}
              <div className="p-5">
                <div className="relative flex items-center mb-4">
                  <div className="absolute left-4">
                    <Image src="/images/svgs/icon-location.svg" alt="location" height={20} width={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by city or area..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    className="py-4 pr-4 pl-12 w-full rounded-xl text-midnight_text dark:text-white border border-gray-200 dark:border-dark_border focus:border-primary focus-visible:outline-none dark:bg-darkmode text-base"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-semidark border border-gray-100 dark:border-dark_border rounded-xl z-20 shadow-lg max-h-40 overflow-y-auto">
                      {suggestions.map((item, index) => (
                        <div key={index} onClick={() => handleSelect(item)} className="px-5 py-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-midnight_text dark:text-white text-base">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSearch} className="flex-1 py-4 bg-primary hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all text-base">
                    Search Properties
                  </button>
                  <button onClick={handleSearch} className="flex-1 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl transition-all text-base">
                    Advanced
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                    </svg>
                  ))}
                </div>
                <span className="text-midnight_text dark:text-white font-semibold">4.9/5</span>
                <span className="text-gray text-sm">from 658 reviews</span>
              </div>
              <div className="h-5 w-px bg-gray-200 dark:bg-dark_border" />
              <span className="text-gray text-sm">500+ Happy Clients</span>
            </div>
          </div>

          {/* Right image */}
          <div className="hidden lg:block relative" data-aos="fade-left">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/hero-image.jpg"
                alt="Venje Realty - Premium Properties in the Philippines"
                width={620}
                height={520}
                className="object-cover w-full h-[520px]"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 bg-white dark:bg-darklight rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-midnight_text dark:text-white">200+</p>
                  <p className="text-gray text-sm">Properties Listed</p>
                </div>
              </div>
              {/* Top right badge */}
              <div className="absolute top-6 right-6 bg-white dark:bg-darklight rounded-2xl shadow-lg px-4 py-3 text-center">
                <p className="text-primary font-bold text-lg">₱2.5B+</p>
                <p className="text-gray text-xs">Total Sales</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
