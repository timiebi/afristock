"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowRight, Chrome, Github } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-12"
    >
      <div className="space-y-3">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground">Login</h1>
        <p className="text-muted-foreground font-medium text-lg italic font-serif leading-none">
          Curating the culture.
        </p>
      </div>

      <div className="space-y-8">
        {/* Social - Large Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 rounded-3xl gap-3 border-border bg-transparent hover:bg-secondary transition-all">
            <Chrome className="w-5 h-5" /> 
            <span className="text-[10px] font-black tracking-widest uppercase">Google</span>
          </Button>
          <Button variant="outline" className="h-16 rounded-3xl gap-3 border-border bg-transparent hover:bg-secondary transition-all">
            <Github className="w-5 h-5" /> 
            <span className="text-[10px] font-black tracking-widest uppercase">GitHub</span>
          </Button>
        </div>

        <div className="relative">
           <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
           <span className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em] bg-card px-4 text-muted-foreground/40 font-sans">Credential</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email</label>
            <Input 
              placeholder="name@afristock.com" 
              className="h-16 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 transition-all px-6 font-medium text-foreground" 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Password</label>
              <Link href="/auth/forgot" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">Recover?</Link>
            </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="h-16 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 transition-all px-6 font-medium text-foreground" 
            />
          </div>
          
          <Button className="w-full h-16 rounded-4xl text-lg font-black bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group mt-4">
            LOGIN <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-muted-foreground">
        No account? <Link href="/auth/signup" className="text-primary font-bold hover:underline underline-offset-4">Join now</Link>
      </p>
    </motion.div>
  )
}