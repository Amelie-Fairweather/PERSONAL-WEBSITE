"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="bg-[var(--offWhite2)] rounded-lg shadow-lg p-4 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              Your name!
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              Email and phone!
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)]"
              />
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-[var(--mauveDeep)] font-playfair font-bold mb-2">
              A brief description of your website!
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-[var(--roseSoft)] focus:outline-none focus:ring-2 focus:ring-[var(--mauveDeep)] bg-white text-[var(--burgundyDark)] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--mauveDeep)] text-white font-playfair font-bold py-3 px-6 rounded-lg hover:bg-[var(--burgundyDark)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-green-600 text-center font-playfair">
              Thank you! Your message has been sent. Please look out for a message in the next 1-2 days!
            </p>
          )}

          {submitStatus === 'error' && (
            <p className="text-red-600 text-center font-playfair">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}



const photos2 = [
'/web.png',
'web2.png',
'web3.png',
'web4.png',


]

const photos3 = [
'/web5.png',
'web6.png',
'web7.png',
'web8.png',


]
const photos = [
  '/coffee.jpeg',
  '/flowers.jpeg',
  '/sky.jpeg',
  '/hill.jpeg',
  '/lake.jpeg',
  '/slippers.jpg',
  '/pan.jpeg',
 '/snow.jpeg',
 '/sun.jpeg',
  '/hearts.jpeg',
 
  
  
 
  '/avs.jpeg',
  '/flowers2.png',
  '/ship.jpeg',
   '/london.jpeg',
   '/lakey.jpeg',
   '/eloise.jpeg'
];


export default function Home() {
  

  const [offsetY, setOffsetY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isWorkVisible, setIsWorkVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);

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
          if (entry.target === workSectionRef.current && entry.isIntersecting) {
            setIsWorkVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    // Small delay to ensure refs are set
    setTimeout(() => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
        // Check if already in view
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
      if (workSectionRef.current) {
        observer.observe(workSectionRef.current);
        // Check if already in view
        const rect = workSectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsWorkVisible(true);
        }
      }
    }, 100);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (workSectionRef.current) {
        observer.unobserve(workSectionRef.current);
      }
    };
  }, []);



  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--offWhite)] font-sans dark:bg-black">
 
      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-20 px-4">
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

      {/* Hero */}
      <div className="">
      <div className="flex items-center space-x-6 bg-[var(--mauveDeep)] px-4 md:px-15rem" style={{
  transform: `translateY(-${offsetY * 0.3}px)`,
  opacity: Math.max(1 - offsetY / 600, 0), // fades out after scrolling ~600px
  height: "610px",           // explicit height
    paddingLeft: "15rem",      // optional horizontal padding
    paddingRight: "15rem",
}}
        
        >
        <h1 className="text-8xl font-bold pr-1 text-[var(--offWhite)] hover:text-[var(--roseSoft)] text-shadow font-playfair">Hi!</h1>
        <p className="text-[var(--roseSoft)] text-lg font-bold">
          welcome to my website, I am so excited to introduce myself
        </p>
        <Image 
          src="/pro.jpeg"
          alt="Profile"
          width={350}
          height={350}
            quality={100}
          className="rounded-full border-10 border-[var(--offWhite)] object-cover"
        />
      </div>

      {/* Introduction */}
      <p className="text-[var(--burgundyDark)] text-lg md:text-xl lg:text-2xl pt-10 md:pt-20 px-4 text-center max-w-4xl mx-auto" >
        My name is <span className="font-bold font-playfair">Amelie Fairweather</span>, I am a junior currently, and living in Vermont!
      </p>
        <div className="mb-25"></div>
        </div>

      {/* Values */}
      <div className="flex flex-col items-center w-full px-4 relative">
        <h1 className="text-[var(--burgundyDark)] text-2xl md:text-3xl lg:text-4xl font-bold pt-10 md:pt-20 pb-8 md:pb-15 font-playfair text-center">MY VALUES</h1>
      
        <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12 lg:gap-16 p-4 md:p-10 justify-center w-full max-w-6xl relative">
          {/* Scattered stars around the entire section */}
          <div className="absolute -top-6 left-8 text-[var(--mauveDeep)] text-2xl">★</div>
          <div className="absolute -bottom-6 right-16 text-[var(--burgundyDark)] text-2xl">★</div>
    
          <div className="rounded-md bg-[var(--mauveLight)] p-6 md:p-8 shadow-lg hover:scale-110 transition-transform duration-300 ease-out w-full md:flex-1 relative max-w-sm">
            {/* Scattered stars around CURIOSITY box */}
            <div className="absolute -top-4 -left-6 text-[var(--mauveDeep)] text-xl">★</div>
            <div className="absolute -bottom-4 -left-7 text-[var(--burgundyDark)] text-lg">★</div>
            <h2 className="text-[var(--offWhite3)] text-xl font-bold mb-2 pb-7">CURIOSITY</h2>
            <p className="font-playfair text-[var(--superSoft)] font-bold ">Curiosity fuels growth. Asking questions, exploring new ideas, and challenging what we know opens doors to knowledge and creativity that we might never have discovered otherwise.</p>
          </div>

          <div className="rounded-md bg-[var(--mauveLight)] p-6 md:p-8 shadow-lg hover:scale-110 transition-transform duration-300 ease-out w-full md:flex-1 md:w-64 min-h-[250px] md:min-h-[300px] relative max-w-sm">
            {/* Scattered stars around HONESTY box */}
            <div className="absolute -top-5 -left-5 text-[var(--burgundyDark)] text-xl">★</div>
            <div className="absolute -bottom-5 -right-6 text-[var(--mauveDeep)] text-xl">★</div>
            <h2 className="text-[var(--offWhite3)] text-xl font-bold mb-2 pb-7">HONESTY</h2>
            <p className="font-playfair text-[var(--superSoft)] font-bold">Honesty is more than telling the truth—it's about integrity in actions and words. Being honest fosters trust, strengthens character, and creates an environment where people feel safe and valued.</p>
          </div>

          <div className="rounded-md bg-[var(--mauveLight)] p-6 md:p-8 shadow-lg hover:scale-110 transition-transform duration-300 ease-out w-full md:flex-1 md:w-64 min-h-[250px] md:min-h-[300px] relative max-w-sm">
            {/* Scattered stars around RESPECT box */}
            <div className="absolute -top-4 -right-6 text-[var(--burgundyDark)] text-xl">★</div>
            <div className="absolute -bottom-3 -left-8 text-[var(--mauveDeep)] text-xl">★</div>
            <h2 className="text-[var(--offWhite3)] text-xl font-bold mb-2 pb-7">RESPECT</h2>
            <p className="font-playfair text-[var(--superSoft)] font-bold">Respect is the foundation of meaningful relationships. Treating others with kindness, listening actively, and valuing different perspectives builds trust and harmony in any community.</p>
          </div>
     
      </div>
      </div>
     
       <div className="mb-30
       "></div>

      {/* BITS N PIECES */}
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-[var(--burgundyDark)] font-bold pb-6 md:pb-10 font-playfair text-center px-4">BITS N PIECES</h1>
      <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 justify-items-center max-w-4xl mx-auto">
        
        
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-50 h-50 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        ))}
         <div className="pb-15"></div>
      </div>
      <div className="mb-20"></div>
       
   
 <div ref={sectionRef} className="w-full pt-5 pb-10 px-4" style={{
  transform: `translateY(${isVisible ? Math.max(0, Math.min(50, (offsetY - 600) * 0.1)) : 80}px)`,
  opacity: isVisible ? 1 : 0,
  transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
}}>
  <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start gap-4 md:gap-6"  >
    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-[var(--mauveDeep)]">
      INTERESTED IN A WEBSITE LIKE THIS?
    </h1>
    <p className="font-playfair text-base md:text-lg text-[var(--mauveDeep)] mt-1">
     I offer my services as your towns local design and software engineer, for affordable prices to bring your ideas to life! 
    </p>
  </div>
  <h1 className="text-center text-lg md:text-xl lg:text-2xl pt-6 md:pt-10 pb-6 md:pb-10 px-4 text-[var(--mauveDeep)]"> I guarentee<span className="font-bold"> Functionality, Design and Deployement</span></h1>
 </div>
<div ref={workSectionRef} className="bg-[var(--mauveLight)] px-4 md:px-8 lg:px-30" style={{
  transform: `translateY(${isWorkVisible ? Math.max(0, Math.min(30, (offsetY - 1000) * 0.05)) : 60}px)`,
  opacity: isWorkVisible ? 1 : 0,
  transition: 'opacity 1s ease-out, transform 1s ease-out',
}}>
  <div className="bg-[var(--mauveLight)] text-center pt-10 md:pt-15 pb-10 md:pb-20 relative">
    <h1 className="text-xl md:text-2xl font-bold text-[var(--offWhite3)] font-playfair mb-3 px-4">SOME OF MY WORK</h1>
    <div className="inline-block bg-[var(--mauveDeep)] text-[var(--offWhite)] font-playfair font-bold px-4 md:px-6 py-2 rounded-full text-xs md:text-sm mx-4">
      🏆 Winner of the 2025 Congressional App Challenge
    </div>
  </div>
    
  
 
  

  <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-10">
<div className="bg-[var(--roseSoft)] p-4 md:p-6 rounded-lg opacity-80">
    {/* LEFT COLUMN */}
    <div className="grid grid-cols-2 gap-3 md:gap-4 justify-items-center">
     
      {photos2.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Photo ${index + 1}`}
          className="w-full max-w-[140px] md:max-w-[180px] lg:max-w-[240px] h-auto aspect-square object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
      ))}
    </div>
</div>
<div className="bg-[var(--roseSoft)] p-4 md:p-6 rounded-lg opacity-80">
    {/* RIGHT COLUMN */}
    <div className="grid grid-cols-2 gap-3 md:gap-4 justify-items-center">
      {photos3.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Photo ${index + 1}`}
          className="w-full max-w-[140px] md:max-w-[180px] lg:max-w-[240px] h-auto aspect-square object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
      ))}
    </div>
    </div>
    </div>
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-6 md:pt-10 pb-6 md:pb-10">
     <Link
  href="https://hereducation.org"
  target="_blank"
  className="font-playfair text-[var(--mauveDeep)]">
    <h1 className="text-base md:text-lg lg:text-xl font-playfair bg-white rounded-full text-[var(--mauveDeep)] hover:text-[var(--roseSoft)] px-6 py-4 md:px-8 md:py-8 text-center">Hereducation.org</h1>
     </Link>

 <Link
  href="https://ridesforyou.org"
  target="_blank"
  className="font-playfair text-[var(--mauveDeep)]">
 <h1 className="text-base md:text-lg lg:text-xl font-playfair bg-white rounded-full text-[var(--mauveDeep)] hover:text-[var(--roseSoft)] px-6 py-4 md:px-8 md:py-8 text-center">Ridesforyou.org</h1>
    </Link>
       </div>
  <div className="mb-15"></div>
  
  
  
    </div>

  
<h1 className="pt-10 md:pt-25 text-center text-4xl md:text-6xl lg:text-8xl rouge-script text-[var(--burgundyDark)] px-4">Your website is art</h1>
<h3 className="pt-3 md:pt-5 text-lg md:text-xl text-center font-playfair text-[var(--mauveDeep)] px-4">Lets work together!</h3>

<ContactForm />

    </div>


  );

}
