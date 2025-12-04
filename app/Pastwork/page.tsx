"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const pastProjects = [
  {
    name: "Her Education",
    url: "https://hereducation.org",
    description: "A platform dedicated to promoting women's education and awareness",
    image: "/web.png"
  },
  {
    name: "Rides For You",
    url: "https://ridesforyou.org",
    description: "A community-driven ride-sharing service connecting people in need",
    image: "/web5.png",
    award: "Winner of the 2025 Congressional App Challenge"
  }
];

export default function PastworkPage() {
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
      <div className="flex items-center justify-center bg-[var(--mauveDeep)] w-full" style={{
        transform: `translateY(-${offsetY * 0.2}px)`,
        height: "400px",
      }}>
        <h1 className="text-6xl font-bold text-[var(--offWhite)] text-shadow font-playfair">
          Past Work
        </h1>
      </div>

      {/* Featured Projects */}
      <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-6 py-20" style={{
        transform: `translateY(${isVisible ? Math.max(0, Math.min(30, (offsetY - 300) * 0.05)) : 60}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }}>
        <h2 className="text-4xl font-bold text-[var(--burgundyDark)] text-center mb-10 font-playfair">
          Featured Projects
        </h2>

        <div className="space-y-8">
          {pastProjects.map((project, index) => (
            <div 
              key={index} 
              className={`rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300 ${
                project.award 
                  ? 'bg-gradient-to-br from-[var(--offWhite2)] to-[var(--offWhite3)] border-4 border-[var(--mauveDeep)]' 
                  : 'bg-[var(--offWhite2)]'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-[var(--mauveDeep)] font-playfair">
                      {project.name}
                    </h3>
                    {project.award && (
                      <span className="bg-[var(--mauveDeep)] text-[var(--offWhite)] font-playfair font-bold px-4 py-1 rounded-full text-sm">
                        🏆 {project.award}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--burgundyDark)] font-playfair text-lg mb-4">
                    {project.description}
                  </p>
                  <Link
                    href={project.url}
                    target="_blank"
                    className="inline-block bg-[var(--mauveDeep)] text-white font-playfair font-bold py-2 px-6 rounded-lg hover:bg-[var(--burgundyDark)] transition-colors duration-300"
                  >
                    Visit Website →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
