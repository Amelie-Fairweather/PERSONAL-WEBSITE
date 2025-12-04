"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function CurrentlyPage() {
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
      <div className="flex items-center space-x-20 pt-10">
        <Link href="/" className="font-playfair text-xl font-bold pb-20 pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          HOME
        </Link>
        <Link href="/Aboutme" className="font-playfair text-xl font-bold pb-20 pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          ABOUT ME
        </Link>
        <Link href="/Currently" className="font-playfair text-xl font-bold pb-20 pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          CURRENTLY
        </Link>
        <Link href="/Pastwork" className="font-playfair text-xl font-bold pb-20 pt-20 text-[var(--mauveDeep)] hover:text-[var(--roseSoft)]">
          PAST WORK
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex items-center justify-center bg-[var(--mauveDeep)] w-full relative" style={{
        transform: `translateY(-${offsetY * 0.2}px)`,
        height: "400px",
      }}>
        {/* Stars in hero */}
        <div className="absolute top-8 left-8 text-[var(--offWhite)] text-2xl">★</div>
        <div className="absolute top-8 right-8 text-[var(--offWhite)] text-2xl">★</div>
        <div className="absolute bottom-8 left-12 text-[var(--roseSoft)] text-xl">★</div>
        <div className="absolute bottom-8 right-12 text-[var(--roseSoft)] text-xl">★</div>
        
        <h1 className="text-6xl font-bold text-[var(--offWhite)] text-shadow font-playfair">
          Currently
        </h1>
      </div>

      {/* Content Section */}
      <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-6 py-20" style={{
        transform: `translateY(${isVisible ? Math.max(0, Math.min(30, (offsetY - 300) * 0.05)) : 60}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }}>
        <div className="space-y-12">
          {/* WOMENS HISTORY Section */}
          <div className="bg-[var(--offWhite2)] rounded-lg shadow-lg p-10 relative">
            {/* Stars around section */}
            <div className="absolute -top-3 -left-3 text-[var(--mauveDeep)] text-2xl">★</div>
            <div className="absolute -top-3 -right-3 text-[var(--mauveDeep)] text-2xl">★</div>
            <div className="absolute -bottom-3 -left-4 text-[var(--burgundyDark)] text-xl">★</div>
            <div className="absolute -bottom-3 -right-4 text-[var(--burgundyDark)] text-xl">★</div>
            
            <h2 className="text-3xl font-bold text-[var(--mauveDeep)] font-playfair mb-6 text-center">
              WOMENS HISTORY
            </h2>
            <div className="w-32 h-1 bg-[var(--mauveDeep)] mx-auto mb-6"></div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="space-y-6">
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  I lead a club at my high school dedicated to the inclusion of women's history in the curriculum, as it is not traditionally taught. When surveyed, 90% of students could not answer basic facts concerning women's history, including what a suffragette was, when women gained the right to vote, and what the pay or gender gap was. These same students surveyed said that they had not received any education around women's history as a whole from high school.
                </p>
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  Since then, myself and my club have presented to multiple boards and the superintendents and principals of our districts. We have hosted a catered event with guest speakers and more. We have raised over $700 towards our cause, and been featured in the largest televised news network in our state, as well as other publications within our district news, and UVM state college news.
                </p>
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  We hope to bring this education to the attention of the State Board of Education, and get requirements around Women's History passed as legislation. You can find more information at <a href="https://hereducation.org" target="_blank" className="text-[var(--mauveDeep)] hover:text-[var(--burgundyDark)] underline font-bold">hereducation.org</a>.
                </p>
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  Read more about our work in this <a href="https://www.vtcng.com/shelburnenews/community/school_news/cvu-students-demand-more-women-s-history/article_144a3891-74b0-45d7-ab1d-7b23881c6f47.html" target="_blank" className="text-[var(--mauveDeep)] hover:text-[var(--burgundyDark)] underline font-bold">article from Shelburne News</a>.
                </p>
              </div>
              <div className="w-full flex justify-center mt-6">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/TQYxM1gamFY?si=UDO9-4VCGbedgnZA" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full max-w-2xl aspect-video rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          {/* CODING Section */}
          <div className="bg-[var(--offWhite2)] rounded-lg shadow-lg p-10 relative">
            {/* Stars around section */}
            <div className="absolute -top-3 -left-3 text-[var(--mauveDeep)] text-2xl">★</div>
            <div className="absolute -top-3 -right-3 text-[var(--mauveDeep)] text-2xl">★</div>
            <div className="absolute -bottom-3 -left-4 text-[var(--burgundyDark)] text-xl">★</div>
            <div className="absolute -bottom-3 -right-4 text-[var(--burgundyDark)] text-xl">★</div>
            
            <h2 className="text-3xl font-bold text-[var(--mauveDeep)] font-playfair mb-6 text-center">
              CODING
            </h2>
            <div className="w-32 h-1 bg-[var(--mauveDeep)] mx-auto mb-6"></div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="space-y-6">
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  I have been coding for years and first learned how to in the fifth grade, when I joined <span className="font-bold text-[var(--mauveDeep)]">Hack Club</span>. Since then, I have used my coding abilities to code websites for multiple organizations including EH Landworks and Spruce Peaks. I have also started my own independently run bakery, which I coded the website for and managed all submissions online.
                </p>
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  I have attended over 20 hackathons including ones at Duolingo, Google, Figma, YouTube, and cross-country trains as well as one in New Delhi, India, where I coded a study app that helped students focus before exams.
                </p>
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  Recently, I was the <span className="font-bold text-[var(--mauveDeep)]">winner of the 2025 Congressional App Challenge</span> for my app Ride, which brought affordable transportation to isolated Vermonters. I am restarting my website building services in an attempt to build my portfolio and better my coding abilities.
                </p>
              </div>
            </div>
          </div>

          {/* WRITING Section */}
          <div className="bg-[var(--offWhite2)] rounded-lg shadow-lg p-10 relative">
            {/* Stars around section */}
            <div className="absolute -top-3 -left-3 text-[var(--mauveDeep)] text-2xl">★</div>
            <div className="absolute -top-3 -right-3 text-[var(--mauveDeep)] text-2xl">★</div>
            <div className="absolute -bottom-3 -left-4 text-[var(--burgundyDark)] text-xl">★</div>
            <div className="absolute -bottom-3 -right-4 text-[var(--burgundyDark)] text-xl">★</div>
            
            <h2 className="text-3xl font-bold text-[var(--mauveDeep)] font-playfair mb-6 text-center">
              WRITING
            </h2>
            <div className="w-32 h-1 bg-[var(--mauveDeep)] mx-auto mb-6"></div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="space-y-6">
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  I have been writing since I could read and have written multiple short stories and published for my town and state's newspaper.
                </p>
                <p className="text-[var(--burgundyDark)] font-playfair text-lg leading-relaxed">
                  I hope to publish a book and I'm currently 50 pages into my newest venture. Writing is extremely important to me, as it has always been, and I hope to continue my growth in the field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
