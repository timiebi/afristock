"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, Trash2, Download, Maximize2, X, 
  UserPlus, ShieldCheck, ArrowDownToLine, 
  Layers, Image as ImageIcon, Copy, Check,
  Share2, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([...Array(6)])
  const [expandImage, setExpandImage] = useState<string | null>(null)
  const [downloadView, setDownloadView] = useState<{url: string, id: number} | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const removeFavorite = (index: number) => {
    setFavorites(favorites.filter((_, i) => i !== index))
  }

  const copyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-40 pb-20 transition-colors selection:bg-primary/30">
      
      {/* --- MODAL 1: ZEN EXPAND (LIGHTROOM STYLE) --- */}
      <AnimatePresence>
        {expandImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-black/98 backdrop-blur-3xl flex items-center justify-center cursor-zoom-out"
            onClick={() => setExpandImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-20"
            >
              <img src={expandImage} className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)]" alt="Zen View" />
              <div className="absolute top-10 right-10">
                 <Button className="rounded-full bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 h-14 px-8 font-black uppercase text-[10px] tracking-widest transition-all">
                    Close View
                 </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: THE ASSET DOWNLOAD HUB + RELATED --- */}
      <AnimatePresence>
        {downloadView && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 bg-background/40 dark:bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setDownloadView(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }}
              className="bg-card border border-border w-full max-w-6xl rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col h-full max-h-[90vh]"
              onClick={(e:any) => e.stopPropagation()}
            >
              {/* TOP SECTION: MAIN ASSET & DETAILS */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* IMAGE SIDE */}
                <div className="flex-[1.5] bg-muted/30 relative overflow-hidden group">
                  <img src={downloadView.url} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Selected Asset" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Artist Tag */}
                  <div className="absolute bottom-10 left-10 flex items-center gap-5 text-white">
                    <Link href={`/artist/${1}`} className="w-16 h-16 rounded-3xl border-2 border-white/30 overflow-hidden bg-zinc-800 cursor-pointer hover:border-white transition-all shadow-xl">
                      <img src="https://i.pravatar.cc/150?u=artist" className="w-full h-full object-cover" />
                    </Link>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Visual Creator</p>
                      <p className="text-2xl font-black tracking-tighter uppercase">Kwame Adisa</p>
                    </div>
                  </div>
                </div>

                {/* DOWNLOAD SIDE */}
                <div className="flex-1 p-10 md:p-14 flex flex-col justify-between bg-card border-l border-border relative">
                  <div className="space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Acquisition</h2>
                        <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-[0.2em]">
                          <ShieldCheck size={14} strokeWidth={2.5} /> <span>Commercial Extended License</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setDownloadView(null)} className="rounded-2xl h-12 w-12 border border-border hover:bg-muted">
                        <X size={20} />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Asset Formats</p>
                      <div className="space-y-3">
                        {['Master Archive (.RAW)', 'Editorial High-Res (.JPG)', 'Web Optimized (.PNG)'].map((format, idx) => (
                          <button key={format} className={`w-full flex justify-between items-center p-6 rounded-3xl border transition-all duration-300 group ${idx === 0 ? 'bg-primary/5 border-primary/30' : 'bg-muted/30 border-border hover:border-primary/30'}`}>
                            <div className="flex items-center gap-4">
                               <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-primary animate-pulse' : 'bg-border'}`} />
                               <span className="font-bold uppercase text-[10px] tracking-[0.2em]">{format}</span>
                            </div>
                            <ArrowDownToLine size={18} className={idx === 0 ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full rounded-4xl h-20 bg-primary text-primary-foreground font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform">
                      Unlock Full Asset
                    </Button>
                    <p className="text-center text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Secure acquisition via Artist Vault</p>
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION: RELATED ASSETS CAROUSEL */}
              <div className="h-56 border-t border-border bg-muted/10 p-8">
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Series Portfolio</h4>
                  </div>
                  <Link href="/explore" className="text-[10px] font-black uppercase text-primary tracking-widest hover:tracking-[0.4em] transition-all">Full Collection →</Link>
                </div>
                <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
                  {[...Array(10)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 0.95 }}
                      onClick={() => setDownloadView({url: `https://picsum.photos/seed/rel-${i}/400/300`, id: i})}
                      className="min-w-45 h-28 rounded-2xl overflow-hidden bg-card border border-border cursor-pointer shadow-sm relative group/item"
                    >
                      <img src={`https://picsum.photos/seed/rel-${i}/400/300`} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="container mx-auto px-6">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-4">
            <h1 className="text-8xl font-black tracking-tighter uppercase leading-[0.8]">Vault.</h1>
            <p className="text-muted-foreground font-medium text-xl italic font-serif max-w-md">Your personal curation of the African visual narrative.</p>
          </div>
          <div className="flex flex-col items-end gap-5">
              <Badge className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.4em] shadow-xl shadow-primary/20">
                {favorites.length} Archiving
              </Badge>
              <button className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors">Terminate All Curations</button>
          </div>
        </div>

        {/* MAIN MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          <AnimatePresence mode="popLayout">
            {favorites.map((_, i) => {
              const url = `https://picsum.photos/seed/fav-${i}/800/${i % 2 === 0 ? 1100 : 900}`;
              return (
                <motion.div key={i} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="break-inside-avoid relative group rounded-[3.5rem] overflow-hidden bg-card border border-border shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700">
                  <img src={url} className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt="African Asset" />
                  
                  {/* OVERLAY ACTIONS */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-10">
                    <div className="flex justify-between items-start -translate-y-2.5 group-hover:translate-y-0 transition-transform duration-500">
                      <Button 
                        onClick={() => copyLink(url, i)}
                        className="rounded-full h-12 px-6 bg-white/10 backdrop-blur-2xl border border-white/20 text-white font-black uppercase text-[9px] tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                      >
                        {copiedIndex === i ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
                        {copiedIndex === i ? "Copied" : "Source ID"}
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => removeFavorite(i)} className="rounded-full w-12 h-12 bg-red-500/80 hover:bg-red-500 border-none shadow-xl backdrop-blur-md"><Trash2 size={20} /></Button>
                    </div>

                    <div className="flex gap-3 translate-y-2.5 group-hover:translate-y-0 transition-transform duration-500">
                      <Button onClick={() => setDownloadView({url, id: i})} className="flex-1 rounded-[1.8rem] bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] h-16 shadow-2xl hover:scale-[1.03] active:scale-95 transition-all">
                        <ImageIcon className="w-4 h-4 mr-3" /> Acquisition
                      </Button>
                      <Button onClick={() => setExpandImage(url)} variant="secondary" size="icon" className="rounded-[1.8rem] w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        <Maximize2 size={20} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return <span className={`inline-flex items-center justify-center ${className}`}>{children}</span>
}