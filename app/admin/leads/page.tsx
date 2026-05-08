"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MessageSquare, Building2, Loader2, TrendingUp, UserCheck, XCircle, CheckCircle } from "lucide-react";
import { timeAgo } from "@/lib/utils";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "INTERESTED", "CONVERTED", "CLOSED"];
const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  INTERESTED: "bg-purple-100 text-purple-700",
  CONVERTED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-500",
};

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
    city: string;
    price: number;
    seller: { name: string | null; email: string; phone: string | null };
  };
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => { fetchLeads(); }, [statusFilter]);

  async function fetchLeads() {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setUpdating(null);
  }

  const newCount = leads.filter((l) => l.status === "NEW").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leads & Enquiries</h1>
          <p className="text-sm text-slate-500 mt-0.5">{total} total enquiries</p>
        </div>
        {newCount > 0 && (
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
            {newCount} New
          </span>
        )}
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
        {["ALL", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              statusFilter === s
                ? "bg-primary-700 text-white border-primary-700"
                : "bg-white text-slate-600 border-slate-200 hover:border-primary-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      ) : leads.length === 0 ? (
        <div className="card py-16 text-center">
          <TrendingUp className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-slate-400">No leads found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="card p-4">
              <div className="flex items-start gap-4 flex-wrap">
                {/* Lead info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-slate-800">{lead.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[lead.status] ?? "bg-slate-100 text-slate-500"}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-slate-400">{timeAgo(new Date(lead.createdAt))}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-primary-700">
                      <Phone className="w-3.5 h-3.5" />
                      +91 {lead.phone}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary-700">
                        <Mail className="w-3.5 h-3.5" />
                        {lead.email}
                      </a>
                    )}
                    <span className="text-xs text-slate-400 capitalize">via {lead.source}</span>
                  </div>
                  {lead.message && (
                    <p className="text-sm text-slate-500 mt-1.5 bg-slate-50 rounded-lg px-3 py-2 italic">
                      "{lead.message}"
                    </p>
                  )}
                </div>

                {/* Property info */}
                <div className="text-right text-sm flex-shrink-0">
                  <a href={`/properties/${lead.property.id}`} target="_blank" className="font-medium text-primary-700 hover:underline text-xs">
                    {lead.property.title.slice(0, 40)}...
                  </a>
                  <p className="text-xs text-slate-400">{lead.property.city}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Seller: {lead.property.seller.name ?? lead.property.seller.email}
                  </p>
                  {lead.property.seller.phone && (
                    <a href={`tel:${lead.property.seller.phone}`} className="text-xs text-emerald-600 hover:underline">
                      {lead.property.seller.phone}
                    </a>
                  )}
                </div>

                {/* Status update */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    disabled={updating === lead.id}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <a
                    href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}, this is regarding the property you enquired about. Are you still interested?`)}`}
                    target="_blank"
                    className="text-xs text-center px-2 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
