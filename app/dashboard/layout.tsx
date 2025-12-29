"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    BarChart3,
    Bell,
    Image as ImageIcon,
    LayoutDashboard,
    LogOut,
    Plus,
    Search,
    Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard/studio" },
  { label: "Archive", icon: ImageIcon, href: "/dashboard/studio/archive" },
  { label: "Insights", icon: BarChart3, href: "/dashboard/studio/analytics" },
  { label: "Settings", icon: Settings, href: "/dashboard/studio/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#09090B] flex">
      
      {/* --- SIDEBAR: Floating & Transparent --- */}
      <aside className="w-64 hidden lg:flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200/60 dark:border-zinc-800/60 sticky top-0 h-screen">
        
        <div className="h-20 flex items-center px-8 mb-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">A</span>
            </div>
            <span className="text-base font-bold tracking-tight">AfriStock</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <span className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all
                  ${isActive 
                    ? "bg-zinc-100 dark:bg-zinc-900 text-foreground" 
                    : "text-zinc-500 hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900/50"}
                `}>
                  <item.icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-zinc-400"}`} />
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* BOTTOM SECTION: Clean & Minimal */}
        <div className="p-4 space-y-3">
          <div className="px-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Earnings</p>
            <p className="text-lg font-bold text-foreground">$1,240.00</p>
          </div>
          
          <button className="flex items-center gap-3 px-4 py-2.5 w-full text-zinc-400 hover:text-destructive text-[13px] font-semibold transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR: Invisible/Transparent blur */}
        <header className="h-16 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="relative w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search..." 
              className="pl-10 h-9 border-none bg-transparent focus-visible:ring-0 text-sm placeholder:text-zinc-400"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="text-zinc-400 hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <Link href="/upload">
              <Button className="h-9 px-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:opacity-90 transition-all">
                <Plus className="w-4 h-4 mr-1.5" /> Upload Work
              </Button>
            </Link>

            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200/60 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80" className="object-cover w-full h-full" alt="User" />
            </div>
          </div>
        </header>

        {/* CONTENT INJECTION: Generous Padding */}
        <div className="p-10 lg:p-14 max-w-400 mx-auto w-full">
            {children}
        </div>
      </main>
    </div>
  )
}