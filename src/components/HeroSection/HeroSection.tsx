'use client';

import { FC, useEffect, useState } from 'react';
import heroSectionClassNames from './heroSectionClassName';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(true);

  const largeScreen = (
    <>
      <div className="flex">
        <div className="w-28 border-black border-r" />

        <div className="flex items-center justify-center text-start space-x-5 flex-1 py-3">
          <div className="w-2/4">
            <h1 className="tracking-tight mb-3 text-primary-dark font-bold text-xl md:text-2xl lg:text-3xl text-gray-900">
              Gaming
            </h1>
            <h1 className="text-5xl md:text-5xl leading-[120%] md:leading-[155%] font-bold">
              Lorem ipsum dolor sit amet.
            </h1>
            <p className={heroSectionClassNames.paragraph}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
              magni delectus quam.
            </p>

            <div>
              <Link
                href="#recent-games"
                className="mt-8 inline-flex items-center px-6 py-3 text-base rounded-full text-white bg-black"
              >
                Find Games
              </Link>
            </div>
          </div>

          <div className={heroSectionClassNames.imageContainer}>
            <Image
              src="https://image.lexica.art/full_jpg/22828ccf-e99e-47d5-809b-39fd8d003c3a"
              alt="Macho Mario and Luigi enjoy bear"
              width={300}
              height={300}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        <div className="w-28 border-black border-l" />
      </div>
      <div className="h-20 mt-auto border-black border-t border-b flex">
        <div className="w-28 border-black border-r" />
        <div className="flex-1" />
        <div className="w-28 border-black border-l" />
      </div>
    </>
  );

  const smallScreen = (
    <>
      <div className="py-10 flex items-center justify-center text-start space-x-5 flex-1 border-b border-black">
        <div className="px-5">
          <h1 className="tracking-tight mb-3 text-primary-dark font-bold text-xl md:text-2xl lg:text-3xl text-gray-900">
            Gaming
          </h1>
          <h1 className="text-5xl md:text-5xl leading-[120%] md:leading-[155%] font-bold">
            Lorem ipsum dolor sit amet.
          </h1>
          <p className={heroSectionClassNames.paragraph}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            magni delectus quam.
          </p>

          <div>
            <Link
              href="#recent-games"
              className="mt-8 sm:mt-10 inline-flex items-center px-6 py-3 text-base rounded-full text-white bg-black"
            >
              Find Games
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    //todo: Custom Hook perche devo usarlo anche nella header, forse
    function handleResize() {
      if (window.innerWidth >= 750) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <>{isMobile ? smallScreen : largeScreen}</>;
};

export default HeroSection;
