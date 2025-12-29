"use client"

import { useParams } from "next/navigation"
import { MOCK_PHOTOS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Download, ShieldCheck, 
  Maximize2, Share2, Info, Camera,
  ChevronLeft, ChevronRight, Layers
} from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

export default function PhotoDetailsPage() {
  const { id } = useParams()
  const photo = MOCK_PHOTOS.find(p => p.id === id) || MOCK_PHOTOS[0]
  
  // Slider Logic for Related Content
  const sliderRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      const amt = 400
      sliderRef.current.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' })
    }
  }

  if (!photo) return null

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* BACK NAV */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft size={14} />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CINEMATIC PREVIEW */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-[3rem] overflow-hidden bg-secondary/20 aspect-4/5 md:aspect-video group">
              <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={photo.url} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
              <button className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Maximize2 size={20} />
              </button>
            </div>

            {/* TECHNICAL SPECS BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Camera', val: 'Sony A7R IV', icon: Camera },
                 { label: 'Resolution', val: `${photo.width} x ${photo.height}`, icon: Maximize2 },
                 { label: 'Location', val: photo.location, icon: Info },
                 { label: 'License', val: 'Commercial', icon: ShieldCheck },
               ].map((spec, i) => (
                 <div key={i} className="p-6 rounded-4xl border border-border bg-card/50 flex flex-col gap-3">
                    <spec.icon size={18} className="text-primary" />
                    <div>
                      <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">{spec.label}</p>
                      <p className="text-xs font-bold truncate">{spec.val}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT: ACQUISITION SIDEBAR */}
          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="p-10 rounded-[3rem] border border-border bg-card shadow-2xl space-y-8">
               <div>
                  <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">{photo.title}</h1>
                  <p className="text-muted-foreground text-sm font-medium italic font-serif">by {photo.author}</p>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between p-6 rounded-[1.8rem] border-2 border-primary bg-primary/5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest">Full Resolution</p>
                      <p className="text-lg font-black">{photo.isFree ? 'FREE' : `$${photo.price}`}</p>
                    </div>
                    <Download className="text-primary" />
                  </div>
                  <button className="w-full p-6 rounded-[1.8rem] border border-border hover:border-primary/50 flex justify-between items-center transition-all group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Web Optimized</span>
                    <Share2 size={16} className="text-muted-foreground" />
                  </button>
               </div>

               <Button className="w-full h-20 rounded-4xl bg-primary text-primary-foreground font-black uppercase text-xs tracking-[0.4em] shadow-xl shadow-primary/20">
                 Acquire Asset
               </Button>

               <div className="pt-6 border-t border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-muted overflow-hidden">
                     <img src="https://i.pravatar.cc/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Photographer</p>
                    <p className="text-sm font-bold">Follow @{photo.author.split(' ')[0].toLowerCase()}</p>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* BOTTOM: SHARP SLIDER (Related Content) */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                 <Layers className="text-primary" size={20} />
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase">Related in {photo.location.split(',')[0]}</h3>
            </div>
            <div className="flex gap-2">
               <Button onClick={() => scroll('left')} variant="outline" size="icon" className="rounded-full h-12 w-12 border-border transition-all hover:bg-primary hover:text-white"><ChevronLeft size={20}/></Button>
               <Button onClick={() => scroll('right')} variant="outline" size="icon" className="rounded-full h-12 w-12 border-border transition-all hover:bg-primary hover:text-white"><ChevronRight size={20}/></Button>
            </div>
          </div>

          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-2"
          >
            {MOCK_PHOTOS.map((item) => (
              <Link key={item.id} href={`/photo/${item.id}`} className="min-w-87.5group snap-start">
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-4 border border-border">
                  <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest">{item.title}</p>
                <p className="text-muted-foreground text-[10px]">{item.location}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}