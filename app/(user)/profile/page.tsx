"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowRight,
    Check,
    Copy,
    Download,
    FolderHeart,
    Grid,
    Link as LinkIcon,
    MapPin,
    Maximize2,
    Plus,
    Share2,
    X
} from "lucide-react"
import { useState } from "react"

const TABS = [
  { id: "portfolio", label: "Portfolio", icon: Grid },
  { id: "collections", label: "Collections", icon: FolderHeart },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [quickViewUrl, setQuickViewUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Function to simulate copying image link for Devs
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      
      {/* --- QUICK VIEW OVERLAY --- */}
      <AnimatePresence>
        {quickViewUrl && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setQuickViewUrl(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
              onClick={(e:any) => e.stopPropagation()}
            >
              <img src={quickViewUrl} className="w-full max-h-[70vh] object-contain bg-zinc-900" alt="Asset" />
              
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-900 border-t border-white/10">
                <div className="space-y-1 text-center md:text-left">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Asset Reference</p>
                    <p className="text-white font-bold tracking-tight">AFR_STUDIO_IMG_029.JPG</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => copyToClipboard(quickViewUrl)}
                    variant="outline" className="rounded-full px-6 border-white/10 text-white hover:bg-white/5"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Link Copied" : "Copy for Dev"}
                  </Button>
                  
                  <a href={quickViewUrl} download="afristock-asset.jpg" target="_blank" rel="noreferrer">
                    <Button className="rounded-full px-8 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
                        <Download className="mr-2 w-4 h-4" /> Download High-Res
                    </Button>
                  </a>

                  <Button onClick={() => setQuickViewUrl(null)} variant="ghost" className="text-white/40 hover:text-white">
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PROFILE HEADER --- */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-zinc-100 dark:border-zinc-900 pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] overflow-hidden bg-zinc-100 shadow-2xl border-4 border-white dark:border-zinc-900 relative group">
              <img src="https://i.pravatar.cc/150?u=afristock" className="w-full h-full object-cover" alt="Profile" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Badge className="bg-white text-black text-[8px] font-black">EDIT</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Amina Chale</h1>
                <p className="text-zinc-500 font-medium text-lg italic font-serif">Visual Storyteller & Urban Architect</p>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Lagos, NG</span>
                <span className="flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5" /> amina.studio</span>
                <div className="h-1 w-1 rounded-full bg-zinc-300 mx-1" />
                <span>2.4k Contributions</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl h-12 px-6 border-zinc-200 dark:border-zinc-800 font-black uppercase text-[10px] tracking-widest">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button className="rounded-2xl h-12 px-6 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
              Follow Creator
            </Button>
          </div>
        </div>
      </section>

      {/* --- CONTENT TABS --- */}
      <section className="container mx-auto px-6">
        <div className="flex gap-12 mb-12 border-b border-zinc-50 dark:border-zinc-950">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab.id ? "text-primary" : "text-zinc-400"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "portfolio" ? (
          <PortfolioGrid onImageClick={setQuickViewUrl} />
        ) : (
          <CollectionsGrid onImageClick={setQuickViewUrl} />
        )}
      </section>
    </div>
  )
}

/* --- REFINED SUB-COMPONENTS --- */

function PortfolioGrid({ onImageClick }: { onImageClick: (url: string) => void }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
      {[...Array(9)].map((_, i) => {
        const url = `https://picsum.photos/seed/${i + 90}/800/${i % 2 === 0 ? 1100 : 1300}`;
        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => onImageClick(url)}
            className="break-inside-avoid relative group rounded-4xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-zoom-in"
          >
            <img src={url} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" alt="Work" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-8">
               <div className="flex justify-between items-center translate-y-4 group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-bold text-xs uppercase tracking-widest">View Details</p>
                  <Maximize2 className="w-5 h-5 text-white" />
               </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function CollectionsGrid({ onImageClick }: { onImageClick: (url: string) => void }) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const folders = [
    { id: "lagos-arch", title: "Lagos Architecture", count: 24, img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" },
    { id: "textiles", title: "Traditional Textiles", count: 12, img: "https://images.unsplash.com/photo-1536300007881-7e482242baa5?auto=format&fit=crop&q=80" },
    { id: "market", title: "Market Life", count: 45, img: "https://images.unsplash.com/photo-1523496927382-33e31ffc7ee0?auto=format&fit=crop&q=80" },
  ]

  if (selectedCollection) {
    const activeFolder = folders.find(f => f.id === selectedCollection);
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-8">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setSelectedCollection(null)}
              className="rounded-full w-12 h-12 border-zinc-200"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>
            <div>
                <h3 className="text-3xl font-black tracking-tighter uppercase">{activeFolder?.title}</h3>
                <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-1">Private Collection • {activeFolder?.count} Assets</p>
            </div>
          </div>
          <Button className="rounded-full bg-primary text-white font-black text-[10px] uppercase tracking-widest h-12 px-8">
            <Download className="w-4 h-4 mr-2" /> Download Batch
          </Button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {[...Array(6)].map((_, i) => {
            const url = `https://picsum.photos/seed/coll-${i}/800/${i % 2 === 0 ? 1000 : 800}`;
            return (
              <div key={i} className="break-inside-avoid relative group rounded-4xl overflow-hidden cursor-zoom-in" onClick={() => onImageClick(url)}>
                <img src={url} className="w-full h-auto object-cover" alt="Item" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Button variant="secondary" className="rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest h-11 px-8">
                      Quick Inspect
                   </Button>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <motion.div 
        whileHover={{ scale: 0.98 }}
        className="h-87.5 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center gap-4 group hover:border-primary/40 transition-all cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
          <Plus className="w-8 h-8" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-primary">Create New Project</span>
      </motion.div>

      {folders.map((folder) => (
        <motion.div 
          key={folder.id}
          whileHover={{ y: -10 }}
          onClick={() => setSelectedCollection(folder.id)}
          className="group cursor-pointer"
        >
          <div className="h-87.5 rounded-[3rem] overflow-hidden mb-6 relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
            <img src={folder.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={folder.title} />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
               <div>
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-2">{folder.count} ITEMS</p>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{folder.title}</h3>
               </div>
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
                  <ArrowRight className="w-6 h-6 text-black" />
               </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}