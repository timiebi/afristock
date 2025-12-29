"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { motion } from "framer-motion"
import {
    Calendar, Camera, Download, Heart, Info,
    MapPin,
    Maximize2,
    Share2, ShieldCheck,
    UserCircle,
    ZoomIn, ZoomOut
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface PhotoDetailModalProps {
  photo: any
  children: React.ReactNode
}

export function PhotoDetailModal({ photo, children }: PhotoDetailModalProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Generate artist URL based on name
  const artistUrl = `/artist/${photo.author.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <Dialog onOpenChange={() => setIsZoomed(false)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[98vw] md:max-w-[95vw] lg:max-w-[90vw] w-full h-[95vh] md:h-[90vh] p-0 overflow-hidden bg-background border-none flex flex-col md:flex-row shadow-2xl rounded-4xl">
        
        <VisuallyHidden>
          <DialogTitle>{photo.title} by {photo.author}</DialogTitle>
        </VisuallyHidden>

        {/* LEFT: Immersive Cinematic Stage */}
        <div className="flex-1 bg-[#050505] relative flex items-center justify-center overflow-hidden group">
          
          {/* 1. Dynamic Blurred Background (Fills the 'Full' space) */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <img
              src={photo.url}
              alt=""
              className="w-full h-full object-cover blur-[80px] scale-110"
            />
          </div>

          {/* 2. The Main Image with Zoom Logic */}
          <div 
            className={cn(
              "relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 p-4 md:p-12",
              isZoomed ? "cursor-zoom-out p-0" : "cursor-zoom-in"
            )}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: isZoomed ? 1.1 : 1,
              }}
              src={photo.url}
              alt={photo.title}
              className={cn(
                "shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] transition-all duration-500",
                isZoomed ? "w-full h-full object-cover md:object-contain" : "max-w-full max-h-full object-contain rounded-sm"
              )}
            />
          </div>

          {/* 3. Stage Controls (Top Left) */}
          <div className="absolute top-6 left-6 z-20 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-black/40 backdrop-blur-xl border-white/10 text-white hover:bg-black/60"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-black/40 backdrop-blur-xl border-white/10 text-white hover:bg-black/60 hidden md:flex"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* 4. Stage Watermark (Bottom Left) */}
          <div className="absolute bottom-6 left-8 z-20 items-center gap-4 hidden md:flex">
            <div className="h-px w-8 bg-white/20" />
            <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-black">
              {photo.location} • AF-STK-{photo.id.slice(0, 5)}
            </span>
          </div>
        </div>

        {/* RIGHT: Context & Metadata Panel */}
        <div className="w-full md:w-100 lg:w-115 border-l border-border/50 bg-background flex flex-col overflow-y-auto">
          
          <div className="p-8 md:p-10 space-y-10">
            {/* Header: Actions */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                {photo.isPro ? `Premium Asset • $${photo.price}` : "Free Heritage License"}
              </Badge>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn("rounded-full transition-colors", isLiked ? "text-red-500 bg-red-50" : "hover:bg-secondary")}
                >
                  <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Title & Artist (Clickable) */}
            <div className="space-y-6">
              <h2 className="text-4xl font-black tracking-tighter leading-tight italic font-serif">
                {photo.title}
              </h2>
              
              <Link href={artistUrl} className="group/artist block">
                <div className="flex items-center gap-4 p-3 -m-3 rounded-4xl hover:bg-secondary/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 overflow-hidden shrink-0 border-2 border-transparent group-hover/artist:border-primary/30 transition-all">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${photo.author}`} 
                      className="w-full h-full object-cover" 
                      alt={photo.author}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg flex items-center gap-1.5 group-hover/artist:text-primary transition-colors">
                      {photo.author} <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                    </p>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                      View Profile <UserCircle className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Description Box */}
            <div className="p-6 rounded-4xl bg-secondary/40 border border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Info className="w-12 h-12" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 block">Story behind the asset</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic relative z-10">
                "Captured in {photo.location}, this visual narrative documents the living history of the region. Every shadow and highlight is preserved to showcase the authentic soul of the landscape."
              </p>
            </div>

            {/* Primary Action */}
            <div className="space-y-4 pt-4">
              <Button className="w-full h-16 text-base font-black rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest">
                <Download className="mr-3 w-5 h-5" /> 
                {photo.isPro ? "Purchase High-Res" : "Download Free"}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Standard License Included
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 py-8 border-t border-border/50">
              <MetaItem icon={<MapPin className="w-3.5 h-3.5" />} label="Location" value={photo.location} />
              <MetaItem icon={<Camera className="w-3.5 h-3.5" />} label="Gear" value="Phase One XF" />
              <MetaItem icon={<Calendar className="w-3.5 h-3.5" />} label="Published" value="Dec 2025" />
              <MetaItem icon={<Maximize2 className="w-3.5 h-3.5" />} label="Resolution" value="8640 x 5760" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black">
        {icon} {label}
      </div>
      <p className="text-sm font-bold truncate text-zinc-800 dark:text-zinc-200">{value}</p>
    </div>
  )
}