"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import {
    Bell,
    Camera,
    ChevronRight,
    CreditCard,
    Fingerprint,
    Globe,
    Lock,
    ShieldCheck,
    User, Wallet
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaved, setIsSaved] = useState(false)

  const triggerSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Studio Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your professional identity and security.</p>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button 
            onClick={triggerSave}
            className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-11 shadow-sm transition-all"
          >
            {isSaved ? "Saved Successfully" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- NAVIGATION (Left Rail) --- */}
        <nav className="lg:col-span-3 space-y-1">
          <StockNavBtn label="Public Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={User} />
          <StockNavBtn label="Payouts" active={activeTab === 'payouts'} onClick={() => setActiveTab('payouts')} icon={Wallet} />
          <StockNavBtn label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={Lock} />
          <StockNavBtn label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={Bell} />
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* PROFILE SECTION */}
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <section className="bg-card border border-border/60 rounded-[1.25rem] p-8 shadow-sm">
                  <h3 className="text-base font-bold mb-6">Identity</h3>
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col items-center gap-4 shrink-0">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-border bg-muted">
                          <img src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-background border border-border rounded-full shadow-sm hover:bg-secondary transition-colors">
                          <Camera className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <StockField label="Display Name" placeholder="Amina Chenzira" />
                        <StockField label="Personal Website" placeholder="https://amina.studio" />
                      </div>
                      <StockField label="Short Biography" placeholder="Photographer based in Lagos..." isTextarea />
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* PAYOUTS SECTION */}
            {activeTab === 'payouts' && (
              <motion.div key="payouts" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <section className="bg-card border border-border/60 rounded-[1.25rem] p-8 shadow-sm">
                  <h3 className="text-base font-bold mb-6">Earnings Distribution</h3>
                  <div className="flex items-center gap-4 p-5 border border-border/80 rounded-2xl bg-secondary/20">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-border rounded-xl flex items-center justify-center shadow-sm">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold tracking-tight">Stripe Connect</p>
                      <p className="text-xs text-muted-foreground">Account connected: •••• 9284</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full h-9 px-4 font-bold text-xs border-border">Change</Button>
                  </div>
                </section>
              </motion.div>
            )}

            {/* SECURITY SECTION */}
            {activeTab === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <section className="bg-card border border-border/60 rounded-[1.25rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-border/60">
                    <h3 className="text-base font-bold">Privacy & Access</h3>
                    <p className="text-xs text-muted-foreground mt-1">Control how your account is accessed and secured.</p>
                  </div>
                  <div className="divide-y divide-border/60">
                    <StockToggleRow 
                      icon={Fingerprint} 
                      title="Biometric Login" 
                      desc="Use Touch ID or Face ID for quicker access." 
                      defaultChecked={true} 
                    />
                    <StockToggleRow 
                      icon={ShieldCheck} 
                      title="Content Protection" 
                      desc="Auto-watermark image previews for non-registered users." 
                      defaultChecked={true} 
                    />
                    <StockToggleRow 
                      icon={Globe} 
                      title="Public Profile Search" 
                      desc="Allow search engines to find and index your studio profile." 
                      defaultChecked={false} 
                    />
                  </div>
                </section>
              </motion.div>
            )}

            {/* NOTIFICATIONS SECTION */}
            {activeTab === 'notifications' && (
              <motion.div key="notifications" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <section className="bg-card border border-border/60 rounded-[1.25rem] overflow-hidden shadow-sm">
                   <div className="p-8 border-b border-border/60 text-base font-bold">Email Notifications</div>
                   <div className="divide-y divide-border/60">
                      <StockToggleRow title="Sales Alerts" desc="Receive an email every time one of your assets is sold." defaultChecked={true} />
                      <StockToggleRow title="Review Updates" desc="Get notified when an asset is approved or rejected by curators." defaultChecked={true} />
                      <StockToggleRow title="Market Insights" desc="Weekly report on your portfolio performance." defaultChecked={false} />
                   </div>
                </section>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

/* --- ATOMS --- */

function StockNavBtn({ label, active, onClick, icon: Icon }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${
        active 
          ? 'bg-secondary text-foreground shadow-sm' 
          : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
        {label}
      </div>
      <ChevronRight className={`w-3.5 h-3.5 opacity-50 transition-transform ${active ? 'translate-x-0' : '-translate-x-2 opacity-0'}`} />
    </button>
  )
}

function StockField({ label, placeholder, isTextarea }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-foreground/70 ml-1">{label}</label>
      {isTextarea ? (
        <Textarea 
          placeholder={placeholder} 
          className="rounded-xl bg-background border-border/60 focus-visible:ring-1 focus-visible:ring-primary/20 min-h-30 text-sm font-medium" 
        />
      ) : (
        <Input 
          placeholder={placeholder} 
          className="h-11 rounded-xl bg-background border-border/60 focus-visible:ring-1 focus-visible:ring-primary/20 text-sm font-medium" 
        />
      )}
    </div>
  )
}

function StockToggleRow({ icon: Icon, title, desc, defaultChecked }: any) {
  return (
    <div className="flex items-center justify-between p-8 hover:bg-secondary/10 transition-colors">
      <div className="flex gap-5 items-start">
        {Icon && (
          <div className="mt-1">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
        <div className="space-y-1">
          <p className="text-sm font-bold leading-none">{title}</p>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-sm">{desc}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} className="data-[state=checked]:bg-primary" />
    </div>
  )
}