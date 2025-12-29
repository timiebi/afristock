"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
    Globe,
    Heart,
    Instagram,
    MapPin,
    MessageCircle,
    Plus,
    Share2,
    Twitter
} from "lucide-react"

export default function ArtistProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      
      {/* --- ARTIST HERO --- */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-zinc-100 dark:border-zinc-800 pb-16">
          
          {/* Avatar */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-[3rem] overflow-hidden bg-zinc-100 shadow-2xl border-4 border-white dark:border-zinc-900"
          >
            <img 
              src="https://i.pravatar.cc/300?u=amina" 
              className="w-full h-full object-cover" 
              alt="Artist" 
            />
          </motion.div>

          {/* Info */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-4xl font-black tracking-tight uppercase">Amina Chale</h1>
                <div className="flex justify-center md:justify-start gap-2">
                    <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 px-4 py-1 rounded-full text-[10px] font-black uppercase">Pro Contributor</Badge>
                </div>
              </div>
              <p className="text-zinc-500 font-medium flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" /> Lagos, Nigeria
              </p>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed">
              Visual storyteller and architectural photographer. Documenting the intersection of tradition and modernity across West African urban landscapes.
            </p>

            {/* Stats & Socials */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-2">
              <div className="text-center md:text-left">
                <p className="text-2xl font-black italic">14.2k</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Downloads</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl font-black italic">892</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Photos</p>
              </div>
              <div className="h-10 w-px bg-zinc-100 dark:bg-zinc-800 hidden md:block" />
              <div className="flex gap-4">
                <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></button>
                <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></button>
                <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:text-primary transition-colors"><Globe className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button className="h-14 rounded-2xl bg-primary text-white font-bold px-8 shadow-lg shadow-primary/20">
              Follow Artist
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl border-zinc-200 dark:border-zinc-800 font-bold px-8">
              <MessageCircle className="w-4 h-4 mr-2" /> Message
            </Button>
          </div>
        </div>
      </section>

      {/* --- ARTIST FEED --- */}
      <section className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-8">
             <button className="text-sm font-bold border-b-2 border-primary pb-4">Portfolio</button>
             <button className="text-sm font-bold text-zinc-400 hover:text-zinc-900 pb-4">Collections</button>
             <button className="text-sm font-bold text-zinc-400 hover:text-zinc-900 pb-4">Exhibitions</button>
          </div>
          <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* --- PORTFOLIO GRID --- */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {[...Array(9)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group break-inside-avoid rounded-[2.5rem] overflow-hidden cursor-zoom-in bg-zinc-100 dark:bg-zinc-900"
            >
              <img 
                src={`https://picsum.photos/seed/${i + 50}/800/${i % 2 === 0 ? '1000' : '800'}`} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Artist Work"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-8">
                 <div className="flex gap-3">
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"><Heart className="w-4 h-4" /></button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"><Plus className="w-4 h-4" /></button>
                 </div>
                 <button className="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-xl shadow-xl">
                    View Asset
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}