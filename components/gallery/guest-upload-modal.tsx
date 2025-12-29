"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowRight, Camera, CheckCircle2,
    Loader2,
    Mail,
    MapPin, Upload, User, X
} from "lucide-react"
import { useState } from "react"

export function GuestUploadModal({ open, setOpenAction }: { open: boolean, setOpenAction: (open: boolean) => void }) {
  const [step, setStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // 1. Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const nextStep = () => {
    if (step === 2) {
      simulateUpload()
    } else {
      setStep(step + 1)
    }
  }

  // 2. Simulate Professional Upload State
  const simulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setStep(3)
    }, 2500)
  }

  const resetAndClose = () => {
    setOpenAction(false)
    setTimeout(() => {
      setStep(1)
      setSelectedFile(null)
      setPreviewUrl(null)
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-background rounded-[2.5rem] shadow-2xl">
        <DialogTitle className="sr-only">Upload Asset</DialogTitle>
        
        <div className="flex flex-col md:flex-row h-137.5">
          
          {/* Left Side: Editorial Context */}
          <div className="hidden md:flex w-1/3 bg-zinc-900 p-10 flex-col justify-between text-white relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-black leading-none tracking-tighter uppercase italic">
                  Preserve <br /> The Soul.
                </h2>
                <p className="text-zinc-500 text-xs mt-4 font-bold uppercase tracking-widest leading-loose">
                  Your lens captures <br /> the heritage we protect.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <span>Progress</span>
                <span>{step === 3 ? "Done" : `${step} / 2`}</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  className="h-full bg-primary" 
                />
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Flow */}
          <div className="flex-1 p-10 flex flex-col relative bg-white dark:bg-zinc-950">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1" 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-8 flex-1 flex flex-col justify-center"
                >
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Select Asset</h3>
                    <p className="text-zinc-400 text-sm font-medium">Contribute to the largest African stock library.</p>
                  </div>

                  {!previewUrl ? (
                    <label className="relative group border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-4xl p-12 text-center hover:border-primary/50 hover:bg-primary/2 transition-all cursor-pointer block">
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-zinc-400 group-hover:text-primary" />
                      </div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Click to browse or drop</p>
                      <p className="text-xs text-zinc-400 mt-2 font-medium">Supports RAW, JPG, PNG (Max 50MB)</p>
                    </label>
                  ) : (
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 shadow-inner">
                      <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                      <button 
                        onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                        className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full backdrop-blur-md hover:bg-black transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <Button 
                    disabled={!selectedFile}
                    onClick={nextStep} 
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                  >
                    Next Step
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2" 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 flex-1 flex flex-col justify-center"
                >
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Metadata</h3>
                    <p className="text-zinc-400 text-sm font-medium">Give your masterpiece a context.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Creator</label>
                            <div className="relative">
                                <User className="absolute left-4 top-4 w-4 h-4 text-primary" />
                                <Input placeholder="Professional Name" className="pl-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 w-4 h-4 text-primary" />
                                <Input placeholder="City, Country" className="pl-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-4 w-4 h-4 text-primary" />
                            <Input placeholder="name@example.com" className="pl-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none" />
                        </div>
                    </div>
                  </div>

                  <Button 
                    disabled={isUploading}
                    onClick={nextStep} 
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Complete Upload <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3" 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-primary/10 rounded-4xl flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl -z-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Thank You</h3>
                    <p className="text-zinc-500 text-sm px-10 leading-relaxed font-medium">
                        Your heritage story has been submitted. Our curators will review it within 24 hours.
                    </p>
                  </div>

                  <Button onClick={resetAndClose} variant="outline" className="h-12 rounded-xl px-12 font-bold border-zinc-200">
                    Finish
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}