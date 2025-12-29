"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Clock,
  Download,
  Eye,
  MoreHorizontal
} from "lucide-react"

export default function StudioPage() {
  return (
    <div className="max-w-350 mx-auto space-y-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Studio Overview</h1>
          <p className="text-sm text-zinc-500 font-medium">Performance metrics for your visual archive.</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">Live Updates</span>
        </div>
      </div>

      {/* --- STATS: STOCKCAKE CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Views" value="48,290" change="+12%" />
        <StatCard label="Downloads" value="1,204" change="+5%" />
        <StatCard label="Followers" value="892" change="+18%" />
        <StatCard label="Earnings" value="$4,120" change="+22%" />
      </div>

      {/* --- RECENT ACTIVITY: IMAGE GRID --- */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Recent Activity</h2>
          <Button variant="ghost" className="text-xs font-bold text-zinc-400 hover:text-primary transition-colors">
            View Archive <ArrowUpRight className="ml-1 w-3 h-3" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, title: "Lagos Street Life", views: "1.2k", dl: "45", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop" },
            { id: 2, title: "Serengeti Dusk", views: "3.4k", dl: "128", img: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=800&auto=format&fit=crop" },
            { id: 3, title: "Modern Accra", views: "890", dl: "12", img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=800&auto=format&fit=crop" }
          ].map((asset) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group cursor-pointer"
            >
              {/* Image Frame */}
              <div className="aspect-16/10 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 relative">
                <img 
                  src={asset.img}
                  alt={asset.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md px-2 py-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 uppercase">2h ago</span>
                  </div>
                </div>
              </div>

              {/* Info Row */}
              <div className="mt-4 flex items-start justify-between px-1">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{asset.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                      <Eye className="w-3 h-3" /> {asset.views}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                      <Download className="w-3 h-3" /> {asset.dl}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</h3>
      <div className="mt-4 h-0.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  )
}