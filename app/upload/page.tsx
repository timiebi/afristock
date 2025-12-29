// import { Navbar } from "@/components/layout/navbar"
// import { UploadZone } from "@/components/upload/upload-zone"

// export default function UploadPage() {
//   return (
//     <div className="min-h-screen bg-secondary/10">
//       <Navbar />
//       <main className="container mx-auto pt-32 pb-20 px-6">
//         <div className="max-w-2xl mb-12">
//           <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">Submit <br/><span className="text-primary italic font-serif font-normal">Your Vision.</span></h1>
//           <p className="text-muted-foreground text-lg">Help us build the world's most authentic digital archive of African culture.</p>
//         </div>
//         <UploadZone />
//       </main>
//     </div>
//   )
// }



"use client"

import { Navbar } from "@/components/layout/navbar"; // Assuming Navbar is universal
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, DollarSign, Image as ImageIcon, PlusCircle, Trash2, UploadCloud, X } from "lucide-react"
import { useState } from "react"

type UploadStep = 1 | 2 // Step 1: Upload, Step 2: Details

export default function UploadPage() {
  const [step, setStep] = useState<UploadStep>(1)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0) // For simulation
  const [isUploading, setIsUploading] = useState(false)

  // Form states for Step 2
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isForSale, setIsForSale] = useState(true)
  const [price, setPrice] = useState("10.00")
  const [isExclusive, setIsExclusive] = useState(false)


  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setSelectedFiles(files.filter(file => file.type.startsWith('image/'))) // Only accept images
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files.filter(file => file.type.startsWith('image/')))
  }

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0) // Reset progress

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setStep(2) // Move to details step
      }
    }, 200);
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }


  return (
    <div className="bg-background selection:bg-primary selection:text-white min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-4 text-center"
        >
          <h1 className="text-7xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase text-foreground">
            SHARE YOUR <br />
            <span className="italic font-serif font-light text-muted-foreground/40">Vision.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your high-resolution photos and join our archive of African excellence.
          </p>
        </motion.div>

        {/* The Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-border max-w-4xl mx-auto shadow-lg"
        >
          <div className="flex items-center justify-center mb-8 gap-6">
            <div className={`flex items-center gap-2 ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground/60'}`}>1</span>
              <span className="text-lg font-bold">Upload Files</span>
            </div>
            <div className="h-0.5 w-16 bg-border" />
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground/60'}`}>2</span>
              <span className="text-lg font-bold">Add Details</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div 
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-primary/40 bg-secondary/20 rounded-3xl p-12 text-center text-muted-foreground cursor-pointer hover:border-primary/60 transition-colors h-64"
                >
                  <UploadCloud className="w-16 h-16 mb-4 text-primary/60" />
                  <p className="text-xl font-semibold mb-2">Drag & Drop Your Photos Here</p>
                  <p className="text-sm mb-4">or click to browse from your device (Max 25MB per file)</p>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileInput} 
                  />
                  <Label 
                    htmlFor="file-upload" 
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white font-bold cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Browse Files
                  </Label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">Selected Files ({selectedFiles.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative flex items-center justify-between p-4 bg-secondary/30 rounded-2xl">
                          <ImageIcon className="w-6 h-6 text-muted-foreground mr-3" />
                          <span className="flex-1 truncate text-sm font-medium text-foreground">{file.name}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeFile(index)} 
                            className="w-8 h-8 rounded-full text-muted-foreground hover:bg-secondary"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {isUploading ? (
                      <div className="w-full bg-secondary rounded-full h-3">
                        <motion.div
                          className="bg-primary h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      </div>
                    ) : (
                      <Button 
                        onClick={handleUpload} 
                        className="w-full h-16 rounded-4xl text-lg font-black bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all"
                      >
                        Upload Photos
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-bold text-foreground">Add Details for Your Work</h3>
                <div className="space-y-6">
                  {selectedFiles.length > 0 && (
                     <div className="mb-6 flex flex-wrap gap-3">
                        {selectedFiles.slice(0, 3).map((file, index) => ( // Show first 3 uploaded images as preview
                          <img 
                             key={index}
                             src={URL.createObjectURL(file)}
                             alt={file.name}
                             className="w-20 h-20 object-cover rounded-xl border border-border shadow-sm"
                          />
                        ))}
                        {selectedFiles.length > 3 && (
                           <div className="w-20 h-20 rounded-xl bg-secondary/50 border border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
                              +{selectedFiles.length - 3}
                           </div>
                        )}
                     </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Title</Label>
                    <Input id="title" placeholder="Stunning Sunrise over Serengeti" value={title} onChange={(e) => setTitle(e.target.value)} className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 text-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Description</Label>
                    <Textarea id="description" placeholder="A breathtaking shot capturing..." value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-30 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 text-foreground" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:ring-primary/50 text-foreground">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border bg-card">
                          <SelectItem value="wildlife" className="rounded-md">Wildlife</SelectItem>
                          <SelectItem value="urban" className="rounded-md">Urban</SelectItem>
                          <SelectItem value="culture" className="rounded-md">Culture</SelectItem>
                          <SelectItem value="landscape" className="rounded-md">Landscape</SelectItem>
                          <SelectItem value="people" className="rounded-md">People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Tags (Press Enter to Add)</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag, index) => (
                          <span key={index} className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-1 text-primary/80 hover:text-primary transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="relative">
                        <Input 
                          id="tags" 
                          placeholder="Add tags..." 
                          value={newTag} 
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}}
                          className="h-14 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 text-foreground pr-12" 
                        />
                        <Button 
                           type="button"
                           variant="ghost" 
                           size="icon" 
                           onClick={addTag} 
                           className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 text-muted-foreground hover:bg-secondary/50 rounded-full"
                        >
                           <PlusCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                     <h3 className="text-xl font-bold text-foreground">Licensing & Pricing</h3>
                     <div className="flex items-center space-x-3">
                        <Checkbox 
                           id="isForSale" 
                           checked={isForSale} 
                           onCheckedChange={(checked) => setIsForSale(checked as boolean)}
                           className="h-6 w-6 rounded-md border-border data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        />
                        <Label htmlFor="isForSale" className="text-base font-medium text-foreground cursor-pointer">
                           Make this photo available for sale
                        </Label>
                     </div>

                     {isForSale && (
                        <div className="space-y-2">
                           <Label htmlFor="price" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Price (USD)</Label>
                           <div className="relative">
                              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input 
                                 id="price" 
                                 type="number" 
                                 placeholder="10.00" 
                                 value={price} 
                                 onChange={(e) => setPrice(e.target.value)} 
                                 className="h-14 pl-12 rounded-2xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/50 text-foreground" 
                              />
                           </div>
                        </div>
                     )}

                     <div className="flex items-center space-x-3 mt-4">
                        <Checkbox 
                           id="isExclusive" 
                           checked={isExclusive} 
                           onCheckedChange={(checked) => setIsExclusive(checked as boolean)}
                           className="h-6 w-6 rounded-md border-border data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        />
                        <Label htmlFor="isExclusive" className="text-base font-medium text-foreground cursor-pointer">
                           Exclusive License (Higher earnings for you)
                        </Label>
                     </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="h-14 rounded-2xl text-base font-bold bg-secondary/30 hover:bg-secondary transition-colors">
                    Back to Upload
                  </Button>
                  <Button className="h-16 rounded-4xl text-lg font-black bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all group">
                    SUBMIT FOR REVIEW <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}