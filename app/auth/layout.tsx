"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523805081446-cd93d569b912?auto=format&fit=crop&q=80"
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 selection:bg-primary selection:text-white">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl h-200 bg-card rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border relative"
      >
        {/* LEFT: Cinematic Slider (Exactly 50%) */}
        <div className="relative w-full md:w-1/2 h-full hidden md:block overflow-hidden bg-secondary/20 border-r border-border">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide} 
              initial={{ opacity: 0, scale: 1.1 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 1.5, ease: "easeInOut" }} 
              className="absolute inset-0"
            >
              <img src={SLIDE_IMAGES[currentSlide]} className="w-full h-full object-cover" alt="Slideshow" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 p-16 flex flex-col justify-between z-10 text-white">
            <Link href="/" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-bold tracking-[0.3em] uppercase">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Archive
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5 fill-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Premium Access</span>
              </div>
              
              <motion.h2 
                key={currentSlide}
                className="text-6xl font-black leading-[0.85] tracking-tighter uppercase"
              >
                THE <br />
                <span className="italic font-serif font-light text-white/60">Soul.</span>
              </motion.h2>

              <div className="flex gap-3 pt-4">
                {SLIDE_IMAGES.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i === currentSlide ? "w-12 bg-primary" : "w-3 bg-white/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Auth Content (Exactly 50%) */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 lg:p-20 relative bg-card">
          <div className="w-full max-w-105">
            {children}
          </div>
          
          {/* Bottom Branding */}
          <div className="absolute bottom-10 right-10 opacity-10 font-black text-2xl tracking-tighter text-muted-foreground uppercase pointer-events-none">
            AfriStock
          </div>
        </div>
      </motion.div>
    </div>
  )
}