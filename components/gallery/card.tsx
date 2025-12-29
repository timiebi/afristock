"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, Download, Heart, Loader2, MapPin } from "lucide-react"
import { useMemo, useState } from "react"
import { PhotoDetailModal } from "./photo-detail-modal"

interface PhotoCardProps {
  id: string
  url: string
  title: string
  author: string
  isVerified: boolean
  isPro: boolean
  price?: number
  location: string
  width?: number   
  height?: number  
}

export function PhotoCard(photo: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // 1. OPTIMIZE EXTERNAL URL: 
  // Forces Pexels/External APIs to serve a smaller, compressed version for the thumbnail
  const optimizedUrl = useMemo(() => {
    if (photo.url.includes('pexels.com')) {
      // Remove existing width/height params and add our own for fast loading
      const baseUrl = photo.url.split('?')[0];
      return `${baseUrl}?auto=compress&cs=tinysrgb&w=800&q=75`; 
    }
    return photo.url;
  }, [photo.url]);

  return (
    <PhotoDetailModal photo={photo}>
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mb-6 break-inside-avoid group cursor-zoom-in rounded-4xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border/40 shadow-sm"
      >
        {/* 2. FIXED ASPECT RATIO CONTAINER (Prevents Layout Jumps) */}
        <div 
          className={cn(
            "relative w-full overflow-hidden transition-colors duration-500",
            !imgLoaded && "bg-zinc-200 dark:bg-zinc-800 animate-pulse"
          )}
          style={{ aspectRatio: photo.width && photo.height ? `${photo.width}/${photo.height}` : '3/4' }}
        >
          {/* Loading Spinner */}
          {!imgLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground/20" />
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 text-[10px] font-black uppercase text-muted-foreground">
              Image Unavailable
            </div>
          )}

          <img
            src={optimizedUrl}
            alt={photo.title}
            loading="lazy" // Native browser optimization
            onLoad={() => setImgLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out",
              imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
              isHovered && imgLoaded ? "scale-110" : "scale-100",
              hasError && "hidden"
            )}
          />

          {/* Badges and Overlays */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <AnimatePresence>
              {!isHovered && imgLoaded && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-black/40 backdrop-blur-xl border border-white/20 text-[9px] text-white px-3 py-1.5 rounded-full font-black uppercase tracking-[0.2em]"
                >
                  {photo.isPro ? `PRO • $${photo.price}` : 'FREE'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* UI Elements (Only show when loaded) */}
          {imgLoaded && (
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <div className="flex items-end justify-between gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full border border-white/30 overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/100?u=${photo.author}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-white truncate">
                    <p className="font-black text-xs flex items-center gap-1.5 leading-none mb-1">
                      {photo.author} 
                      {photo.isVerified && <CheckCircle2 className="w-3.5 h-3.5 fill-primary text-black" />}
                    </p>
                    <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {photo.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/10 hover:bg-primary backdrop-blur-md text-white border border-white/10 transition-all">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="icon" className="h-10 w-10 rounded-full bg-white text-black hover:bg-zinc-200 shadow-xl transition-all">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </PhotoDetailModal>
  )
}