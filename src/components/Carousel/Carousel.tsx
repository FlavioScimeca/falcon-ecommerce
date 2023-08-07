'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';

interface CarouselProps {
  _key: string;
  alt: string;
  imageUrl: string;
}

const Carousel = ({ images }: { images: CarouselProps[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="h-[70dvh] lg:w-[calc(100dvw-29rem)] lg:ms-28 relative border-r border-black">
        <Image
          key={images[currentIndex]._key}
          alt={images[currentIndex].alt}
          src={images[currentIndex].imageUrl}
          fill
          className="object-cover"
        />
        <div className="absolute top-1/2 -right-1" onClick={handleNext}>
          <AiFillCaretRight className="h-9 w-9 cursor-pointer" />
        </div>
        <div className="absolute top-1/2 -left-1" onClick={handlePrevious}>
          <AiFillCaretLeft className="h-9 w-9 cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Carousel;
