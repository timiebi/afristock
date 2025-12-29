"use client"

import { Button } from "@/components/ui/button"
import { 
  Menu, 
  Upload, 
  User, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Heart, 
  Camera 
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GuestUploadModal } from "../gallery/guest-upload-modal"
import { ModeToggle } from "../mode-toggle"
import { NavbarSearch } from "./navBarSearch"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "py-3 bg-background/80 backdrop-blur-md border-b border-border/50" : "py-6 bg-transparent"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl italic">A</span>
          </div>
          <span className="font-black text-xl tracking-tighter hidden sm:block uppercase">
            AFRI<span className="text-primary">STOCK</span>
          </span>
        </Link>

        {/* 2. Advanced Search */}
        <NavbarSearch/>

        {/* 3. Actions Section */}
        <div className="flex items-center gap-3">
          <Link href="/explore" className="cursor-pointer">
            <Button variant="ghost" className="hidden lg:flex gap-2 items-center hover:text-primary font-bold text-xs uppercase tracking-widest">
              Explore
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => setUploadOpen(true)}
            className="hidden sm:flex gap-2 items-center border-primary/20 hover:bg-primary/5 rounded-full px-6 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <Upload className="w-4 h-4" />
            Submit Photo
          </Button>

          <div className="h-6 w-px bg-border mx-2" />
          
          <ModeToggle />

          {/* PROFILE DROPDOWN AREA */}
          <div className="relative" ref={dropdownRef}>
            <Button 
              size="icon" 
              variant={profileOpen ? "secondary" : "ghost"} 
              className="rounded-full relative overflow-hidden transition-all"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <User className="w-5 h-5" />
            </Button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-64 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden p-2 z-60"
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 mb-2 border-b border-border/50">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Creator Account</p>
                    <p className="text-sm font-bold truncate">kofi_mensah.studio</p>
                  </div>

                  
                  <div className="space-y-1">
                    <DropdownLink icon={<Camera className="w-4 h-4" />} label="My Portfolio" href="/profile" />
                    <DropdownLink icon={<LayoutDashboard className="w-4 h-4" />} label="Analytics" href="/dashboard/studio" />
                    <DropdownLink icon={<Heart className="w-4 h-4" />} label="Collection" href="/favorites" />
                    <DropdownLink icon={<Settings className="w-4 h-4" />} label="Settings" href="/settings" />
                  </div>

                  {/* Danger Zone */}
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <button onClick={()=>router.push("/auth/login")} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group">
                      <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span className="text-[11px] font-black uppercase tracking-wider">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button size="icon" variant="ghost" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <GuestUploadModal open={uploadOpen} setOpenAction={setUploadOpen} />
    </nav>
  )
}

// Helper Component for Dropdown Links
function DropdownLink({ icon, label, href, color = "text-foreground" }: { icon: any, label: string, href: string, color?: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary transition-all group ${color}`}>
      <span className="text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
    </Link>
  )
}