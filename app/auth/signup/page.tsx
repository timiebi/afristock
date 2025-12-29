"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowRight, Chrome, Github } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-10"
    >
      <div className="space-y-3">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground">Join</h1>
        <p className="text-muted-foreground font-medium text-lg italic font-serif leading-none">
          Start your legacy today.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-14 rounded-2xl gap-3 border-border bg-transparent hover:bg-secondary">
            <Chrome className="w-4 h-4" /> 
            <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl gap-3 border-border bg-transparent hover:bg-secondary">
            <Github className="w-4 h-4" /> 
            <span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name</label>
            <Input 
              placeholder="Kofi Mensah" 
              className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 transition-all px-6 font-medium text-foreground" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email</label>
            <Input 
              placeholder="name@afristock.com" 
              className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 transition-all px-6 font-medium text-foreground" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Password</label>
            <Input 
              type="password" 
              placeholder="Create a strong password" 
              className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 transition-all px-6 font-medium text-foreground" 
            />
          </div>
          
          <Button className="w-full h-16 rounded-4xl text-lg font-black bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all group mt-2">
            CREATE ACCOUNT <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-muted-foreground">
        Already a member? <Link href="/auth/login" className="text-primary font-bold hover:underline">Sign in</Link>
      </p>
    </motion.div>
  )
}