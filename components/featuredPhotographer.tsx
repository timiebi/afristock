"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, ImageIcon, TrendingUp, Eye } from "lucide-react"

// Define the data inside or export it from your mock-data file
const FEATURED_ARTIST = {
  name: "Tunde Mason",
  bio: "Documenting the fast-paced architectural evolution of West Africa.",
  stats: { photos: 240, downloads: "15k+", views: "200k" },
  specialty: "Lagos Urbanism",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
}

export function FeaturedPhotographer() {
  return (
    <section className="my-16 px-2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-primary/[0.07]"
      >
        
        {/* Left: Artist Hook */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <img 
              src={FEATURED_ARTIST.avatar} 
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-background shadow-lg" 
              alt={FEATURED_ARTIST.name} 
            />
            <div className="absolute -top-2 -left-2 bg-primary text-white p-1 rounded-lg shadow-md">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-xl tracking-tight">{FEATURED_ARTIST.name}</h3>
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm font-medium italic font-serif">
              Featured specialist in {FEATURED_ARTIST.specialty}
            </p>
          </div>
        </div>

        {/* Center: Live Stats (Social Proof) */}
        <div className="hidden lg:flex items-center gap-12">
           <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">Impact</p>
              <p className="font-black text-lg">{FEATURED_ARTIST.stats.downloads} <span className="text-[10px] text-primary">DLs</span></p>
           </div>
           <div className="h-8 w-px bg-border/50" />
           <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">Portfolio</p>
              <p className="font-black text-lg">{FEATURED_ARTIST.stats.photos}</p>
           </div>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none rounded-full border-primary/20 text-primary hover:bg-primary/10 transition-colors">
            View Studio
          </Button>
          <Button className="flex-1 md:flex-none rounded-full bg-primary text-white shadow-lg shadow-primary/20 group">
            Follow <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </motion.div>
    </section>
  )
}