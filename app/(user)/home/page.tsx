"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { PhotoCard } from "@/components/gallery/card"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { MOCK_PHOTOS } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { ArrowUpRight, Camera, Plus, Loader2 } from "lucide-react"

export default function HomePage() {
  const [photos, setPhotos] = useState(MOCK_PHOTOS)
  const [isLoading, setIsLoading] = useState(false)
  
  // Use the intersection observer hook
  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  // Simulate loading more photos
  useEffect(() => {
    if (inView && !isLoading) {
      loadMorePhotos()
    }
  }, [inView])

  const loadMorePhotos = () => {
    setIsLoading(true)
    // Simulate network delay
    setTimeout(() => {
      // In a real app, you'd fetch from your API here
      // We are just duplicating the mock data for the demo
      setPhotos((prev) => [...prev, ...MOCK_PHOTOS])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-background selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        {/* ... 1. The High-Fashion Headline (Keep your existing code) ... */}

        {/* ... 2. The Refined Bento Hero (Keep your existing code) ... */}
        
        {/* Gallery Divider */}
        <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-bold tracking-tighter">Trending Now</h3>
            <div className="flex gap-2">
                {['All', 'Wildlife', 'Urban', 'Culture'].map((cat) => (
                    <Button key={cat} variant="ghost" className="rounded-full hover:bg-secondary">
                        {cat}
                    </Button>
                ))}
            </div>
        </div>

        {/* Masonry gallery */}
        <section className="mt-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {photos.map((photo, index) => (
              <PhotoCard 
                id={photo.id}
                location={photo.location}
                key={`${photo.id}-${index}`} // Composite key for infinite scroll
                url={photo.url}
                title={photo.title}
                author={photo.author}
                isVerified={true}
                isPro={!photo.isFree}
                price={photo.price}
              />
            ))}
          </div>
        </section>

        {/* Infinite Scroll Trigger & Loader */}
        <div ref={ref} className="py-20 flex flex-col items-center justify-center">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Custom High-End Loader */}
              <div className="relative w-12 h-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full"
                />
                <Sparkles className="absolute inset-0 m-auto w-4 h-4 text-primary animate-pulse" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground animate-pulse">
                Fetching More Heritage
              </p>
            </motion.div>
          ) : (
            <div className="h-20" /> /* Spacer when not loading */
          )}
        </div>
      </main>
    </div>
  )
}

// Helper for the loader icon
function Sparkles(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  )
}