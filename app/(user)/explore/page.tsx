"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Download, Globe, Heart, Maximize2, Share2, SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"

const CATEGORIES = [
  { name: "Culture", count: "1.2k", img: "https://images.unsplash.com/photo-1536300007881-7e482242baa5?auto=format&fit=crop&q=80" },
  { name: "Architecture", count: "850", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" },
  { name: "Wildlife", count: "2.4k", img: "https://images.unsplash.com/photo-1516422213484-a3f7bd81c739?auto=format&fit=crop&q=80" },
  { name: "Daily Life", count: "3.1k", img: "https://images.unsplash.com/photo-1523496927382-33e31ffc7ee0?auto=format&fit=crop&q=80" },
]
export default function ExplorePage() {
  const [quickViewUrl, setQuickViewUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 relative">
      
   {/* --- PHOTOGRAPHER-CENTRIC HERO --- */}
      <section className="container mx-auto px-6 mb-40 pt-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
          
          <div className="max-w-4xl space-y-8">
            <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.8] uppercase">
              The <br />
              <span className="text-zinc-300 dark:text-zinc-700 italic font-serif lowercase">Gallery.</span>
            </h1>
            
            <p className="text-zinc-500 text-xl md:text-2xl font-medium max-w-lg leading-tight tracking-tight">
              The premier destination for professional African photography. Connect, contribute, and discover high-fidelity visual assets.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Button 
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                  className="rounded-full px-8 h-14 bg-zinc-900 text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
              >
                View Feed
              </Button>
              <Button 
                  variant="outline"
                  className="rounded-full px-8 h-14 border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-widest text-[10px]"
              >
                Upload Work
              </Button>
            </div>
          </div>

          <div className="hidden lg:block w-full max-w-sm aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
            <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                alt="Professional Photography"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
               <p className="text-[9px] font-black text-white uppercase tracking-widest">Featured Creator</p>
               <p className="text-sm font-bold text-white">Adisa Azikiwe</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK VIEW OVERLAY --- */}

       <AnimatePresence>
        {quickViewUrl && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setQuickViewUrl(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full aspect-4/3 md:aspect-video bg-zinc-900 rounded-4xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e:any) => e.stopPropagation()}
            >
              <img src={quickViewUrl} className="w-full h-full object-contain" alt="Quick View" />
              
              {/* Header Info */}
              <div className="absolute top-8 left-8 right-8 flex items-center justify-between pointer-events-none">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl pointer-events-auto">
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Asset Identity</p>
                   <p className="text-white font-bold">Heritage_Visual_00293.jpg</p>
                </div>
                <Button 
                  onClick={() => setQuickViewUrl(null)}
                  variant="secondary" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 pointer-events-auto"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Action Footer */}
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                <div className="flex gap-4">
                  <Button className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform">
                    <Download className="mr-2 w-5 h-5" /> Download Asset
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/20 text-white hover:bg-white/10">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
                <div className="hidden md:block text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Metadata</p>
                   <p className="text-white/60 text-sm font-medium tracking-tight italic">8640 x 5760 PX • 300 DPI</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CATEGORY BENTO --- */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex items-end justify-between mb-12">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-400">Collections</h3>
            <div className="h-px flex-1 mx-8 bg-zinc-100 dark:bg-zinc-900 hidden md:block" />
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -5 }}
              className="group relative h-125 rounded-2xl overflow-hidden cursor-pointer bg-zinc-100"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.3em] mb-2">{cat.count} Items</p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DISCOVERY GRID --- */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="flex gap-10">
                {["Latest", "Trending", "Archive"].map((tab, i) => (
                    <button key={tab} className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors relative ${i === 0 ? "text-primary" : "text-zinc-400"}`}>
                        {tab}
                        {i === 0 && <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary" />}
                    </button>
                ))}
            </div>
            
            <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-full h-10 px-5 border-zinc-200 text-[10px] font-black uppercase tracking-widest">
                    <SlidersHorizontal className="w-3 h-3 mr-2" /> Filter
                </Button>
                <Button variant="outline" className="rounded-full h-10 px-5 border-zinc-200 text-[10px] font-black uppercase tracking-widest">
                    <Globe className="w-3 h-3 mr-2" /> Region
                </Button>
            </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {[...Array(16)].map((_, i) => {
            const currentImg = `https://picsum.photos/seed/${i + 80}/800/${i % 2 === 0 ? 1100 : 1300}`;
            return (
              <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in" onClick={() => setQuickViewUrl(currentImg)}>
                  <img src={currentImg} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" alt="Discovery" />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                       <Button 
                         onClick={() => setQuickViewUrl(currentImg)}
                         variant="secondary" className="rounded-full font-black text-[10px] uppercase tracking-[0.2em] h-12 px-8 bg-white text-black"
                       >
                           Quick Inspect
                       </Button>
                       <div className="flex gap-2">
                         <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                            <Maximize2 className="w-4 h-4" />
                         </div>
                         <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                            <Heart className="w-4 h-4" />
                         </div>                      </div>
                   </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}









// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Search, Sparkles, ArrowRight, Globe, SlidersHorizontal, Command, Plus, X, Download, Share2, Maximize2 } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"

// const CATEGORIES = [
//   { name: "Culture", count: "1.2k", img: "https://images.unsplash.com/photo-1536300007881-7e482242baa5?auto=format&fit=crop&q=80" },
//   { name: "Architecture", count: "850", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" },
//   { name: "Wildlife", count: "2.4k", img: "https://images.unsplash.com/photo-1516422213484-a3f7bd81c739?auto=format&fit=crop&q=80" },
//   { name: "Daily Life", count: "3.1k", img: "https://images.unsplash.com/photo-1523496927382-33e31ffc7ee0?auto=format&fit=crop&q=80" },
// ]

// export default function ExplorePage() {
//   const [quickViewUrl, setQuickViewUrl] = useState<string | null>(null);

//   return (
//     <div className="min-h-screen bg-background pt-32 pb-20 relative overflow-x-hidden">
      
//    {/* --- REFINED BRAND HERO --- */}
//       <section className="container mx-auto px-6 mb-32 relative pt-20">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
//           {/* Left Side: Statement Content */}
//           <div className="max-w-3xl space-y-12">
//             <div className="space-y-6">
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                 className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
//               >
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
//                 </span>
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
//                   EST. 2025 <span className="mx-2 text-zinc-300">•</span> THE VISUAL AUTHORITY
//                 </span>
//               </motion.div>
              
//               <h1 className="text-6xl md:text-[6.5rem] font-extrabold tracking-[-0.05em] text-zinc-900 dark:text-zinc-50 leading-[0.9]">
//                 Capturing the <br />
//                 <span className="bg-gradient-to-b from-zinc-400 to-zinc-700 dark:from-zinc-500 dark:to-zinc-100 bg-clip-text text-transparent italic font-serif pr-4">
//                   African Soul.
//                 </span>
//               </h1>
              
//               <p className="text-zinc-500 text-xl md:text-2xl font-medium max-w-xl leading-relaxed tracking-tight">
//                 High-fidelity visual storytelling, curated for world-class designers, filmmakers, and digital curators. 
//               </p>
//             </div>

//             {/* Scroll Indicator / Call to Action */}
//             <div className="flex items-center gap-8 pt-4">
//               <Button 
//                 onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
//                 className="rounded-full px-10 font-black uppercase tracking-widest h-16 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
//               >
//                 Enter the Archive
//               </Button>
              
//               <div className="flex flex-col items-start border-l border-zinc-200 dark:border-zinc-800 pl-8">
//                 <span className="text-3xl font-black tracking-tighter">2.4M+</span>
//                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Premium Assets</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Hero Imagery */}
//           <div className="hidden lg:block relative w-full max-w-md aspect-[3/4]">
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1.2, ease: "circOut" }}
//                 className="w-full h-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-zinc-900"
//               >
//                 <img 
//                   src="https://images.unsplash.com/photo-1523805081446-cd93d569b912?auto=format&fit=crop&q=80" 
//                   className="w-full h-full object-cover"
//                   alt="Culture"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
//                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Featured Selection</p>
//                    <p className="text-white text-2xl font-bold tracking-tight italic font-serif">"The Vibrant Soul of Accra"</p>
//                 </div>
//               </motion.div>

//               {/* Minimal Artist Tag */}
//               <div className="absolute -right-16 bottom-24 bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
//                  <div className="w-12 h-12 rounded-2xl bg-zinc-200 overflow-hidden shadow-inner">
//                     <img src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80" alt="Artist" className="w-full h-full object-cover" />
//                  </div>
//                  <div className="pr-4">
//                     <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Contributor</p>
//                     <p className="text-sm font-bold tracking-tight">Kofi Mensah</p>
//                  </div>
//               </div>
//           </div>
//         </div>
//       </section>

//       {/* --- QUICK VIEW OVERLAY (The "View Once" Inspector) --- */}
//       <AnimatePresence>
//         {quickViewUrl && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
//             onClick={() => setQuickViewUrl(null)}
//           >
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
//               className="relative max-w-6xl w-full aspect-[4/3] md:aspect-video bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
//               onClick={(e:any) => e.stopPropagation()}
//             >
//               <img src={quickViewUrl} className="w-full h-full object-contain" alt="Quick View" />
              
//               {/* Header Info */}
//               <div className="absolute top-8 left-8 right-8 flex items-center justify-between pointer-events-none">
//                 <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl pointer-events-auto">
//                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Asset Identity</p>
//                    <p className="text-white font-bold">Heritage_Visual_00293.jpg</p>
//                 </div>
//                 <Button 
//                   onClick={() => setQuickViewUrl(null)}
//                   variant="secondary" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 pointer-events-auto"
//                 >
//                   <X className="w-6 h-6" />
//                 </Button>
//               </div>

//               {/* Action Footer */}
//               <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
//                 <div className="flex gap-4">
//                   <Button className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform">
//                     <Download className="mr-2 w-5 h-5" /> Download Asset
//                   </Button>
//                   <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/20 text-white hover:bg-white/10">
//                     <Share2 className="w-5 h-5" />
//                   </Button>
//                 </div>
//                 <div className="hidden md:block text-right">
//                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Metadata</p>
//                    <p className="text-white/60 text-sm font-medium tracking-tight italic">8640 x 5760 PX • 300 DPI</p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- CATEGORY BENTO (Untouched per request) --- */}
//       <section className="container mx-auto px-6 mb-24">
//         <div className="flex items-center justify-between mb-10 border-b border-zinc-100 dark:border-zinc-900 pb-6">
//             <div className="space-y-1">
//                 <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Curated</h2>
//                 <h3 className="text-2xl font-black uppercase tracking-tighter italic font-serif">Topical Collections</h3>
//             </div>
//             <Button variant="ghost" className="text-xs font-black uppercase tracking-widest">View All <ArrowRight className="ml-2 w-4 h-4" /></Button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {CATEGORIES.map((cat, i) => (
//             <motion.div 
//               key={cat.name}
//               whileHover={{ scale: 0.98 }}
//               className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer"
//             >
//               <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
//               <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start gap-4">
//                 <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
//                     {cat.count} ASSETS
//                 </Badge>
//                 <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{cat.name}</h3>
//                 <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
//                     <ArrowRight className="w-5 h-5 text-black" />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* --- DISCOVERY GRID (With Quick View Trigger) --- */}
//       <section className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//             <div className="flex gap-12 border-b md:border-none border-zinc-100 dark:border-zinc-900 pb-4 md:pb-0 overflow-x-auto whitespace-nowrap">
//                 {["Fresh", "Trending", "Historical", "Verified"].map((tab, i) => (
//                     <button key={tab} className={cn(
//                         "text-[10px] font-black uppercase tracking-[0.3em] transition-colors pb-2 relative group",
//                         i === 0 ? "text-primary" : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
//                     )}>
//                         {tab}
//                         {i === 0 && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
//                     </button>
//                 ))}
//             </div>
            
//             <div className="flex items-center gap-3">
//                 <Button variant="outline" className="rounded-full h-11 px-6 border-zinc-200 dark:border-zinc-800 font-bold text-xs">
//                     <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
//                 </Button>
//                 <Button variant="outline" className="rounded-full h-11 px-6 border-zinc-200 dark:border-zinc-800 font-bold text-xs">
//                     <Globe className="w-4 h-4 mr-2" /> All Regions
//                 </Button>
//             </div>
//         </div>

//         <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
//           {[...Array(12)].map((_, i) => {
//             const currentImg = `https://picsum.photos/seed/${i + 50}/800/${i % 2 === 0 ? 1000 : 1200}`;
//             return (
//               <div key={i} className="break-inside-avoid relative group rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-transparent hover:border-primary/20 transition-all duration-500">
//                   <img 
//                       src={currentImg} 
//                       className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000 cursor-zoom-in"
//                       alt="Discovery"
//                   />
//                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
//                       <Button 
//                         onClick={() => setQuickViewUrl(currentImg)}
//                         variant="secondary" className="rounded-full font-black text-[10px] uppercase tracking-[0.2em] h-12 px-8 bg-white text-black"
//                       >
//                           Quick Inspect
//                       </Button>
//                       <div className="flex gap-2">
//                         <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
//                            <Maximize2 className="w-4 h-4" />
//                         </div>
//                         <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
//                            <Heart className="w-4 h-4" />
//                         </div>
//                       </div>
//                   </div>
//               </div>
//             )
//           })}
//         </div>
//       </section>
//     </div>
//   )
// }

// function cn(...inputs: any[]) {
//     return inputs.filter(Boolean).join(" ");
// }

// function Heart({ className }: { className?: string }) {
//   return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
// }