"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { Globe, MapPin, Upload, X } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export function UploadZone() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  return (
    <div className="max-w-4xl mx-auto bg-background border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row h-full min-h-125">
        
        {/* LEFT: The Dropzone */}
        <div 
          {...getRootProps()} 
          className={`flex-1 p-8 border-r border-border/50 flex flex-col items-center justify-center transition-all cursor-pointer
            ${isDragActive ? "bg-primary/5" : "bg-secondary/20 hover:bg-secondary/30"}`}
        >
          <input {...getInputProps()} />
          
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full aspect-4/5 rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className={`w-8 h-8 ${isDragActive ? "text-primary animate-bounce" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-xl font-bold italic font-serif text-primary">Upload your African Story</h3>
                <p className="text-sm text-muted-foreground max-w-50">Drag and drop high-res RAW or JPEG files here.</p>
                <Button variant="outline" className="rounded-full px-8 border-primary/20 text-primary">Select File</Button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Metadata & Heritage Details */}
        <div className="flex-1 p-10 space-y-8 bg-background">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tighter uppercase">Image Details</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Preserve the context of your work</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Photo Title</label>
              <Input placeholder="e.g. Dusk at the Makoko Floating School" className="rounded-xl border-border/50 bg-secondary/20 focus:bg-background h-12" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <Input placeholder="Lagos, Nigeria" className="rounded-xl border-border/50 bg-secondary/20 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> Tribe/Culture
                </label>
                <Input placeholder="Yoruba" className="rounded-xl border-border/50 bg-secondary/20 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">The Story (Heritage Info)</label>
              <Textarea 
                placeholder="Describe the cultural significance of this shot..." 
                className="rounded-xl border-border/50 bg-secondary/20 h-32 resize-none" 
              />
            </div>
          </div>

          <Button 
            disabled={!file}
            className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Publish to AfriStock Archive
          </Button>
        </div>
      </div>
    </div>
  )
}