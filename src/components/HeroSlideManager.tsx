import { useState, useEffect } from 'react';
import AnimatedHeroTitle from './AnimatedHeroTitle';

const titles = [
  "REPUESTOS DE DIRECCIÓN HIDRÁULICA",
  "BOMBAS DE DIRECCIÓN HIDRÁULICOS",
  "MAS DE 6000 REPUESTOS DISPONIBLES"
];

export default function HeroSlideManager() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Listen for slide changes from the main hero component
    const handleSlideChange = (event: CustomEvent) => {
      setCurrentSlide(event.detail.slideIndex);
    };

    // Listen for the custom event
    window.addEventListener('slideChanged', handleSlideChange as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('slideChanged', handleSlideChange as EventListener);
    };
  }, []);

  return (
    <>
      {titles.map((title, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center z-30 slide-title ${index === currentSlide ? 'active' : ''}`}
          style={{ marginTop: '-300px' }}
        >
          <div className="text-center max-w-4xl px-5">
            <AnimatedHeroTitle
              title={title}
              slideIndex={index}
              currentSlide={currentSlide}
            />
          </div>
        </div>
      ))}
    </>
  );
}