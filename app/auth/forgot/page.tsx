"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowLeft, MailCheck } from "lucide-react"
import Link from "next/link"

export default function ForgotPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-10"
    >
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <MailCheck className="w-6 h-6" />
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground leading-none">Recover</h1>
        <p className="text-muted-foreground font-medium text-lg italic font-serif">
          Reset your studio access.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Recovery Email</label>
          <Input 
            placeholder="Enter your registered email" 
            className="h-16 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 transition-all px-6 font-medium text-foreground" 
          />
        </div>
        
        <Button className="w-full h-16 rounded-4xl text-lg font-black bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all mt-4">
          SEND RESET LINK
        </Button>

        <Link 
          href="/auth/login" 
          className="flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  )
}