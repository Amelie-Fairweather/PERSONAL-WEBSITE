"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function AboutmePage() {
  const [offsetY, setOffsetY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    setTimeout(() => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    }, 100);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--offWhite)] font-sans">
      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-20 px-4 pt-10">
        <Link href="/" className="font-playfair text-base md:text-xl font-bold pb-10 md:pb-20 pt-10 md:pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          HOME
        </Link>
        <Link href="/Aboutme" className="font-playfair text-base md:text-xl font-bold pb-10 md:pb-20 pt-10 md:pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          ABOUT ME
        </Link>
        <Link href="/Currently" className="font-playfair text-base md:text-xl font-bold pb-10 md:pb-20 pt-10 md:pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          CURRENTLY
        </Link>
        <Link href="/Pastwork" className="font-playfair text-base md:text-xl font-bold pb-10 md:pb-20 pt-10 md:pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          PAST WORK
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-20">
        {/* Image Section */}
        <div className="flex justify-center mb-10 md:mb-16 relative">
          {/* Stars around the image */}
          <div className="absolute -top-4 -left-4 text-[var(--mauveDeep)] text-3xl">★</div>
          <div className="absolute -top-2 -right-8 text-[var(--mauveDeep)] text-2xl">★</div>
          <div className="absolute top-1/2 -left-8 text-[var(--mauveDeep)] text-2xl">★</div>
          <div className="absolute top-1/2 -right-8 text-[var(--mauveDeep)] text-2xl">★</div>
          <div className="absolute -bottom-4 -left-6 text-[var(--mauveDeep)] text-2xl">★</div>
          <div className="absolute -bottom-2 -right-4 text-[var(--mauveDeep)] text-3xl">★</div>
          <div className="absolute top-1/4 -right-12 text-[var(--burgundyDark)] text-xl">★</div>
          <div className="absolute bottom-1/4 -left-12 text-[var(--burgundyDark)] text-xl">★</div>
          <div className="absolute top-1/3 -left-10 text-[var(--mauveDeep)] text-xl">★</div>
          <div className="absolute bottom-1/3 -right-10 text-[var(--mauveDeep)] text-xl">★</div>
          
          <div className="w-64 h-80 md:w-80 md:h-96 rounded-[50%] border-4 border-[var(--mauveDeep)] overflow-hidden shadow-lg" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}>
            <Image 
              src="/prof.jpeg"
              alt="Amelie Fairweather"
              width={320}
              height={384}
              quality={100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div ref={sectionRef} className="space-y-8" style={{
          transform: `translateY(${isVisible ? Math.max(0, Math.min(30, (offsetY - 200) * 0.05)) : 60}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out, transform 1s ease-out',
        }}>
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--burgundyDark)] font-playfair mb-4">
              About Me
            </h1>
            <div className="w-24 h-1 bg-[var(--mauveDeep)] mx-auto"></div>
          </div>

          <div className="space-y-4 md:space-y-6 text-[var(--burgundyDark)] font-playfair text-base md:text-lg leading-relaxed px-2">
            <p>
              Hi! My name is <span className="font-bold text-[var(--mauveDeep)]">Amelie Fairweather</span>, and I am a junior living in Vermont. Growing up, I lived in a lot of different places, most notably three years in Istanbul, Turkey, where I attended public school and learned to speak Turkish fluently.
            </p>

            <p>
              Since 2017, I have lived in Vermont, and in Vermont is where I first learned how to code! I am part of a group called <span className="font-bold text-[var(--mauveDeep)]">Hack Club</span>, which is dedicated to teaching teens how to use technology, especially in a world where technology is our future. I have attended multiple hackathons, including two cross-country trains and one in New Delhi, India, and I hope to run a hackathon of my own soon! If you are interested, please reach out!
            </p>

            <p>
              I am also very interested in science as well as social studies. I love traveling, art, writing and reading. I'm currently reading <span className="italic text-[var(--mauveDeep)]">The Overstory</span> by Richard Powers! I love living in the country, my favorite colors are pink and red, and a fun fact about me: I was born on the first day of spring (The spring equinox) March 20th!
            </p>

            <p>
              Thank you for visiting my personal website, please feel free to reach out via my contact information on the Contact Me page!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
