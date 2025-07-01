'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const meals = [
  {
    src: '/images/chicken-rice-bowl.png',
    alt: 'Healthy rice bowl with avocado and seasoned protein',
  },
  {
    src: '/images/chicken-quesadillas.png', 
    alt: 'Fresh tacos with green and red sauces',
  },
];

export function MealCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % meals.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-80 h-80 mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-black/60 border border-gray-800/30 bg-gradient-to-br from-gray-900/20 to-gray-800/40">
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {meals.map((meal, index) => (
          <div
            key={index}
            className="relative w-full h-full flex-shrink-0"
          >
            <Image
              src={meal.src}
              alt={meal.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Subtle overlay for blending with dark background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
      
      {/* Optional: Add dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {meals.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-green-400 shadow-md shadow-green-400/50 scale-110' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
} 