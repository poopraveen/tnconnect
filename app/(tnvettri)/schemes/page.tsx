import type { Metadata } from "next";
import Link from "next/link";
import { Users, TrendingUp, IndianRupee, Calendar, ExternalLink, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Welfare Schemes | TN Vettri" };

const SCHEMES = [
  {
    id: "magalir",
    name: "Magalir Urimai Thittam",
    nameTa: "மகளிர் உரிமைத் திட்டம்",
    dept: "Social Welfare",
    benefit: "₹1,000/month",
    beneficiaries: "1.31 Cr",
    target: "1.5 Cr",
    progress: 87,
    totalDisbursed: "₹7,872 Cr",
    status: "on-target",
    launch: "Sep 2023",
    eligibility: "Women 18+ with annual income < ₹2.5 lakh",
    source: "kmut.tn.gov.in",
    color: "bg-rose-500",
    light: "bg-rose-50",
    fg: "text-rose-700",
    icon: "👩",
  },
  {
    id: "breakfast",
    name: "Chief Minister's Breakfast Scheme",
    nameTa: "முதலமைச்சர் காலை உணவு திட்டம்",
    dept: "School Education",
    benefit: "Free breakfast daily",
    beneficiaries: "20.73 Lakh",
    target: "25 Lakh",
    progress: 83,
    totalDisbursed: "₹430 Cr",
    status: "on-target",
    launch: "Sep 2022",
    eligibility: "Govt school students Classes 1–5",
    source: "tnsocialwelfare.tn.gov.in",
    color: "bg-amber-500",
    light: "bg-amber-50",
    fg: "text-amber-700",
    icon: "🍽️",
  },
  {
    id: "mtm",
    name: "Makkaludan Thalaivargal Scheme (MTM)",
    nameTa: "மக்களை தேடி மருத்துவம்",
    dept: "Health & Family Welfare",
    benefit: "Free health checkup + treatment",
    beneficiaries: "1.86 Cr",
    target: "2 Cr",
    progress: 93,
    totalDisbursed: "₹2,400 Cr",
    status: "on-target",
    launch: "Feb 2022",
    eligibility: "All citizens, doorstep screening",
    source: "nhm.tn.gov.in",
    color: "bg-blue-500",
    light: "bg-blue-50",
    fg: "text-blue-700",
    icon: "🏥",
  },
  {
    id: "naan",
    name: "Naan Mudhalvan Scheme",
    nameTa: "நான் முதல்வன் திட்டம்",
    dept: "MSME & Entrepreneurship",
    benefit: "Skill training + ₹50K seed fund",
    beneficiaries: "14.6 Lakh",
    target: "20 Lakh",
    progress: 73,
    totalDisbursed: "₹730 Cr",
    status: "vulnerable",
    launch: "Jan 2022",
    eligibility: "Youth 18–35, Class 10+ educated",
    source: "naanmudhalvan.tn.gov.in",
    color: "bg-violet-500",
    light: "bg-violet-50",
    fg: "text-violet-700",
    icon: "🚀",
  },
  {
    id: "illamthedi",
    name: "Illam Thedi Kalvi",
    nameTa: "இல்லம் தேடி கல்வி",
    dept: "School Education",
    benefit: "Free home tutoring",
    beneficiaries: "35.4 Lakh",
    target: "40 Lakh",
    progress: 89,
    totalDisbursed: "₹960 Cr",
    status: "on-target",
    launch: "Jan 2022",
    eligibility: "Students Std 3–8 with learning gaps",
    source: "tnsocialwelfare.tn.gov.in",
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    fg: "text-emerald-700",
    icon: "📚",
  },
  {
    id: "kalaignar",
    name: "Kalaignar Magalir Urimai (Phase II)",
    nameTa: "கலைஞர் மகளிர் உரிமை (2ம் கட்டம்)",
    dept: "Social Welfare",
    benefit: "₹1,000/month enhanced benefits",
    beneficiaries: "62 Lakh",
    target: "1 Cr",
    progress: 62,
    totalDisbursed: "₹3,720 Cr",
    status: "vulnerable",
    launch: "Jan 2024",
    eligibility: "Women above 50, widows, single mothers",
    source: "kmut.tn.gov.in",
    color: "bg-pink-500",
    light: "bg-pink-50",
    fg: "text-pink-700",
    icon: "💐",
  },
  {
    id: "thayumanuvar",
    name: "Thayumanuvar Scheme",
    nameTa: "தாயுமானவர் திட்டம்",
    dept: "Health",
    benefit: "Free maternal health + ₹18,000 support",
    beneficiaries: "8.4 Lakh",
    target: "10 Lakh",
    progress: 84,
    totalDisbursed: "₹1,512 Cr",
    status: "on-target",
    launch: "Jun 2021",
    eligibility: "Pregnant women in public hospitals",
    source: "nhm.tn.gov.in",
    color: "bg-teal-500",
    light: "bg-teal-50",
    fg: "text-teal-700",
    icon: "🤱",
  },
  {
    id: "ration",
    name: "PDS Free Ration Scheme",
    nameTa: "இலவச ரேஷன் திட்டம்",
    dept: "Civil Supplies",
    benefit: "10 kg rice + essential commodities/month",
    beneficiaries: "2.19 Cr",
    target: "2.19 Cr",
    progress: 100,
    totalDisbursed: "₹4,800 Cr",
    status: "on-target",
    launch: "Ongoing",
    eligibility: "All ration card holders",
    source: "tncsc.tn.gov.in",
    color: "bg-orange-500",
    light: "bg-orange-50",
    fg: "text-orange-700",
    icon: "🌾",
  },
  {
    id: "pension",
    name: "Social Security Pension",
    nameTa: "சமூக பாதுகாப்பு ஓய்வூதியம்",
    dept: "Social Welfare",
    benefit: "₹1,000–₹1,500/month",
    beneficiaries: "37.8 Lakh",
    target: "40 Lakh",
    progress: 95,
    totalDisbursed: "₹4,536 Cr",
    status: "on-target",
    launch: "Ongoing",
    eligibility: "Elderly 60+, disabled, widows",
    source: "tnsocialwelfare.tn.gov.in",
    color: "bg-cyan-500",
    light: "bg-cyan-50",
    fg: "text-cyan-700",
    icon: "🧓",
  },
];

const statusStyle = {
  "on-target": { bg: "bg-emerald-100", fg: "text-emerald-700", dot: "bg-emerald-500", label: "On Track" },
  "vulnerable": { bg: "bg-amber-100", fg: "text-amber-700", dot: "bg-amber-500", label: "At Risk" },
};

export default function SchemesPage() {
  const totalBeneficiaries = "5.78 Cr+";
  const totalDisbursed     = "₹26,960 Cr";
  const onTrack            = SCHEMES.filter(s => s.status === "on-target").length;

  return (
    <div className="min-h-screen bg-surface">

      {/* Hero */}
      <div className="bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link href="/tnvettri" className="hover:text-white transition-colors">Home</Link>
            <span>/</span><span>Schemes</span>
          </div>
          <h1 className="text-3xl font-bold">Welfare Scheme Benefits</h1>
          <p className="text-blue-200 mt-1 text-lg font-tamil">நலத்திட்ட பலன்கள்</p>
          <p className="text-blue-300 text-sm mt-2">9 flagship schemes · 5.78 Cr+ beneficiaries · ₹26,960 Cr disbursed · FY 2024-25</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { label: "Total Beneficiaries",  labelTa: "மொத்த பயனாளிகள்",    value: totalBeneficiaries, note: "Across all schemes",      fg: "text-primary-700" },
              { label: "Total Disbursed",       labelTa: "மொத்த வழங்கப்பட்டது", value: totalDisbursed,     note: "FY 2024-25",              fg: "text-emerald-700" },
              { label: "Schemes On Track",      labelTa: "சரியான நேரத்தில்",    value: `${onTrack}/9`,     note: "Within target range",    fg: "text-blue-700" },
              { label: "Active Schemes",        labelTa: "செயலில் உள்ள திட்டம்", value: "9",               note: "State flagship schemes",  fg: "text-violet-700" },
            ].map(s => (
              <div key={s.label} className="py-5 px-6 first:pl-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{s.label}</p>
                <p className="text-xs text-slate-400 font-tamil mb-1">{s.labelTa}</p>
                <p className={cn("text-2xl font-bold font-data tabular-nums", s.fg)}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Scheme cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SCHEMES.map((s) => {
            const st = statusStyle[s.status as keyof typeof statusStyle];
            return (
              <div key={s.id} className={cn(
                "bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300",
                "border border-slate-100 border-t-4 overflow-hidden flex flex-col",
                s.color.replace("bg-", "border-t-")
              )}>
                {/* Card header */}
                <div className={cn("px-5 pt-5 pb-4", s.light)}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none mt-0.5">{s.icon}</span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 leading-tight">{s.name}</h3>
                        <p className="text-xs text-slate-500 font-tamil mt-0.5">{s.nameTa}</p>
                      </div>
                    </div>
                    <span className={cn("flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold", st.bg, st.fg)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", st.dot)} />{st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{s.benefit}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Since {s.launch}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-5 py-4 flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Beneficiaries</p>
                      <p className={cn("text-xl font-bold font-data tabular-nums", s.fg)}>{s.beneficiaries}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Disbursed</p>
                      <p className="text-base font-bold font-data text-slate-700">{s.totalDisbursed}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>Target progress</span>
                      <span className="font-semibold">{s.progress}% of {s.target}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-700", s.color)}
                        style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{s.eligibility}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {s.dept} · {s.source}
                  </span>
                  <a href={`https://${s.source}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary-600 transition-colors font-medium">
                    <ExternalLink className="w-3 h-3" /> Official
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total disbursement timeline */}
        <div className="mt-8 bg-white rounded-xl shadow-card p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Cumulative Monthly Disbursement – FY 2024-25</h2>
          <p className="text-xs text-slate-400 font-tamil mb-5">மாதாந்திர திரட்டப்பட்ட வழங்கல்</p>
          <div className="flex items-end gap-1 h-24">
            {[980, 1120, 1340, 1580, 1720, 2100, 2340, 2180, 2540, 2800, 2200, 3160].map((v, i) => {
              const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
              const maxMont = 3160;
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                  <div className="w-full bg-emerald-400 rounded-t-sm hover:bg-emerald-600 transition-colors cursor-pointer"
                    style={{ height: `${(v / maxMont) * 100}%` }} />
                  <span className="text-[9px] text-slate-400">{months[i]}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-2">Monthly disbursement in ₹ Crore · All schemes combined</p>
        </div>

      </div>
    </div>
  );
}
