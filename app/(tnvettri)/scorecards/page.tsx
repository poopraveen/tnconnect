import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, TrendingUp, TrendingDown, Award, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "District Scorecards | TN Vettri" };

const DISTRICTS = [
  { name: "Chennai",           nameTa: "சென்னை",            score: 84, rank: 1,  fin: 88, svc: 85, impact: 82, infra: 86, gov: 80, trend: "up" },
  { name: "Coimbatore",        nameTa: "கோயம்புத்தூர்",     score: 81, rank: 2,  fin: 84, svc: 80, impact: 79, infra: 82, gov: 82, trend: "up" },
  { name: "Tiruchirappalli",   nameTa: "திருச்சிராப்பள்ளி", score: 78, rank: 3,  fin: 79, svc: 79, impact: 77, infra: 78, gov: 77, trend: "up" },
  { name: "Madurai",           nameTa: "மதுரை",              score: 76, rank: 4,  fin: 77, svc: 76, impact: 75, infra: 77, gov: 76, trend: "same" },
  { name: "Salem",             nameTa: "சேலம்",              score: 75, rank: 5,  fin: 76, svc: 74, impact: 76, infra: 74, gov: 75, trend: "up" },
  { name: "Erode",             nameTa: "ஈரோடு",              score: 74, rank: 6,  fin: 75, svc: 73, impact: 74, infra: 75, gov: 73, trend: "up" },
  { name: "Tiruppur",          nameTa: "திருப்பூர்",         score: 73, rank: 7,  fin: 74, svc: 72, impact: 73, infra: 74, gov: 72, trend: "up" },
  { name: "Vellore",           nameTa: "வேலூர்",             score: 72, rank: 8,  fin: 72, svc: 73, impact: 71, infra: 72, gov: 73, trend: "same" },
  { name: "Thanjavur",         nameTa: "தஞ்சாவூர்",          score: 71, rank: 9,  fin: 71, svc: 72, impact: 70, infra: 71, gov: 71, trend: "up" },
  { name: "Tirunelveli",       nameTa: "திருநெல்வேலி",       score: 70, rank: 10, fin: 70, svc: 71, impact: 69, infra: 70, gov: 70, trend: "same" },
  { name: "Kancheepuram",      nameTa: "காஞ்சிபுரம்",        score: 69, rank: 11, fin: 70, svc: 68, impact: 69, infra: 69, gov: 68, trend: "up" },
  { name: "Chengalpattu",      nameTa: "செங்கல்பட்டு",       score: 69, rank: 12, fin: 69, svc: 70, impact: 68, infra: 69, gov: 70, trend: "up" },
  { name: "Namakkal",          nameTa: "நாமக்கல்",           score: 68, rank: 13, fin: 68, svc: 68, impact: 67, infra: 68, gov: 68, trend: "same" },
  { name: "Tiruvannamalai",    nameTa: "திருவண்ணாமலை",       score: 67, rank: 14, fin: 67, svc: 67, impact: 67, infra: 66, gov: 68, trend: "up" },
  { name: "Dindigul",          nameTa: "திண்டுக்கல்",        score: 67, rank: 15, fin: 66, svc: 68, impact: 66, infra: 67, gov: 67, trend: "same" },
  { name: "Tiruvallur",        nameTa: "திருவள்ளூர்",        score: 66, rank: 16, fin: 66, svc: 66, impact: 65, infra: 67, gov: 66, trend: "up" },
  { name: "Cuddalore",         nameTa: "கடலூர்",             score: 65, rank: 17, fin: 65, svc: 66, impact: 64, infra: 65, gov: 65, trend: "same" },
  { name: "Kanyakumari",       nameTa: "கன்னியாகுமரி",       score: 65, rank: 18, fin: 65, svc: 65, impact: 65, infra: 64, gov: 65, trend: "up" },
  { name: "Dharmapuri",        nameTa: "தர்மபுரி",           score: 64, rank: 19, fin: 64, svc: 64, impact: 63, infra: 64, gov: 64, trend: "same" },
  { name: "Krishnagiri",       nameTa: "கிருஷ்ணகிரி",        score: 63, rank: 20, fin: 63, svc: 63, impact: 62, infra: 63, gov: 63, trend: "up" },
  { name: "Theni",             nameTa: "தேனி",               score: 63, rank: 21, fin: 63, svc: 62, impact: 63, infra: 62, gov: 63, trend: "same" },
  { name: "Sivaganga",         nameTa: "சிவகங்கை",           score: 62, rank: 22, fin: 62, svc: 62, impact: 61, infra: 62, gov: 62, trend: "same" },
  { name: "Karur",             nameTa: "கரூர்",              score: 62, rank: 23, fin: 62, svc: 62, impact: 61, infra: 62, gov: 62, trend: "up" },
  { name: "Nagapattinam",      nameTa: "நாகப்பட்டினம்",      score: 61, rank: 24, fin: 61, svc: 61, impact: 60, infra: 61, gov: 62, trend: "same" },
  { name: "Thoothukudi",       nameTa: "தூத்துக்குடி",       score: 61, rank: 25, fin: 61, svc: 60, impact: 61, infra: 62, gov: 61, trend: "up" },
  { name: "Viluppuram",        nameTa: "விழுப்புரம்",         score: 60, rank: 26, fin: 60, svc: 60, impact: 59, infra: 60, gov: 60, trend: "same" },
  { name: "Ranipet",           nameTa: "ராணிப்பேட்டை",       score: 60, rank: 27, fin: 60, svc: 59, impact: 60, infra: 60, gov: 61, trend: "up" },
  { name: "Tiruvarur",         nameTa: "திருவாரூர்",          score: 59, rank: 28, fin: 59, svc: 60, impact: 58, infra: 59, gov: 59, trend: "same" },
  { name: "Ramanathapuram",    nameTa: "ராமநாதபுரம்",        score: 58, rank: 29, fin: 58, svc: 58, impact: 57, infra: 58, gov: 59, trend: "same" },
  { name: "Pudukkottai",       nameTa: "புதுக்கோட்டை",       score: 57, rank: 30, fin: 57, svc: 57, impact: 57, infra: 57, gov: 58, trend: "up" },
  { name: "Nilgiris",          nameTa: "நீலகிரி",            score: 57, rank: 31, fin: 57, svc: 57, impact: 56, infra: 57, gov: 58, trend: "same" },
  { name: "Perambalur",        nameTa: "பெரம்பலூர்",         score: 56, rank: 32, fin: 56, svc: 56, impact: 55, infra: 56, gov: 57, trend: "same" },
  { name: "Mayiladuthurai",    nameTa: "மயிலாடுதுறை",        score: 56, rank: 33, fin: 55, svc: 57, impact: 55, infra: 56, gov: 56, trend: "up" },
  { name: "Tenkasi",           nameTa: "தென்காசி",           score: 55, rank: 34, fin: 55, svc: 55, impact: 54, infra: 55, gov: 56, trend: "same" },
  { name: "Ariyalur",          nameTa: "அரியலூர்",           score: 54, rank: 35, fin: 54, svc: 54, impact: 53, infra: 54, gov: 55, trend: "up" },
  { name: "Kallakurichi",      nameTa: "கள்ளக்குறிச்சி",     score: 53, rank: 36, fin: 53, svc: 53, impact: 52, infra: 53, gov: 54, trend: "same" },
  { name: "Tirupathur",        nameTa: "திருப்பத்தூர்",       score: 52, rank: 37, fin: 52, svc: 52, impact: 51, infra: 52, gov: 52, trend: "same" },
  { name: "Virudhunagar",      nameTa: "விருதுநகர்",          score: 51, rank: 38, fin: 50, svc: 52, impact: 50, infra: 51, gov: 52, trend: "down" },
];

function scoreGrade(score: number) {
  if (score >= 80) return { grade: "A+", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
  if (score >= 70) return { grade: "A",  color: "bg-blue-100 text-blue-700 border-blue-200" };
  if (score >= 60) return { grade: "B",  color: "bg-amber-100 text-amber-700 border-amber-200" };
  if (score >= 50) return { grade: "C",  color: "bg-orange-100 text-orange-700 border-orange-200" };
  return                   { grade: "D",  color: "bg-red-100 text-red-700 border-red-200" };
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-blue-500";
  if (score >= 60) return "bg-amber-500";
  if (score >= 50) return "bg-orange-400";
  return "bg-red-500";
}

const CATEGORIES = [
  { key: "fin",    label: "Financial Efficiency", labelTa: "நிதி திறன்",          color: "bg-blue-500",    icon: "💰" },
  { key: "svc",    label: "Service Delivery",     labelTa: "சேவை வழங்கல்",         color: "bg-violet-500",  icon: "🏛️" },
  { key: "impact", label: "Citizen Impact",       labelTa: "குடிமக்கள் தாக்கம்",   color: "bg-emerald-500", icon: "👥" },
  { key: "infra",  label: "Infrastructure",       labelTa: "உள்கட்டமைப்பு",        color: "bg-amber-500",   icon: "🏗️" },
  { key: "gov",    label: "Governance Integrity", labelTa: "நிர்வாக நேர்மை",        color: "bg-rose-500",    icon: "⚖️" },
];

const stateAvg = Math.round(DISTRICTS.reduce((s, d) => s + d.score, 0) / DISTRICTS.length);

export default function ScorecardsPage() {
  const top5    = DISTRICTS.slice(0, 5);
  const bottom5 = DISTRICTS.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-surface">

      {/* Hero */}
      <div className="bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link href="/tnvettri" className="hover:text-white transition-colors">Home</Link>
            <span>/</span><span>Scorecards</span>
          </div>
          <h1 className="text-3xl font-bold">District Performance Scorecards</h1>
          <p className="text-blue-200 mt-1 text-lg font-tamil">மாவட்ட செயல்திறன் மதிப்பீடு</p>
          <p className="text-blue-300 text-sm mt-2">38 Districts · 5 Categories · Q4 2024 · Composite Governance Index</p>
        </div>
      </div>

      {/* State summary bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-slate-100">
            <div className="py-5 px-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">State Average</p>
              <p className="text-2xl font-bold font-data text-primary-700">{stateAvg}/100</p>
              <p className="text-xs text-slate-400 mt-0.5">Grade B · Improving</p>
            </div>
            {CATEGORIES.map(c => {
              const avg = Math.round(DISTRICTS.reduce((s, d) => s + (d as any)[c.key], 0) / DISTRICTS.length);
              return (
                <div key={c.key} className="py-5 px-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{c.icon} {c.label}</p>
                  <p className="text-2xl font-bold font-data text-slate-800">{avg}</p>
                  <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div className={cn("h-full rounded-full", c.color)} style={{ width: `${avg}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Top & Bottom performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-slate-800">Top Performers</h2>
              <span className="ml-auto text-xs text-slate-400">Best 5 districts</span>
            </div>
            <div className="divide-y divide-slate-100">
              {top5.map((d, i) => {
                const g = scoreGrade(d.score);
                return (
                  <div key={d.name} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <span className="text-lg font-bold font-data text-slate-300 w-6">#{d.rank}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{d.name}</p>
                      <p className="text-xs text-slate-400 font-tamil">{d.nameTa}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.score}%` }} />
                      </div>
                      <span className="text-sm font-bold font-data text-slate-700 w-8 text-right tabular-nums">{d.score}</span>
                      <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border", g.color)}>{g.grade}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-semibold text-slate-800">Need Attention</h2>
              <span className="ml-auto text-xs text-slate-400">Bottom 5 districts</span>
            </div>
            <div className="divide-y divide-slate-100">
              {bottom5.map((d) => {
                const g = scoreGrade(d.score);
                return (
                  <div key={d.name} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <span className="text-lg font-bold font-data text-slate-300 w-6">#{d.rank}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{d.name}</p>
                      <p className="text-xs text-slate-400 font-tamil">{d.nameTa}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {d.trend === "down" ? <TrendingDown className="w-3.5 h-3.5 text-red-400" /> : <TrendingUp className="w-3.5 h-3.5 text-slate-300" />}
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", scoreBg(d.score))} style={{ width: `${d.score}%` }} />
                      </div>
                      <span className="text-sm font-bold font-data text-slate-700 w-8 text-right tabular-nums">{d.score}</span>
                      <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border", g.color)}>{g.grade}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* All 38 districts grid */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-800">All 38 Districts</h2>
              <p className="text-xs text-slate-400 font-tamil mt-0.5">அனைத்து 38 மாவட்டங்கள்</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {[["A+", "bg-emerald-100 text-emerald-700"], ["A", "bg-blue-100 text-blue-700"], ["B", "bg-amber-100 text-amber-700"], ["C", "bg-orange-100 text-orange-700"]].map(([g, cls]) => (
                <span key={g} className={cn("px-2 py-0.5 rounded font-semibold", cls)}>{g}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-slate-100">
            {DISTRICTS.map((d) => {
              const g = scoreGrade(d.score);
              return (
                <div key={d.name} className="bg-white p-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-xs text-slate-400">#{d.rank}</span>
                    <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded border", g.color)}>{g.grade}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-tight">{d.name}</p>
                  <p className="text-[10px] text-slate-400 font-tamil mb-2 truncate">{d.nameTa}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", scoreBg(d.score))} style={{ width: `${d.score}%` }} />
                    </div>
                    <span className="text-xs font-bold font-data text-slate-700 tabular-nums">{d.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
            Composite score = 0.25×Financial Efficiency + 0.25×Service Delivery + 0.20×Citizen Impact + 0.15×Infrastructure + 0.15×Governance Integrity · Q4 2024
          </div>
        </div>

        {/* Category heatmap */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-800">Category Performance — Top 10 Districts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">District</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Overall</th>
                  {CATEGORIES.map(c => (
                    <th key={c.key} className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.icon} {c.label.split(" ")[0]}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DISTRICTS.slice(0, 10).map((d) => (
                  <tr key={d.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{d.name}</p>
                      <p className="text-xs text-slate-400 font-tamil">{d.nameTa}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-bold font-data text-primary-700">{d.score}</span>
                    </td>
                    {CATEGORIES.map(c => {
                      const val = (d as any)[c.key] as number;
                      const heat = val >= 80 ? "bg-emerald-100 text-emerald-700" : val >= 70 ? "bg-blue-100 text-blue-700" : val >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
                      return (
                        <td key={c.key} className="px-4 py-3 text-center">
                          <span className={cn("inline-block text-xs font-bold font-data px-2 py-0.5 rounded", heat)}>{val}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
            Source: Composite index derived from PFMS, PGPORTAL, NHM, DISHA, and eProcurement data · Period: Q4 2024
          </div>
        </div>

      </div>
    </div>
  );
}
