"use client"

import { MOCK_PHOTOS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, Download, Eye, MapPin, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function GalleryPage() {
  return (
    <main className="pt-32 pb-20 container mx-auto px-6 bg-background">
      
      {/* 1. SEARCH & IDENTITY SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] text-[10px] uppercase"
          >
            <div className="h-px w-8 bg-primary" /> Global Content Hub
          </motion.div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
            The<br/><span className="text-muted-foreground/20">Market.</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Find authentic African media..." 
              className="bg-secondary/30 border border-border/50 rounded-full py-5 pl-14 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-100 font-medium"
            />
          </div>
          <Button variant="outline" className="rounded-full h-16 px-8 border-border hover:bg-secondary gap-3 font-black uppercase text-[10px] tracking-widest transition-all">
            <SlidersHorizontal size={16} /> Filters
          </Button>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 mb-12 border-b border-border/60">
         {['All Content', 'Wildlife', 'Urban Life', 'Portraits', 'Business', 'Abstract', 'Aerial'].map((cat, i) => (
           <button 
            key={cat} 
            className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* 3. CUSTOM BUILT MASONRY GRID */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
        {MOCK_PHOTOS.map((photo) => (
          <motion.div 
            key={photo.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 break-inside-avoid group"
          >
            {/* THE ASSET CARD */}
            <div className="relative rounded-4xl overflow-hidden bg-secondary/20 border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              
              {/* Image Container */}
              <Link href={`/photo/${photo.id}`} className="block relative aspect-auto overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{ minHeight: '300px' }}
                />
                
                {/* Sharp Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                   <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mb-2">
                      <MapPin size={12} className="text-primary" />
                      {photo.location}
                   </div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                      {photo.title}
                   </h3>
                   <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                           <Eye size={16} />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                           <Heart size={16} />
                        </div>
                      </div>
                      <div className="h-10 px-5 rounded-full bg-white text-black text-[10px] font-black uppercase flex items-center tracking-widest">
                        View Details
                      </div>
                   </div>
                </div>
              </Link>

              {/* Status Badges (Always Visible) */}
              <div className="absolute top-5 left-5 flex gap-2 pointer-events-none">
                {!photo.isFree ? (
                  <div className="bg-primary text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Premium
                  </div>
                ) : (
                  <div className="bg-white/90 backdrop-blur-md text-black text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Free
                  </div>
                )}
              </div>

              {/* Acquisition Shortcut */}
              <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black -translate-y-2.5 group-hover:translate-y-0">
                <Download size={16} />
              </button>
            </div>

            {/* Sub-Card Info (Outside for clean masonry) */}
            <div className="mt-4 px-2 flex justify-between items-center">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">{photo.title}</p>
                  <p className="text-[9px] text-muted-foreground font-medium italic font-serif">by {photo.author}</p>
               </div>
               <p className="text-xs font-black">{!photo.isFree ? `$${photo.price}` : '—'}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. MARKETPLACE FOOTER ACTIONS */}
      <div className="mt-20 py-20 border-t border-border flex flex-col items-center text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Ready to contribute?</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm font-medium">
            Join 2,000+ African photographers sharing their world and earning from their craft.
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="rounded-full h-16 px-10 bg-primary font-black uppercase text-[10px] tracking-[0.2em]">
            Apply as Photographer
          </Button>
          <Button variant="outline" className="rounded-full h-16 px-10 border-border font-black uppercase text-[10px] tracking-[0.2em]">
            Licensing FAQ
          </Button>
        </div>
      </div>

    </main>
  )
}