"use client"

import { MOCK_PHOTOS } from "@/lib/mock-data"; // Import your mock data
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, MapPin, Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "../ui/badge"

export function NavbarSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Simple Live Search Logic
  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true)
      const filtered = MOCK_PHOTOS.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5) // Limit to 5 for clean UI
      
      setTimeout(() => { // Simulate network lag
        setResults(filtered)
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md mx-8 hidden md:block">
      <div className="relative group">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search Africa's soul..."
          className="w-full bg-secondary/40 border-none rounded-full py-2.5 pl-11 pr-10 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Results Dropdown */}
      <AnimatePresence>
        {isFocused && (query.length > 0 || results.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-3 w-full bg-background border border-border/50 rounded-3xl shadow-2xl overflow-hidden z-60 backdrop-blur-xl"
          >
            <div className="p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-medium uppercase tracking-widest">Searching...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <p className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Top Results</p>
                  {results.map((photo) => (
                    <button key={photo.id} className="flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-2xl transition-colors text-left group">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-secondary shrink-0">
                        <img src={photo.url} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{photo.title}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {photo.location}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.length > 1 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <p className="text-sm italic">No heritage found for "{query}"</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Try Searching</p>
                  <div className="flex flex-wrap gap-2">
                    {['Lagos', 'Safari', 'Textiles', 'Zanzibar'].map(tag => (
                      <Badge key={tag} variant="secondary" className="rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}