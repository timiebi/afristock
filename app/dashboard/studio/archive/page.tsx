"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import {
    Download,
    Edit3, Eye,
    LayoutGrid, List,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
    X
} from "lucide-react"
import { useMemo, useState } from "react"

const INITIAL_DATA = [
  { id: 1, title: "Nairobi Skyline", status: "Published", date: "Oct 12, 2025", sales: 12, price: 24, views: "1.2k", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80" },
  { id: 2, title: "Masai Warrior", status: "Pending", date: "Oct 14, 2025", sales: 0, price: 45, views: "430", img: "https://images.unsplash.com/photo-1523805081446-cd93d569b912?auto=format&fit=crop&q=80" },
  { id: 3, title: "Atlas Mountains", status: "Rejected", date: "Oct 10, 2025", sales: 0, price: 15, views: "89", img: "https://images.unsplash.com/photo-1489493585363-d69421e0dee3?auto=format&fit=crop&q=80" },
  { id: 4, title: "Lagos Nightlife", status: "Published", date: "Oct 18, 2025", sales: 8, price: 30, views: "2.1k", img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80" },
]

export default function ArchivePage() {
  const [items, setItems] = useState(INITIAL_DATA)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingItem, setEditingItem] = useState<any>(null)

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, items])

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="max-w-350 mx-auto space-y-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">The Archive</h1>
          <p className="text-sm text-zinc-500 font-medium">Your curated collection of visual stories.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl flex">
            <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-zinc-800 shadow-sm text-primary' : 'text-zinc-400'}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-zinc-800 shadow-sm text-primary' : 'text-zinc-400'}`}><List className="w-4 h-4" /></button>
          </div>
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 shadow-lg shadow-primary/20 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Upload Work
          </Button>
        </div>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="relative max-w-xl group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search by title, location or tag..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-12 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800/60 shadow-sm focus:ring-4 focus:ring-primary/5 transition-all"
        />
      </div>

      {/* --- CONTENT AREA --- */}
      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <ArchiveGridCard key={item.id} item={item} onDelete={handleDelete} onEdit={setEditingItem} />
            ))}
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-4xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Asset Identity</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Status</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Date</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                {filteredItems.map((item) => (
                  <ArchiveListRow key={item.id} item={item} onDelete={handleDelete} onEdit={setEditingItem} />
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- EDIT MODAL --- */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-md rounded-[2.5rem] bg-card border-border overflow-hidden p-0 border-none shadow-2xl">
          <div className="aspect-16/10 relative">
            <img src={editingItem?.img} className="w-full h-full object-cover" />
            <button onClick={() => setEditingItem(null)} className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Title</label>
                <Input defaultValue={editingItem?.title} className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Price ($)</label>
                    <Input defaultValue={editingItem?.price} className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                 </div>
                 <div className="flex items-end">
                    <Button onClick={() => setEditingItem(null)} className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">Update Asset</Button>
                 </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* --- REFINED SUB-COMPONENTS --- */

function ArchiveGridCard({ item, onDelete, onEdit }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-4/3 relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
        <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4">
          <ActionMenu item={item} onDelete={onDelete} onEdit={onEdit} isFloating />
        </div>
        <div className="absolute bottom-4 left-4">
          <StatusBadge status={item.status} />
        </div>
      </div>
      <div className="mt-4 px-1 flex justify-between items-start">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-xs text-zinc-500 font-medium flex items-center gap-2 mt-1">
             <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views}</span>
             <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {item.sales}</span>
          </p>
        </div>
        <span className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-400">${item.price}</span>
      </div>
    </div>
  )
}

function ArchiveListRow({ item, onDelete, onEdit }: any) {
  return (
    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
      <td className="px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-zinc-200/50 shrink-0">
            <img src={item.img} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{item.title}</p>
            <p className="text-xs text-zinc-500 font-medium">${item.price}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
      <td className="px-6 py-4 text-xs font-bold text-zinc-400">{item.date}</td>
      <td className="px-6 py-4 text-right pr-12">
        <ActionMenu item={item} onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  )
}

function ActionMenu({ item, onDelete, onEdit, isFloating }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`p-2 rounded-full transition-all ${isFloating ? 'bg-white/90 backdrop-blur-md shadow-lg text-zinc-900 opacity-0 group-hover:opacity-100' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400'}`}>
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl min-w-40 p-2 shadow-2xl border-zinc-200 dark:border-zinc-800">
        <DropdownMenuItem onClick={() => onEdit(item)} className="rounded-xl py-3 gap-3 font-bold text-xs cursor-pointer focus:bg-primary/5 focus:text-primary"><Edit3 className="w-4 h-4" /> Edit Details</DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl py-3 gap-3 font-bold text-xs cursor-pointer focus:bg-primary/5 focus:text-primary"><Eye className="w-4 h-4" /> View Public</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(item.id)} className="rounded-xl py-3 gap-3 font-bold text-xs cursor-pointer text-destructive focus:bg-destructive/5 focus:text-destructive"><Trash2 className="w-4 h-4" /> Delete Asset</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Rejected: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  }
  return (
    <span className={`text-[9px] font-bold px-3 py-1 rounded-full border backdrop-blur-md uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  )
}