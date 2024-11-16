import React from "react";

function InfoSection() {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt=""
                src="https://www.electrive.com/media/2024/04/mercedes-eqs-580-4matic-update-2024-14-1400x933.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-100">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Got a Car to sell? We have the perfect buyer waiting for you...
              </h2>

              <p className="mt-4 text-gray-600">
                Your trusted online destination for buying and selling quality
                used cars! Whether you're a first-time buyer or a seasoned car
                enthusiast, we offer a wide selection of reliable, pre-owned
                vehicles to suit every budget and lifestyle. Our goal is to make
                the process of finding your next car simple, transparent, and
                stress-free.
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
