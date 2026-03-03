import React from "react";
import Link from "next/link";

const Location = () => {
  return (
    <>
      <section className="bg-primary lg:py-24 py-16 px-4">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <div className="">
            <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white border-opacity-50 pb-11">
              <div className="col-span-3">
                <h2 className="text-white text-4xl leading-[1.2] font-bold">Main Office — CDO</h2>
              </div>
              <div className="col-span-3">
                <p className="text-xl text-white text-opacity-50 font-normal max-w-64">Cagayan de Oro City, Misamis Oriental, Philippines 9000</p>
              </div>
              <div className="col-span-3">
                <Link href="mailto:info@venjerealty.ph" className="text-xl text-white font-medium underline">info@venjerealty.ph</Link>
                <Link href="tel:+639123456789" className="text-xl text-white text-opacity-80 flex items-center gap-2 hover:text-opacity-100 w-fit">
                  <span className="text-white !text-opacity-40">Call</span>+63 912 345 6789
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12">
              <div className="col-span-3">
                <h2 className="text-white text-4xl leading-[1.2] font-bold">South Mindanao Branch</h2>
              </div>
              <div className="col-span-3">
                <p className="text-xl text-white text-opacity-50 font-normal max-w-64">Davao City, Davao del Sur, Philippines 8000</p>
              </div>
              <div className="col-span-3">
                <Link href="mailto:davao@venjerealty.ph" className="text-xl text-white font-medium underline">davao@venjerealty.ph</Link>
                <Link href="tel:+639987654321" className="text-xl text-white text-opacity-80 flex items-center gap-2 hover:text-opacity-100 w-fit">
                  <span className="text-white !text-opacity-40">Call</span>+63 998 765 4321
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
