"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, Shield, CreditCard, Bell, 
  Globe, Camera, Check, ExternalLink 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const TABS = [
  { id: "profile", label: "Public Profile", icon: User },
  { id: "account", label: "Account Security", icon: Shield },
  { id: "payouts", label: "Earnings & Payouts", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="max-w-30 mx-auto my-40">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* --- SETTINGS NAVIGATION --- */}
        <aside className="w-full lg:w-64 space-y-2">
          <div className="mb-8 px-4">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-1">Personal Studio</p>
          </div>
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-black/5" 
                  : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* --- CONTENT AREA --- */}
        <main className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2.5rem] p-8 lg:p-12 shadow-sm min-h-150">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "payouts" && <PayoutSettings />}
          {/* Other tabs can be added here following the same pattern */}
        </main>
      </div>
    </div>
  )
}

/* --- SUB-COMPONENTS --- */

function ProfileSettings() {
  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
      <div className="flex items-center gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-900">
        <div className="relative group">
          <div className="w-24 h-24 rounded-4xl overflow-hidden bg-zinc-100 border-4 border-white dark:border-zinc-900 shadow-xl">
            <img src="https://i.pravatar.cc/150?u=afristock" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Amina Chale</h2>
          <p className="text-sm text-zinc-500 font-medium">Lagos, Nigeria • Contributor since 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Display Name</label>
          <Input defaultValue="Amina Chale" className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Portfolio Website</label>
          <Input placeholder="https://yourportfolio.com" className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Short Bio</label>
          <textarea className="w-full min-h-30 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none text-sm resize-none focus:ring-1 focus:ring-primary/20 transition-all" defaultValue="Visual storyteller focusing on West African urban architecture and street culture." />
        </div>
      </div>

      <div className="pt-4">
        <Button className="rounded-xl h-12 px-8 bg-primary text-white font-bold">Save Profile</Button>
      </div>
    </motion.div>
  )
}

function PayoutSettings() {
  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="p-8 rounded-4xl bg-emerald-500/5 border border-emerald-500/10 border-dashed flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Available for Payout</p>
          <p className="text-4xl font-black text-emerald-600">$1,240.50</p>
        </div>
        <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 px-6">
          Withdraw Funds
        </Button>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-bold">Payout Method</h3>
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
              <Globe className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold">Payoneer Global</p>
              <p className="text-xs text-zinc-500 font-medium">amina.chale@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
            <Check className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        <button className="w-full py-4 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-2xl text-xs font-bold text-zinc-400 hover:border-primary/20 hover:text-primary transition-all">
          + Add New Payout Method
        </button>
      </div>
    </motion.div>
  )
}