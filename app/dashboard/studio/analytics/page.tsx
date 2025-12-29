"use client"

import { motion } from "framer-motion"
import {
    DollarSign,
    Download,
    Eye,
    Globe,
    TrendingUp
} from "lucide-react"
import { useEffect, useState } from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

const PERFORMANCE_DATA = [
  { name: 'Mon', views: 2400, sales: 400 },
  { name: 'Tue', views: 1398, sales: 300 },
  { name: 'Wed', views: 9800, sales: 2000 },
  { name: 'Thu', views: 3908, sales: 2780 },
  { name: 'Fri', views: 4800, sales: 1890 },
  { name: 'Sat', views: 3800, sales: 2390 },
  { name: 'Sun', views: 4300, sales: 3490 },
]

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)

  // Fix for the "Width/Height greater than 0" error
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="max-w-350 mx-auto space-y-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
          <p className="text-sm text-zinc-500 font-medium mt-1">Deep dive into your portfolio performance.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-1 rounded-full">
           <button className="px-4 py-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-sm">7 Days</button>
           <button className="px-4 py-1.5 text-xs font-bold text-zinc-400">30 Days</button>
           <button className="px-4 py-1.5 text-xs font-bold text-zinc-400">All Time</button>
        </div>
      </div>

      {/* --- MAIN CHART SECTION --- */}
      <section className="bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-4xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
                <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Views</p>
                    <p className="text-2xl font-bold">128.4k</p>
                </div>
                <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
                <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Growth</p>
                    <p className="text-2xl font-bold text-emerald-500">+14.2%</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs font-bold text-zinc-500 tracking-tight">Traffic Volume</span>
            </div>
        </div>
        
        {/* Container with explicit min-height to prevent Recharts error */}
        <div className="h-87.5 w-full min-h-87.5">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 11, fontWeight: 600, fill: '#A1A1AA'}}
                  dy={10}
                />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid #e5e7eb', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* --- SECONDARY METRICS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-4xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold tracking-tight">Top Markets</h3>
                <Globe className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="space-y-5">
                <MarketRow country="United States" percent={45} />
                <MarketRow country="Nigeria" percent={32} />
                <MarketRow country="United Kingdom" percent={18} />
            </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-4xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold tracking-tight">Live Performance</h3>
                <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-6">
                <ActivityRow icon={Download} title="Standard Download" user="User #829" time="2m ago" amount="+ $12.00" />
                <ActivityRow icon={DollarSign} title="Commercial Sale" user="Brand Direct" time="45m ago" amount="+ $145.00" />
                <ActivityRow icon={Eye} title="Asset Trending" user="Lagos Street" time="2h ago" amount="Boosted" />
            </div>
        </div>
      </div>
    </div>
  )
}

function MarketRow({ country, percent }: { country: string, percent: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-zinc-500 uppercase tracking-wider">{country}</span>
                <span className="text-zinc-900 dark:text-zinc-100">{percent}%</span>
            </div>
            <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-zinc-900 dark:bg-zinc-100"
                />
            </div>
        </div>
    )
}

function ActivityRow({ icon: Icon, title, user, time, amount }: any) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
                    <Icon className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                    <p className="text-[13px] font-bold text-zinc-900 dark:text-zinc-50">{title}</p>
                    <p className="text-[11px] text-zinc-400 font-medium">{user} • {time}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold">{amount}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Verified</p>
            </div>
        </div>
    )
}