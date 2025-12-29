"use client"

import { PhotoCard } from "@/components/gallery/card"
import { Button } from "@/components/ui/button"
import { MOCK_PHOTOS } from "@/lib/mock-data"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const HERO_SLIDES = [
  {
    url: "https://images.pexels.com/photos/3540375/pexels-photo-3540375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "The Wild\nPerspective",
    location: "Serengeti, Tanzania",
    link: "/gallery?category=wildlife"
  },
  {
    url: "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Street\nCulture",
    location: "Accra, Ghana",
    link: "/gallery?category=urban"
  },
  {
    url: "https://images.pexels.com/photos/2349168/pexels-photo-2349168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Ancient\nEchoes",
    location: "Luxor, Egypt",
    link: "/gallery?category=culture"
  }
];

export default function HomePage() {
  const [photos, setPhotos] = useState(MOCK_PHOTOS)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1); 
  
  const { ref, inView } = useInView({ threshold: 0.1 })

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, []);

  const loadMorePhotos = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPhotos((prev) => [...prev, ...MOCK_PHOTOS]);
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (inView && !isLoading) loadMorePhotos();
  }, [inView]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0 
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0 
    })
  };

  return (
    <div className="bg-background selection:bg-primary selection:text-white overflow-x-hidden">
      <main className="pt-24 md:pt-32 pb-20 container mx-auto px-4 md:px-6">
        
        {/* HEADLINE */}
        <div className="mb-12 md:mb-16 space-y-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] md:text-xs uppercase">
            <div className="h-px w-6 md:w-8 bg-primary" /> Premium African Stock & Media
          </motion.div>
          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black leading-[0.85] md:leading-[0.8] tracking-tighter">
            SOUL OF <br />
            <span className="italic font-serif font-light text-muted-foreground/40">Africa.</span>
          </h1>
        </div>

        {/* HERO BENTO - Height adjusted for mobile */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 md:h-187.5 mb-24">
          
          {/* Main Cinematic Slider */}
          <div className="order-1 md:col-span-8 relative rounded-4xl md:rounded-[3rem] overflow-hidden group bg-secondary/20 shadow-2xl border border-border/50 min-h-112.5 md:h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 35 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <img 
                  src={HERO_SLIDES[currentSlide].url} 
                  className="w-full h-full object-cover"
                  alt="Marketplace Slide"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80" />
              </motion.div>
            </AnimatePresence>
 {/* <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
               <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-5 py-2 flex items-center gap-2 text-white text-[10px] font-black tracking-widest uppercase">
                  <Camera size={14} />
                  {HERO_SLIDES[currentSlide].location}
               </div>
            </div> */}
            {/* Location Badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
               <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-white text-[9px] md:text-[10px] font-black tracking-widest uppercase">
                  <Camera size={12} className="text-primary" />
                  {HERO_SLIDES[currentSlide].location}
               </div>
            </div>

            {/* Slide Text Content */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 text-white max-w-[85%] md:max-w-lg">
              <motion.h2 
                key={`title-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-[0.9] whitespace-pre-line uppercase"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h2>
              
              <Link href={HERO_SLIDES[currentSlide].link}>
                <Button size="lg" className="rounded-full bg-white text-black hover:bg-primary hover:text-white h-12 md:h-16 px-6 md:px-10 font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] transition-all">
                  Get Started <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Slider Controls - Smaller on mobile */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 flex items-center gap-2 md:gap-4">
               <button 
                onClick={() => paginate(-1)}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md hover:bg-primary transition-all active:scale-90"
               >
                <ChevronLeft size={20} />
               </button>
               <button 
                onClick={() => paginate(1)}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md hover:bg-primary transition-all active:scale-90"
               >
                <ChevronRight size={20} />
               </button>
            </div>
          </div>

          {/* Side Info Cards - Stacked on mobile */}
          <div className="order-2 md:col-span-4 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
            <div className="bg-secondary/30 rounded-4xl md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between border border-border/40 hover:border-primary/50 transition-all min-h-50 md:min-h-0">
              <div className="flex justify-between items-start">
                <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Live Feed</span>
                <Plus className="text-primary w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <span className="text-6xl md:text-8xl font-black tracking-tighter leading-none">15K</span>
                <p className="text-muted-foreground font-medium text-xs md:text-sm mt-2 uppercase tracking-tighter">New Assets Today</p>
              </div>
            </div>

            <div className="relative rounded-4xl md:rounded-[3rem] overflow-hidden group shadow-xl bg-zinc-900 min-h-50 md:min-h-0">
               <img 
                src={`https://picsum.photos/seed/rel-7/400/300`}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                alt="Collective"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-all">
                 <span className="text-white font-black text-[10px] md:text-xs tracking-[0.5em] uppercase px-4 text-center">Join the Collective</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar - Scrollable on mobile */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-border pb-6 gap-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">Latest Content</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                {['All', 'Wildlife', 'Urban', 'Culture'].map((cat) => (
                    <Button key={cat} variant="ghost" className="rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest px-4 md:px-6 hover:bg-secondary whitespace-nowrap">
                        {cat}
                    </Button>
                ))}
            </div>
        </div>

        {/* MASONRY GALLERY - Column count adjusted for screen size */}
        <section className="mt-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8">
            {photos.map((photo, index) => (
              <div key={`${photo.id}-${index}`} className="mb-4 md:mb-8">
                <PhotoCard {...photo} isVerified={true} isPro={!photo.isFree} />
              </div>
            ))}
          </div>
        </section>

        {/* Loading State */}
        <div ref={ref} className="py-20 flex flex-col items-center justify-center gap-4">
          {isLoading && (
            <>
              <Sparkles className="text-primary animate-pulse w-8 h-8" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Refreshing...</span>
            </>
          )}
        </div>
        
      </main>
    </div>
  )
}