"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, SlidersHorizontal, Download, Heart, Share2, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// --- MOCK DATA SERVICE ---
// Integration: This will eventually be a fetch(`/api/category/${slug}`)
const CATEGORY_CONTENT = {
  wildlife: {
    title: "Wildlife",
    description: "Capturing the raw majesty of Africa's diverse ecosystems and animal kingdoms.",
    count: "2,410",
    tags: ["Big Five", "Savannah", "Avian", "Nocturnal", "Migration"],
    images: [
      { id: 101, url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5", artist: "Kofi A.", aspect: "aspect-[4/5]" },
      { id: 102, url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e", artist: "Zoe B.", aspect: "aspect-square" },
      { id: 103, url: "https://images.unsplash.com/photo-1523805081446-cd93d569b912", artist: "Musa T.", aspect: "aspect-[3/4]" },
      { id: 104, url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa", artist: "Aisha L.", aspect: "aspect-[4/3]" },
      // ... more images
    ]
  }
}

export default function CategoryDetail({ params }: { params: { slug: string } }) {
  const [filter, setFilter] = useState("All")
  const data = CATEGORY_CONTENT.wildlife // In production: CATEGORY_CONTENT[params.slug]

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      
      {/* --- BREADCRUMB & HEADER --- */}
      <header className="container mx-auto px-6 mb-12">
        <Link href="/explore" className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Explore</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black tracking-tight">{data.title}</h1>
              <Badge variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800 text-zinc-500">
                {data.count} Assets
              </Badge>
            </div>
            <p className="text-zinc-500 max-w-xl font-medium leading-relaxed">
              {data.description}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-2xl h-12 px-6 border-zinc-200 dark:border-zinc-800 font-bold text-xs">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </Button>
            <Button className="rounded-2xl h-12 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs">
              Follow Category
            </Button>
          </div>
        </div>
      </header>

      {/* --- TAG BAR --- */}
      <div className="container mx-auto px-6 mb-10 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {data.tags.map((tag) => (
            <button 
              key={tag}
              className="px-5 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 text-[11px] font-bold whitespace-nowrap hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* --- MASONRY GRID --- */}
      <section className="container mx-auto px-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {data.images.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group break-inside-avoid rounded-3xl overflow-hidden cursor-zoom-in bg-zinc-100 dark:bg-zinc-900"
            >
              <img 
                src={item.url} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={data.title}
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end gap-2">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 border border-white/20 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${item.artist}`} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white text-xs font-bold">{item.artist}</span>
                  </div>
                  <button className="p-3 bg-white rounded-xl text-black hover:bg-zinc-100 transition-colors shadow-xl">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}