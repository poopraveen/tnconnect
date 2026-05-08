import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, TrendingUp, TrendingDown, ArrowRight, ExternalLink, Download, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Budget Expenditure | TN Vettri" };

const STATS = [
  { label: "Total Budget 2024-25",  labelTa: "மொத்த பட்ஜெட்",   value: "₹4,12,504 Cr",  sub: "Approved by Legislature",    color: "bg-blue-600",    light: "bg-blue-50",    fg: "text-blue-700" },
  { label: "Released to Depts",     labelTa: "வெளியிடப்பட்டது",  value: "₹3,68,900 Cr",  sub: "89.4% of allocation",        color: "bg-emerald-600", light: "bg-emerald-50", fg: "text-emerald-700" },
  { label: "Actual Expenditure",    labelTa: "உண்மை செலவு",      value: "₹3,21,450 Cr",  sub: "78.0% utilisation rate",     color: "bg-violet-600",  light: "bg-violet-50",  fg: "text-violet-700" },
  { label: "Pending Utilisation",   labelTa: "நிலுவை செலவு",     value: "₹47,450 Cr",    sub: "11.5% of released funds",    color: "bg-amber-600",   light: "bg-amber-50",   fg: "text-amber-700" },
];

const DEPARTMENTS = [
  { name: "School Education",            nameTa: "பள்ளிக் கல்வி",             allocation: 54327, spent: 49200, pct: 91, status: "on-target" },
  { name: "Social Welfare & Nutrition",  nameTa: "சமூக நலன் & ஊட்டச்சத்து",   allocation: 34548, spent: 32100, pct: 93, status: "on-target" },
  { name: "Agriculture & Allied",        nameTa: "வேளாண்மை & தொடர்புடைய",     allocation: 24232, spent: 21800, pct: 90, status: "on-target" },
  { name: "Transport (Roads & Bridges)", nameTa: "போக்குவரத்து (சாலைகள்)",     allocation: 23828, spent: 19400, pct: 81, status: "vulnerable" },
  { name: "Energy",                      nameTa: "ஆற்றல்",                    allocation: 21606, spent: 21200, pct: 98, status: "on-target" },
  { name: "Health & Family Welfare",     nameTa: "சுகாதாரம் & குடும்ப நலன்",  allocation: 18750, spent: 15300, pct: 82, status: "vulnerable" },
  { name: "Municipal Admin & WS",        nameTa: "நகராட்சி நிர்வாகம்",        allocation: 17200, spent: 16800, pct: 98, status: "on-target" },
  { name: "Housing & Urban Dev.",        nameTa: "வீட்டுவசதி & நகர்ப்புற",    allocation: 14560, spent: 10200, pct: 70, status: "jeopardy" },
  { name: "Rural Development",           nameTa: "ஊரக வளர்ச்சி",              allocation: 13800, spent: 13200, pct: 96, status: "on-target" },
  { name: "Water Resources",             nameTa: "நீர் வளங்கள்",              allocation: 12400, spent: 9800,  pct: 79, status: "vulnerable" },
  { name: "Police & Home Affairs",       nameTa: "காவல் & உள்துறை",          allocation: 11900, spent: 11400, pct: 96, status: "on-target" },
  { name: "Revenue & Disaster Mgmt.",    nameTa: "வருவாய் & பேரிடர் மேலாண்மை", allocation: 9850, spent: 8700, pct: 88, status: "on-target" },
];

const MONTHLY = [
  { month: "Apr",  released: 22000, spent: 18500 },
  { month: "May",  released: 28000, spent: 24200 },
  { month: "Jun",  released: 31000, spent: 27800 },
  { month: "Jul",  released: 34000, spent: 29400 },
  { month: "Aug",  released: 33000, spent: 28600 },
  { month: "Sep",  released: 38000, spent: 32000 },
  { month: "Oct",  released: 40000, spent: 34500 },
  { month: "Nov",  released: 37000, spent: 31200 },
  { month: "Dec",  released: 42000, spent: 36800 },
  { month: "Jan",  released: 29000, spent: 24000 },
  { month: "Feb",  released: 26000, spent: 21450 },
  { month: "Mar",  released: 7900,  spent: 13000 },
];

const maxVal = Math.max(...MONTHLY.map(m => m.released));

const statusMap = {
  "on-target": { bg: "bg-emerald-100", fg: "text-emerald-700", dot: "bg-emerald-500", label: "On Track" },
  "vulnerable": { bg: "bg-amber-100", fg: "text-amber-700", dot: "bg-amber-500", label: "At Risk" },
  "jeopardy": { bg: "bg-red-100", fg: "text-red-700", dot: "bg-red-500", label: "Behind" },
};

function fmt(n: number) {
  return n >= 1000 ? `₹${(n / 1000).toFixed(1)}K Cr` : `₹${n} Cr`;
}

export default function ExpenditurePage() {
  return (
    <div className="min-h-screen bg-surface">

      {/* Hero */}
      <div className="bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link href="/tnvettri" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Expenditure</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Budget Expenditure Tracker</h1>
              <p className="text-blue-200 mt-1 text-lg font-tamil">பட்ஜெட் செலவின கண்காணிப்பு</p>
              <p className="text-blue-300 text-sm mt-2">Financial Year 2024–25 · Data from tnbudget.tn.gov.in & pfms.nic.in</p>
            </div>
            <div className="flex gap-2">
              <a href="https://tnbudget.tn.gov.in" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Budget Portal
              </a>
              <button className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {STATS.map((s) => (
              <div key={s.label} className="py-5 px-6 first:pl-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{s.label}</p>
                <p className="text-xs text-slate-400 font-tamil mb-1">{s.labelTa}</p>
                <p className={cn("text-2xl font-bold font-data tabular-nums", s.fg)}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Utilisation meter */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Overall Budget Utilisation</h2>
              <p className="text-xs text-slate-500 font-tamil mt-0.5">ஒட்டுமொத்த பட்ஜெட் பயன்பாடு</p>
            </div>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">78.0%</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Released (89.4%)</span><span>₹3,68,900 Cr of ₹4,12,504 Cr</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "89.4%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Spent (78.0%)</span><span>₹3,21,450 Cr of ₹4,12,504 Cr</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "78%" }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Released</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Spent</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" /> Unspent</span>
          </div>
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Monthly Release & Expenditure</h2>
              <p className="text-xs text-slate-400 mt-0.5">Apr 2024 – Mar 2025 · ₹ Crore</p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">FY 2024-25</span>
          </div>
          <div className="flex items-end gap-1.5 h-36">
            {MONTHLY.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5 group">
                <div className="w-full flex flex-col items-center gap-0.5 justify-end" style={{ height: "100%" }}>
                  <div className="relative w-full flex gap-0.5 items-end justify-center" style={{ height: `${(m.released / maxVal) * 100}%` }}>
                    <div className="w-[45%] bg-blue-200 rounded-t-sm group-hover:bg-blue-400 transition-colors" style={{ height: "100%" }} />
                    <div className="w-[45%] bg-emerald-400 rounded-t-sm group-hover:bg-emerald-600 transition-colors" style={{ height: `${(m.spent / m.released) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" /> Released</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" /> Spent</span>
          </div>
        </div>

        {/* Department breakdown */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Department-wise Utilisation</h2>
              <p className="text-xs text-slate-400 font-tamil mt-0.5">துறை வாரியான பயன்பாடு</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-3.5 h-3.5" />
              <span>Top 12 departments by allocation</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Allocation (Cr)</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Spent (Cr)</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-48">Utilisation</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEPARTMENTS.map((d) => {
                  const s = statusMap[d.status as keyof typeof statusMap];
                  return (
                    <tr key={d.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <p className="text-sm font-medium text-slate-800">{d.name}</p>
                        <p className="text-xs text-slate-400 font-tamil">{d.nameTa}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-data text-right text-slate-600 tabular-nums">
                        {d.allocation.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3.5 text-sm font-data text-right font-semibold text-slate-800 tabular-nums">
                        {d.spent.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", s.dot === "bg-emerald-500" ? "bg-emerald-500" : s.dot === "bg-amber-500" ? "bg-amber-500" : "bg-red-500")}
                              style={{ width: `${d.pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-600 w-9 text-right tabular-nums">{d.pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold", s.bg, s.fg)}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Source: pfms.nic.in · tnbudget.tn.gov.in · Last updated Feb 2025</span>
            <a href="https://tnbudget.tn.gov.in" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary-600 transition-colors font-medium">
              <ExternalLink className="w-3 h-3" /> Full Budget Report
            </a>
          </div>
        </div>

        {/* Capital vs Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Expenditure by Type</h3>
            <div className="space-y-4">
              {[
                { label: "Revenue Expenditure", labelTa: "வருவாய் செலவு", value: "₹2,73,769 Cr", pct: 85, color: "bg-blue-500" },
                { label: "Capital Expenditure",  labelTa: "மூலதன செலவு",  value: "₹47,681 Cr",  pct: 15, color: "bg-violet-500" },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="text-xs text-slate-400 font-tamil ml-2">{item.labelTa}</span>
                    </div>
                    <span className="text-sm font-bold font-data text-slate-800">{item.value}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.pct}% of total expenditure</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Key Budget Ratios</h3>
            <div className="space-y-3">
              {[
                { label: "Fiscal Deficit / GSDP",       value: "3.4%",    note: "Target: 3.0%", warn: true },
                { label: "Capital Outlay / Total Exp.",  value: "14.8%",   note: "Target: 16%",  warn: true },
                { label: "Revenue Deficit",              value: "₹48,234 Cr", note: "Reducing YoY", warn: false },
                { label: "Own Tax Revenue",              value: "₹1,68,000 Cr", note: "12% YoY growth", warn: false },
                { label: "Central Transfers",            value: "₹83,200 Cr",  note: "Devolution + grants", warn: false },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-600">{r.label}</span>
                  <div className="text-right">
                    <span className={cn("text-sm font-bold font-data", r.warn ? "text-amber-600" : "text-slate-800")}>{r.value}</span>
                    <p className="text-xs text-slate-400">{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
